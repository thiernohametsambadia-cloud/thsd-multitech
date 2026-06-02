import {
  FaGlobe, FaPalette, FaLaptopCode, FaChalkboardTeacher,
  FaShoppingCart, FaShieldAlt, FaChartLine, FaFigma,
  FaMobileAlt, FaCloud
} from 'react-icons/fa'
import { IconContext } from 'react-icons'

const iconMap = {
  FaGlobe,
  FaPalette,
  FaLaptopCode,
  FaChalkboardTeacher,
  FaShoppingCart,
  FaShieldAlt,
  FaChartLine,
  FaFigma,
  FaMobileAlt,
  FaCloud
}

const ServiceCard = ({ title, description, icon }) => {
  const IconComponent = iconMap[icon] || FaGlobe

  return (
    <div className="col-md-6 col-lg-3 mb-4">
      <div className="card service-card h-100 border-0 shadow-sm text-center p-4">
        <IconContext.Provider value={{ className: 'service-icon text-primary mb-3', size: '2.5em' }}>
          <div>
            <IconComponent />
          </div>
        </IconContext.Provider>
        <div className="card-body p-0">
          <h5 className="card-title fw-bold mb-2">{title}</h5>
          <p className="card-text text-secondary">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
