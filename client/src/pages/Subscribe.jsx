import { useState } from 'react'
import { FaPaperPlane, FaCheckCircle, FaEnvelope, FaTag, FaNewspaper } from 'react-icons/fa'
import { api } from '../api'

const Subscribe = () => {
  const [form, setForm] = useState({ email: '', name: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const data = await api.post('/api/subscribers', form)
      setSuccess(data.message)
      setForm({ email: '', name: '', phone: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="hero-subscribe text-white d-flex align-items-center" style={{ minHeight: '40vh', background: 'linear-gradient(135deg, #0d6efd 0%, #dc3545 100%)' }}>
        <div className="container text-center py-5">
          <h1 className="fw-bold display-5 animate-fade-in">Abonnez-vous à THSD Multitech</h1>
          <p className="lead animate-fade-in-delay">Recevez nos offres exclusives et nos dernières publications</p>
        </div>
      </div>

      <section className="py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h2 className="fw-bold mb-4">Restez informé</h2>
              <p className="text-secondary mb-4">
                En vous abonnant à notre newsletter, vous serez parmi les premiers informés de nos
                nouvelles offres, promotions et publications.
              </p>

              <div className="d-flex align-items-start mb-3">
                <FaTag className="text-primary me-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h6 className="fw-bold mb-1">Offres exclusives</h6>
                  <small className="text-secondary">Accédez à nos promotions et réductions réservées aux abonnés</small>
                </div>
              </div>
              <div className="d-flex align-items-start mb-3">
                <FaNewspaper className="text-primary me-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h6 className="fw-bold mb-1">Publications & Articles</h6>
                  <small className="text-secondary">Recevez nos articles techniques, études de cas et actualités</small>
                </div>
              </div>
              <div className="d-flex align-items-start mb-3">
                <FaEnvelope className="text-primary me-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h6 className="fw-bold mb-1">Newsletter mensuelle</h6>
                  <small className="text-secondary">Un résumé de nos activités chaque mois dans votre boîte mail</small>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-lg">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-3">Formulaire d'abonnement</h4>

                  {success && (
                    <div className="alert alert-success d-flex align-items-center">
                      <FaCheckCircle className="me-2" /> {success}
                    </div>
                  )}
                  {error && <div className="alert alert-danger">{error}</div>}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-medium">Email <span className="text-danger">*</span></label>
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-lg"
                        placeholder="votre@email.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-medium">Nom complet</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control form-control-lg"
                        placeholder="Votre nom (optionnel)"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label fw-medium">Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control form-control-lg"
                        placeholder="Votre téléphone (optionnel)"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100 fw-bold"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="spinner-border spinner-border-sm me-2" />
                      ) : (
                        <FaPaperPlane className="me-2" />
                      )}
                      S'abonner
                    </button>
                  </form>
                  <p className="text-secondary text-center mt-3 mb-0 small">
                    Vos informations sont confidentielles. Vous pouvez vous désabonner à tout moment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Subscribe
