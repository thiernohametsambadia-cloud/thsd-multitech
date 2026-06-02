import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa'
import { api } from '../../api'

const ServicesAdmin = () => {
  const [services, setServices] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', description: '', icon: 'FaGlobe' })
  const [showForm, setShowForm] = useState(false)

  const fetchServices = () => {
    api.get('/api/services').then(setServices).catch(() => {})
  }

  useEffect(() => { fetchServices() }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setForm({ title: '', description: '', icon: 'FaGlobe' })
    setEditing(null)
    setShowForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = editing ? `/api/services/${editing}` : '/api/services'
    if (editing) {
      await api.put(url, form)
    } else {
      await api.post(url, form, true)
    }
    resetForm()
    fetchServices()
  }

  const deleteService = async (id) => {
    if (!window.confirm('Supprimer ce service ?')) return
    await api.delete(`/api/services/${id}`)
    fetchServices()
  }

  const startEdit = (svc) => {
    setForm({ title: svc.title, description: svc.description, icon: svc.icon || 'FaGlobe' })
    setEditing(svc._id || svc.id)
    setShowForm(true)
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">Gestion des services</h3>
        {!showForm && (
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            <FaPlus className="me-2" />Ajouter un service
          </button>
        )}
      </div>

      {showForm && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <h5 className="fw-bold mb-3">{editing ? 'Modifier le service' : 'Nouveau service'}</h5>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Titre"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <select className="form-select" name="icon" value={form.icon} onChange={handleChange}>
                    <option value="FaGlobe">Développement Web</option>
                    <option value="FaPalette">Graphic Design</option>
                    <option value="FaLaptopCode">Maintenance</option>
                    <option value="FaChalkboardTeacher">Formation</option>
                    <option value="FaShoppingCart">E-commerce & Paiement</option>
                    <option value="FaShieldAlt">Réseau & Sécurité</option>
                    <option value="FaChartLine">Marketing Digital & SEO</option>
                    <option value="FaFigma">UI/UX Design</option>
                    <option value="FaMobileAlt">Développement Mobile</option>
                    <option value="FaCloud">Hébergement & Cloud</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success flex-grow-1">
                      <FaSave className="me-2" />{editing ? 'Modifier' : 'Créer'}
                    </button>
                    <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>
                      <FaTimes />
                    </button>
                  </div>
                </div>
                <div className="col-12">
                  <textarea
                    className="form-control"
                    name="description"
                    placeholder="Description"
                    rows="2"
                    value={form.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Icône</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-secondary py-5">Aucun service</td>
                </tr>
              ) : (
                services.map(svc => (
                  <tr key={svc._id || svc.id}>
                    <td className="fw-bold">{svc.title}</td>
                    <td className="text-secondary" style={{ maxWidth: '300px' }}>
                      <span className="d-inline-block text-truncate" style={{ maxWidth: '100%' }}>{svc.description}</span>
                    </td>
                    <td><code>{svc.icon}</code></td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => startEdit(svc)}>
                        <FaEdit />
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => deleteService(svc._id || svc.id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ServicesAdmin
