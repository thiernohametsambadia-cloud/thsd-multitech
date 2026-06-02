import { useState, useEffect } from 'react'
import { FaTrash, FaEnvelopeOpen, FaEnvelope } from 'react-icons/fa'
import { api } from '../../api'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const [selected, setSelected] = useState(null)

  const fetchMessages = () => {
    api.get('/api/messages', true).then(setMessages).catch(() => {})
  }

  useEffect(() => { fetchMessages() }, [])

  const markAsRead = async (id) => {
    await api.put(`/api/messages/${id}/read`, {})
    fetchMessages()
  }

  const deleteMessage = async (id) => {
    if (!window.confirm('Supprimer ce message ?')) return
    await api.delete(`/api/messages/${id}`)
    setSelected(null)
    fetchMessages()
  }

  const unreadCount = messages.filter(m => !m.is_read).length

  return (
    <div>
      <h3 className="fw-bold mb-4">
        Messages {unreadCount > 0 && <span className="badge bg-danger ms-2">{unreadCount} non lu(s)</span>}
      </h3>

      <div className="row g-4">
        <div className={`col-lg-5 ${selected ? 'd-none d-lg-block' : ''}`}>
          <div className="card border-0 shadow-sm">
            <div className="list-group list-group-flush">
              {messages.length === 0 ? (
                <div className="list-group-item text-center text-secondary py-5">
                  Aucun message
                </div>
              ) : (
                messages.map(msg => (
                  <button
                    key={msg._id || msg.id}
                    className={`list-group-item list-group-item-action d-flex align-items-start ${selected?._id === msg._id ? 'active' : ''} ${!msg.is_read ? 'fw-bold' : ''}`}
                    onClick={() => { setSelected(msg); if (!msg.is_read) markAsRead(msg._id) }}
                  >
                    <span className="me-2 mt-1">
                      {msg.is_read ? <FaEnvelopeOpen className="text-secondary" /> : <FaEnvelope className="text-primary" />}
                    </span>
                    <div className="flex-grow-1 text-start">
                      <small className="d-block text-secondary">{new Date(msg.createdAt || msg.created_at).toLocaleString()}</small>
                      <span>{msg.name}</span>
                      <small className="d-block text-truncate">{msg.subject || 'Sans sujet'}</small>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div className={`col-lg-7 ${!selected ? 'd-none d-lg-block' : ''}`}>
          {selected ? (
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="fw-bold mb-0">{selected.name}</h5>
                  <small className="text-secondary">{selected.email} &mdash; {new Date(selected.createdAt || selected.created_at).toLocaleString()}</small>
                </div>
                <button className="btn btn-outline-danger btn-sm" onClick={() => deleteMessage(selected._id)}>
                  <FaTrash />
                </button>
              </div>
              <div className="card-body">
                <h6 className="fw-bold">{selected.subject || 'Sans sujet'}</h6>
                <p className="text-secondary" style={{ whiteSpace: 'pre-wrap' }}>{selected.message}</p>
              </div>
              <div className="card-footer bg-white">
                <a href={`mailto:${selected.email}`} className="btn btn-primary btn-sm">
                  Répondre par email
                </a>
              </div>
            </div>
          ) : (
            <div className="card border-0 shadow-sm d-flex align-items-center justify-content-center text-secondary" style={{ minHeight: '300px' }}>
              <p className="mb-0">Sélectionnez un message pour le lire</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages
