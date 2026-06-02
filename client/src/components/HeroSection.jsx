import { Link } from 'react-router-dom'

const HeroSection = ({ title, subtitle, btnText, btnLink, bgClass }) => {
  return (
    <section className={`hero-section d-flex align-items-center ${bgClass || ''}`}>
      <div className="container text-center text-white py-5">
        <h1 className="display-4 fw-bold mb-3 animate-fade-in">{title}</h1>
        {subtitle && <p className="lead mb-4 animate-fade-in-delay">{subtitle}</p>}
        {btnText && btnLink && (
          <Link to={btnLink} className="btn btn-primary btn-lg px-5 py-3 fw-semibold animate-fade-in-delay-2">
            {btnText}
          </Link>
        )}
      </div>
    </section>
  )
}

export default HeroSection
