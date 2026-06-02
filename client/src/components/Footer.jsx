import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3">
              <span className="text-primary">THSD</span> Multitech
            </h5>
            <p className="text-secondary">
              Solutions technologiques innovantes pour votre entreprise. Développement web, design et maintenance informatique.
            </p>
          </div>
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3">Liens rapides</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-secondary text-decoration-none hover-white">Accueil</Link></li>
              <li className="mb-2"><Link to="/services" className="text-secondary text-decoration-none hover-white">Services</Link></li>
              <li className="mb-2"><Link to="/about" className="text-secondary text-decoration-none hover-white">À propos</Link></li>
              <li className="mb-2"><Link to="/portfolio" className="text-secondary text-decoration-none hover-white">Réalisations</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-secondary text-decoration-none hover-white">Contact</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3">Contact</h6>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2">THSDMULTITECH@GMAIL.COM</li>
              <li className="mb-2">77 109 73 20 / 76 930 69 39</li>
              <li className="mb-2">Keur Massar Nord/Boune</li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3">Suivez-nous</h6>
            <div className="d-flex gap-3 fs-5">
              <a href="https://wa.me/221769306939" target="_blank" rel="noopener noreferrer" className="text-secondary hover-primary"><FaWhatsapp /></a>
              <a href="#" className="text-secondary hover-primary"><FaFacebook /></a>
              <a href="#" className="text-secondary hover-primary"><FaTwitter /></a>
              <a href="#" className="text-secondary hover-primary"><FaLinkedin /></a>
              <a href="#" className="text-secondary hover-primary"><FaInstagram /></a>
            </div>
          </div>
        </div>
        <hr className="border-secondary my-4" />
        <div className="text-center text-secondary">
          <small>&copy; {year} THSD Multitech. Tous droits réservés.</small>
        </div>
      </div>
    </footer>
  )
}

export default Footer
