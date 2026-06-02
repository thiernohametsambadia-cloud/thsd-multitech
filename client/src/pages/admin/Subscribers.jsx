import { useState, useEffect } from 'react'
import { FaTrash, FaEnvelope, FaUsers } from 'react-icons/fa'
import { api } from '../../api'

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([])

  const fetchSubscribers = () => {
    api.get('/api/subscribers', true).then(setSubscribers).catch(() => {})
  }

  useEffect(() => { fetchSubscribers() }, [])

  const deleteSubscriber = async (id) => {
    if (!window.confirm('Supprimer cet abonné ?')) return
    await api.delete(`/api/subscribers/${id}`)
    fetchSubscribers()
  }

  return (
    <div>
      <h3 className="fw-bold mb-4">
        <FaUsers className="me-2" />Abonnés
        {subscribers.length > 0 && <span className="badge bg-primary ms-2">{subscribers.length}</span>}
      </h3>

      <div className="card border-0 shadow-sm">
        {subscribers.length === 0 ? (
          <div className="text-center text-secondary py-5">
            <FaUsers size={40} className="mb-3 text-secondary" />
            <p className="mb-0">Aucun abonné pour le moment</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Inscrit le</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map(sub => (
                  <tr key={sub._id}>
                    <td className="fw-medium">{sub.name || '-'}</td>
                    <td>
                      <a href={`mailto:${sub.email}`} className="text-decoration-none">
                        <FaEnvelope className="me-1 text-primary" size={12} />{sub.email}
                      </a>
                    </td>
                    <td>{sub.phone || '-'}</td>
                    <td>{new Date(sub.createdAt).toLocaleDateString('fr-FR')}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deleteSubscriber(sub._id)}
                        title="Supprimer"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Subscribers
