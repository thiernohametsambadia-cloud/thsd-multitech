import HeroSection from '../components/HeroSection'
import { FaGlobe, FaMobileAlt, FaCogs, FaPalette, FaSearch, FaArrowRight } from 'react-icons/fa'

const Portfolio = () => {
  const projects = [
    {
      title: 'Site E-commerce Thiossane Shop',
      client: 'Thiossane Shop, Dakar',
      desc: 'Plateforme de vente en ligne complète avec catalogue produits, panier, paiement mobile via Orange Money et suivi des commandes.',
      img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
      tags: ['React', 'Node.js', 'Orange Money API', 'Bootstrap'],
      icon: <FaGlobe />
    },
    {
      title: 'Application de Gestion Scolaire',
      client: 'Groupe Scolaire La Fontaine, Thiès',
      desc: 'Application web de gestion des notes, absences, emplois du temps, bulletins et communication parents-enseignants.',
      img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop',
      tags: ['Vue.js', 'Laravel', 'MySQL', 'REST API'],
      icon: <FaMobileAlt />
    },
    {
      title: 'Réseau Informatique SENELEC',
      client: 'SENELEC Agence Nord, Dakar',
      desc: 'Audit, déploiement et sécurisation du réseau interne. Installation de serveurs, pare-feu et solution de sauvegarde.',
      img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
      tags: ['Cisco', 'Sécurité', 'VPN', 'Serveurs'],
      icon: <FaCogs />
    },
    {
      title: 'Site Vitrine Hôtel Sokhamone',
      client: 'Hôtel Sokhamone, Saly',
      desc: 'Site vitrine moderne avec galerie photos, système de réservation en ligne, avis clients et intégration Google Maps.',
      img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop',
      tags: ['React', 'UI/UX', 'Réservation', 'Responsive'],
      icon: <FaPalette />
    },
    {
      title: 'Refonte Identité Visuelle',
      client: 'Cabinet Afrique Conseil, Dakar',
      desc: 'Création d\'une identité visuelle complète : logo, charte graphique, cartes de visite, templates PowerPoint et supports de communication.',
      img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=500&fit=crop',
      tags: ['Photoshop', 'Illustrator', 'Branding'],
      icon: <FaPalette />
    },
    {
      title: 'Platforme de Formation en Ligne',
      client: 'FormaPro Sénégal',
      desc: 'LMS (Learning Management System) avec cours vidéo, quiz, certificats et suivi des apprenants. Solution dédiée aux formations professionnelles.',
      img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop',
      tags: ['React', 'Node.js', 'Streaming', 'MongoDB'],
      icon: <FaSearch />
    }
  ]

  return (
    <>
      <HeroSection
        title="Nos Réalisations"
        subtitle="Découvrez les projets qui ont transformé nos clients"
        bgClass="hero-portfolio"
      />

      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Projets réalisés</h2>
            <p className="text-secondary">
              Chaque projet est une histoire de collaboration et de succès
            </p>
          </div>
          {projects.map((p, i) => (
            <div key={i} className={`row g-4 mb-5 align-items-center ${i % 2 === 1 ? 'flex-row-reverse' : ''}`}>
              <div className="col-lg-6">
                <div className="rounded-4 overflow-hidden shadow">
                  <img src={p.img} alt={p.title} className="w-100" style={{ objectFit: 'cover', height: 350 }} />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="text-primary mb-2 fs-2">{p.icon}</div>
                <h3 className="fw-bold">{p.title}</h3>
                <p className="text-secondary mb-1"><strong>Client :</strong> {p.client}</p>
                <p className="text-secondary">{p.desc}</p>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {p.tags.map((tag, j) => (
                    <span key={j} className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">{tag}</span>
                  ))}
                </div>
                <a href="/contact" className="btn btn-primary">
                  Un projet similaire ? <FaArrowRight className="ms-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary text-white py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">Vous avez un projet en tête ?</h2>
          <p className="lead mb-4">Parlons-en et créons ensemble votre prochain succès</p>
          <a href="/contact" className="btn btn-light btn-lg px-5">
            Discutons de votre projet
          </a>
        </div>
      </section>
    </>
  )
}

export default Portfolio
