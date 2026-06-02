import { useState } from 'react'
import HeroSection from '../components/HeroSection'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane, FaWhatsapp } from 'react-icons/fa'
import { api } from '../api'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus(null)
    try {
      await api.post('/api/messages', form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <HeroSection
        title="Contactez-nous"
        subtitle="Nous sommes là pour répondre à toutes vos questions"
        bgClass="hero-contact"
      />

      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <h2 className="fw-bold mb-4">Envoyez-nous un message</h2>
              {status === 'success' && (
                <div className="alert alert-success">Message envoyé avec succès !</div>
              )}
              {status === 'error' && (
                <div className="alert alert-danger">Erreur lors de l'envoi. Veuillez réessayer.</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="name"
                    placeholder="Votre nom"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    name="email"
                    placeholder="Votre email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="subject"
                    placeholder="Sujet"
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control form-control-lg"
                    name="message"
                    rows="5"
                    placeholder="Votre message"
                    value={form.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100" disabled={submitting}>
                  {submitting ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  ) : (
                    <FaPaperPlane className="me-2" />
                  )}
                  {submitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
              </form>
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bold mb-4">Nos coordonnées</h2>
              <div className="d-flex mb-3">
                <FaMapMarkerAlt className="text-primary fs-4 me-3 mt-1" />
                <div>
                  <h6 className="fw-bold mb-1">Adresse</h6>
                  <p className="text-secondary mb-0">Keur Massar Nord/Boune</p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <FaPhone className="text-primary fs-4 me-3 mt-1" />
                <div>
                  <h6 className="fw-bold mb-1">Téléphone</h6>
                  <p className="text-secondary mb-0">77 109 73 20 / 76 930 69 39</p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <FaWhatsapp className="text-success fs-4 me-3 mt-1" />
                <div>
                  <h6 className="fw-bold mb-1">WhatsApp</h6>
                  <a
                    href="https://wa.me/221769306939"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-success text-decoration-none fw-semibold"
                  >
                    76 930 69 39
                  </a>
                </div>
              </div>
              <div className="d-flex mb-4">
                <FaEnvelope className="text-primary fs-4 me-3 mt-1" />
                <div>
                  <h6 className="fw-bold mb-1">Email</h6>
                  <p className="text-secondary mb-0">THSDMULTITECH@GMAIL.COM</p>
                </div>
              </div>

              <div className="rounded-4 overflow-hidden border mt-4">
                <iframe
                  title="Google Maps - THSD Multitech"
                  src="https://www.google.com/maps?q=Keur+Massar+Nord+Dakar+Senegal&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
