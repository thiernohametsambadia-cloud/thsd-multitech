import { useState, useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import ServiceCard from '../components/ServiceCard'
import { FaArrowRight, FaStar, FaQuoteLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { api } from '../api'

const Home = () => {
  const [services, setServices] = useState([])

  useEffect(() => {
    api.get('/api/services').then(setServices).catch(() => setServices([]))
  }, [])

  const realisations = [
    {
      title: 'Site E-commerce Thiossane Shop',
      desc: 'Plateforme de vente en ligne pour une boutique de prêt-à-porter dakaroise avec paiement mobile Orange Money.',
      img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      tags: ['React', 'Node.js', 'Orange Money']
    },
    {
      title: 'Application de Gestion Scolaire',
      desc: 'Solution complète de gestion des notes, emplois du temps et communications pour un groupe scolaire à Thiès.',
      img: 'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=600&h=400&fit=crop',
      tags: ['Vue.js', 'Laravel', 'MySQL']
    },
    {
      title: 'Réseau Informatique SENELEC',
      desc: 'Déploiement et sécurisation du réseau interne pour une agence de distribution électrique à Dakar.',
      img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
      tags: ['Réseau', 'Sécurité', 'Cisco']
    },
    {
      title: 'Site Vitrine Hôtel Sokhamone',
      desc: 'Site web moderne avec réservation en ligne pour un hôtel situé à Saly Portudal.',
      img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
      tags: ['React', 'UI/UX', 'Réservation']
    }
  ]

  const temoignages = [
    {
      nom: 'Aminata Diallo',
      entreprise: 'Thiossane Shop, Dakar',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      texte: 'THSD Multitech nous a conçu un site e-commerce magnifique. Les paiements via Orange Money ont boosté nos ventes de 40%. Une équipe professionnelle et à l\'écoute !'
    },
    {
      nom: 'Mamadou Ndiaye',
      entreprise: 'Groupe Scolaire La Fontaine, Thiès',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      texte: 'Grâce à leur application de gestion scolaire, nous avons numérisé toute notre administration. Le suivi des élèves est désormais un jeu d\'enfant. Je recommande vivement !'
    },
    {
      nom: 'Fatou Sylla',
      entreprise: 'Hôtel Sokhamone, Saly',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
      texte: 'Notre site vitrine a dépassé toutes nos attentes. Le système de réservation est intuitif et nos clients étrangers adorent. Merci à toute l\'équipe THSD !'
    }
  ]

  return (
    <>
      <HeroSection
        title="Solutions Technologiques Innovantes"
        subtitle="Nous transformons vos idées en solutions digitales performantes"
        btnText="Découvrir nos services"
        btnLink="/services"
        bgClass="hero-home"
      />

      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Nos Services</h2>
            <p className="text-secondary">Des solutions complètes pour votre transformation numérique</p>
          </div>
          <div className="row">
            {services.map(service => (
              <ServiceCard key={service.id || service._id} {...service} />
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/services" className="btn btn-outline-primary btn-lg">
              Voir tous les services <FaArrowRight className="ms-2" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="fw-bold">Pourquoi nous choisir ?</h2>
              <p className="text-secondary">
                Chez THSD Multitech, nous combinons expertise technique et créativité pour offrir des solutions sur mesure.
              </p>
              <ul className="list-unstyled">
                <li className="mb-2"><span className="text-primary fw-bold">✓</span> Équipe expérimentée</li>
                <li className="mb-2"><span className="text-primary fw-bold">✓</span> Technologies modernes</li>
                <li className="mb-2"><span className="text-primary fw-bold">✓</span> Support réactif</li>
                <li className="mb-2"><span className="text-primary fw-bold">✓</span> Prix compétitifs</li>
              </ul>
            </div>
            <div className="col-lg-6">
              <div className="bg-primary text-white rounded-4 p-5 text-center">
                <h3 className="fw-bold mb-3">Prêt à démarrer ?</h3>
                <p className="mb-4">Contactez-nous dès aujourd'hui pour discuter de votre projet</p>
                <Link to="/contact" className="btn btn-light btn-lg px-4">
                  Nous contacter <FaArrowRight className="ms-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Nos Réalisations</h2>
            <p className="text-secondary">Quelques projets que nous avons menés avec succès</p>
          </div>
          <div className="row g-4">
            {realisations.map((r, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100 realisation-card">
                  <div className="position-relative overflow-hidden" style={{ height: 200 }}>
                    <img src={r.img} alt={r.title} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-bold">{r.title}</h5>
                    <p className="text-secondary small flex-grow-1">{r.desc}</p>
                    <div className="d-flex flex-wrap gap-1 mt-auto">
                      {r.tags.map((tag, j) => (
                        <span key={j} className="badge bg-primary bg-opacity-10 text-primary">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/portfolio" className="btn btn-outline-primary btn-lg">
              Voir toutes nos réalisations <FaArrowRight className="ms-2" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-dark text-white py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Ce que disent nos clients</h2>
            <p className="text-secondary">La satisfaction de nos clients sénégalais est notre meilleure fierté</p>
          </div>
          <div className="row g-4">
            {temoignages.map((t, i) => (
              <div key={i} className="col-lg-4">
                <div className="bg-white bg-opacity-10 rounded-4 p-4 h-100 d-flex flex-column">
                  <FaQuoteLeft className="text-primary mb-3 fs-3" />
                  <p className="flex-grow-1 fst-italic mb-4">"{t.texte}"</p>
                  <div className="d-flex align-items-center mt-auto">
                    <img src={t.avatar} alt={t.nom} className="rounded-circle me-3" width="50" height="50" style={{ objectFit: 'cover' }} />
                    <div>
                      <h6 className="fw-bold mb-0">{t.nom}</h6>
                      <small className="text-secondary">{t.entreprise}</small>
                      <div className="text-warning small mt-1">
                        <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
