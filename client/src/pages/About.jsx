import HeroSection from '../components/HeroSection'
import { FaLightbulb, FaHandshake, FaRocket, FaAward, FaLaptopCode } from 'react-icons/fa'

const About = () => {
  const values = [
    { icon: <FaLightbulb size={32} />, title: 'Innovation', text: 'Nous restons à la pointe de la technologie pour vous offrir les meilleures solutions.' },
    { icon: <FaHandshake size={32} />, title: 'Confiance', text: 'La satisfaction de nos clients est notre priorité absolue.' },
    { icon: <FaRocket size={32} />, title: 'Performance', text: 'Des solutions optimisées pour des résultats rapides et durables.' },
    { icon: <FaAward size={32} />, title: 'Qualité', text: 'Un travail soigné et professionnel, conforme aux standards du marché.' },
  ]

  const team = [
    { nom: 'Expert en développement', img: 'https://images.unsplash.com/photo-1596003906949-67221c37965c?w=200&h=200&fit=crop' },
    { nom: 'Designer graphique', img: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=200&h=200&fit=crop' },
    { nom: 'Technicien maintenance', img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=200&h=200&fit=crop' },
    { nom: 'Formateur certifié', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=200&h=200&fit=crop' },
  ]

  return (
    <>
      <HeroSection
        title="À propos de nous"
        subtitle="Découvrez qui nous sommes et ce que nous faisons"
        bgClass="hero-about"
      />

      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="fw-bold">Qui sommes-nous ?</h2>
              <p className="text-secondary">
                Basée à <strong>Keur Massar Nord/Boune</strong>, <strong>THSD Multitech</strong> est une entreprise sénégalaise spécialisée dans les solutions technologiques. 
                Nous accompagnons les entreprises et les particuliers dans leur transformation numérique 
                en proposant des services de développement web, design graphique, maintenance informatique 
                et formation.
              </p>
              <p className="text-secondary">
                Notre équipe combine expertise technique et passion pour l'innovation, avec une connaissance 
                approfondie du marché sénégalais et des solutions adaptées aux besoins locaux.
              </p>
            </div>
            <div className="col-lg-6">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop" 
                alt="Bureau THSD Multitech" 
                className="w-100 rounded-4 shadow"
                style={{ objectFit: 'cover', maxHeight: 400 }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0 order-lg-2">
              <h2 className="fw-bold">Notre équipe</h2>
              <p className="text-secondary">
                Une équipe passionnée de professionnels dédiés à votre réussite.
              </p>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="row g-3">
                {team.map((m, i) => (
                  <div key={i} className="col-6">
                    <div className="text-center">
                      <img src={m.img} alt={m.nom} className="rounded-circle shadow mb-2" width="120" height="120" style={{ objectFit: 'cover' }} />
                      <small className="text-secondary d-block">{m.nom}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img 
                src="https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=600&h=400&fit=crop" 
                alt="Matériel informatique" 
                className="w-100 rounded-4 shadow"
                style={{ objectFit: 'cover', maxHeight: 400 }}
              />
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bold">Notre équipement</h2>
              <p className="text-secondary">
                Nous utilisons du matériel de pointe pour garantir des prestations de qualité :
              </p>
              <div className="d-flex align-items-start mb-3">
                <FaLaptopCode className="text-primary fs-4 me-3 mt-1" />
                <div>
                  <h6 className="fw-bold mb-1">Postes de travail professionnels</h6>
                  <p className="text-secondary mb-0 small">Stations de travail haute performance pour le développement et le design</p>
                </div>
              </div>
              <div className="d-flex align-items-start mb-3">
                <FaLaptopCode className="text-primary fs-4 me-3 mt-1" />
                <div>
                  <h6 className="fw-bold mb-1">Serveurs et infrastructure réseau</h6>
                  <p className="text-secondary mb-0 small">Équipements serveurs pour hébergement et tests</p>
                </div>
              </div>
              <div className="d-flex align-items-start">
                <FaLaptopCode className="text-primary fs-4 me-3 mt-1" />
                <div>
                  <h6 className="fw-bold mb-1">Outils de diagnostic</h6>
                  <p className="text-secondary mb-0 small">Équipements de pointe pour la maintenance et le dépannage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Nos Valeurs</h2>
          </div>
          <div className="row g-4">
            {values.map((v, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm text-center p-4 h-100">
                  <div className="text-primary mb-3">{v.icon}</div>
                  <h5 className="fw-bold">{v.title}</h5>
                  <p className="text-secondary mb-0">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <div className="bg-dark text-white rounded-4 p-5">
              <h3 className="fw-bold mb-3">Nos chiffres clés</h3>
              <div className="row g-4">
                <div className="col-3">
                  <h2 className="text-primary fw-bold">50+</h2>
                  <p className="mb-0">Projets réalisés</p>
                </div>
                <div className="col-3">
                  <h2 className="text-primary fw-bold">30+</h2>
                  <p className="mb-0">Clients satisfaits</p>
                </div>
                <div className="col-3">
                  <h2 className="text-primary fw-bold">4+</h2>
                  <p className="mb-0">Années d'expérience</p>
                </div>
                <div className="col-3">
                  <h2 className="text-primary fw-bold">10+</h2>
                  <p className="mb-0">Experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
