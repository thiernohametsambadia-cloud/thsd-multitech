import { useState, useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import ServiceCard from '../components/ServiceCard'
import { api } from '../api'

const Services = () => {
  const [services, setServices] = useState([])

  useEffect(() => {
    api.get('/api/services').then(setServices).catch(() => setServices([]))
  }, [])

  return (
    <>
      <HeroSection
        title="Nos Services"
        subtitle="Des solutions adaptées à vos besoins"
        bgClass="hero-services"
      />

      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Ce que nous proposons</h2>
            <p className="text-secondary">
              Nous offrons une gamme complète de services pour accompagner votre transformation numérique
            </p>
          </div>
          <div className="row">
            {services.map(service => (
              <ServiceCard key={service.id || service._id} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Vous avez un projet en tête ?</h2>
          <p className="lead mb-4">Discutons de vos besoins et trouvons la meilleure solution</p>
          <a href="mailto:THSDMULTITECH@GMAIL.COM" className="btn btn-light btn-lg px-5">
            Contactez-nous
          </a>
        </div>
      </section>
    </>
  )
}

export default Services
