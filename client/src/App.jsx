import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Subscribe from './pages/Subscribe'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Messages from './pages/admin/Messages'
import ServicesAdmin from './pages/admin/ServicesAdmin'
import Subscribers from './pages/admin/Subscribers'
import { FaWhatsapp } from 'react-icons/fa'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const Layout = () => (
  <>
    <Navbar />
    <main className="flex-grow-1">
      <Outlet />
    </main>
    <Footer />
    <a
      href="https://wa.me/221769306939"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      title="Contactez-nous sur WhatsApp"
    >
      <FaWhatsapp />
    </a>
  </>
)

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/subscribe" element={<Subscribe />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/admin" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <AdminLayout />
                  <Footer />
                </>
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="messages" element={<Messages />} />
              <Route path="services" element={<ServicesAdmin />} />
              <Route path="subscribers" element={<Subscribers />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
