
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const menu = [
    { to: '/', label: 'Beranda' },
    { to: '/koleksi', label: 'Koleksi' },
    { to: '/tambah', label: 'Tambah Film' },
    { to: '/statistik', label: 'Statistik' },
    { to: '/tentang', label: 'Tentang' },
  ]

  return (
    <nav className="navbar" aria-label="Navigasi utama">
      <div className="nav-brand">LayarKita</div>

      <div className="nav-links">
        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              isActive ? 'nav-link aktif' : 'nav-link'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
