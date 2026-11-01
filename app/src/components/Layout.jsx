
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div className="app-container">
      <header className="site-header">
        <Navbar />
      </header>

      {children}

      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} LayarKita — Daftar Tontonan Film dan Serial.
        </p>
        <Link to="/tentang">Tentang Pembuat</Link>
      </footer>
    </div>
  )
}
