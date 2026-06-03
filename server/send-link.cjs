const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: 'thiernohametsambadia@gmail.com',
  subject: 'THSD Multitech - Lien du site',
  html: `
    <h2>Bonjour,</h2>
    <p>Voici le lien de votre site THSD Multitech :</p>
    <p><a href="https://thsd-multitech.vercel.app">https://thsd-multitech.vercel.app</a></p>
    <p>Ouvrez ce lien sur votre téléphone.</p>
  `,
}).then(r => console.log('Email sent:', r.messageId)).catch(e => console.error('Error:', e.message));
