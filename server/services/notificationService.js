const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail({ name, email, subject, message }) {
  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `[THSD Multitech] Nouveau message de ${name}${subject ? ` - ${subject}` : ''}`,
      html: `
        <h2>Nouveau message depuis le site THSD Multitech</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${subject || 'Non spécifié'}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
        <hr>
        <p style="color: #888;">Reçu le ${new Date().toLocaleString('fr-FR')}</p>
      `,
    });
    console.log('Email sent successfully');
  } catch (err) {
    console.error('Email send error:', err.message);
  }
}

async function sendSMS(message) {
  if (!process.env.ORANGE_CLIENT_ID || !process.env.ORANGE_CLIENT_SECRET) {
    console.log('SMS non envoyé : Orange SMS API non configuré');
    return;
  }

  try {
    const https = require('https');

    const tokenResponse = await new Promise((resolve, reject) => {
      const data = new URLSearchParams({
        grant_type: 'client_credentials',
      }).toString();

      const req = https.request({
        hostname: 'api.orange.com',
        path: '/oauth/v3/token',
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${process.env.ORANGE_CLIENT_ID}:${process.env.ORANGE_CLIENT_SECRET}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try { resolve(JSON.parse(body)); }
          catch { reject(new Error('Token parsing failed')); }
        });
      });
      req.on('error', reject);
      req.write(data);
      req.end();
    });

    if (!tokenResponse.access_token) {
      console.error('Orange SMS auth failed:', tokenResponse);
      return;
    }

    const smsPayload = JSON.stringify({
      outboundSMSMessageRequest: {
        address: `tel:${process.env.SMS_TO}`,
        senderAddress: process.env.ORANGE_SENDER_ADDRESS,
        outboundSMSTextMessage: { message },
      },
    });

    await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: 'api.orange.com',
        path: `/smsmessaging/v1/outbound/${encodeURIComponent(process.env.ORANGE_SENDER_ADDRESS)}/requests`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokenResponse.access_token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          console.log('SMS sent successfully');
          resolve();
        });
      });
      req.on('error', (err) => {
        console.error('SMS send error:', err.message);
        reject(err);
      });
      req.write(smsPayload);
      req.end();
    });
  } catch (err) {
    console.error('SMS error:', err.message);
  }
}

async function notifyNewMessage(msgData) {
  const emailContent = `${msgData.message}\n\nCoordonnées : ${msgData.name} - ${msgData.email}`;
  const smsContent = `Nouveau message de ${msgData.name}: ${msgData.message.substring(0, 140)}`;

  await Promise.allSettled([
    sendEmail(msgData),
    sendSMS(smsContent),
  ]);
}

module.exports = { notifyNewMessage };
