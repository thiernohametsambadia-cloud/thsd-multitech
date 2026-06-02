import { useState, useEffect } from 'react'
import { FaEnvelope, FaCogs, FaUsers, FaChartLine } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../api'

const Dashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({ messages: 0, services: 0, subscribers: 0 })
  const [recentMessages, setRecentMessages] = useState([])

  useEffect(() => {
    api.get('/api/messages', true)
      .then(data => {
        setStats(prev => ({ ...prev, messages: data.length }))
        setRecentMessages(data.slice(0, 5))
      })
      .catch(() => {})
    api.get('/api/services')
      .then(data => setStats(prev => ({ ...prev, services: data.length })))
      .catch(() => {})
    api.get('/api/subscribers', true)
      .then(data => setStats(prev => ({ ...prev, subscribers: data.length })))
      .catch(() => {})
  }, [])

  const cards = [
    { icon: <FaEnvelope size={28} />, label: 'Messages', value: stats.messages, color: 'primary' },
    { icon: <FaCogs size={28} />, label: 'Services', value: stats.services, color: 'success' },
    { icon: <FaUsers size={28} />, label: 'Abonnés', value: stats.subscribers, color: 'info' },
    { icon: <FaChartLine size={28} />, label: 'Visites', value: '-', color: 'warning' },
  ]

  return (
    <div>
      <h3 className="fw-bold mb-4">Tableau de bord</h3>
      <p className="text-secondary mb-4">Bienvenue, {user?.email}</p>

      <div className="row g-4 mb-5">
        {cards.map((card, i) => (
          <div key={i} className="col-md-3 col-6">
            <div className={`card border-0 shadow-sm bg-${card.color} text-white`}>
              <div className="card-body text-center">
                <div className="mb-2">{card.icon}</div>
                <h3 className="fw-bold mb-1">{card.value}</h3>
                <small>{card.label}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white fw-bold">
          Messages récents
        </div>
        <div className="card-body p-0">
          {recentMessages.length === 0 ? (
            <p className="text-center text-secondary p-4 mb-0">Aucun message pour le moment</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Sujet</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentMessages.map(msg => (
                    <tr key={msg._id || msg.id} className={!msg.is_read ? 'fw-bold' : ''}>
                      <td>{msg.name}</td>
                      <td>{msg.email}</td>
                      <td>{msg.subject || '-'}</td>
                      <td>{new Date(msg.createdAt || msg.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
