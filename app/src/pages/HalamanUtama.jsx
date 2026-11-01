
import { Link } from 'react-router-dom'
import { useKoleksi } from '../hooks/useKoleksi'
import { usePencarian } from '../hooks/usePencarian'
import KartuFilm from '../components/KartuFilm'
import Pesan from '../components/Pesan'

export function Beranda() {
  const { koleksi, loading, error } = useKoleksi()

  return (
    <main className="page-content" id="beranda">
      <section className="hero">
        <p className="hero-label">SELAMAT DATANG DI LAYARKITA</p>
        <h1>Temukan Cerita Favoritmu</h1>
        <p>
          Tempat mencatat dan mengelola daftar tontonan film dan serial favoritmu.
        </p>
        <Link className="tombol-utama" to="/koleksi">
          Jelajahi Koleksi
        </Link>
      </section>

      <section className="section-content">
        <h2>Koleksi Tontonan</h2>
        <Pesan loading={loading} error={error}>
          <p>
            Saat ini tersedia <strong>{koleksi.length}</strong> tontonan.
          </p>
          <div className="film-grid">
            {koleksi.slice(0, 3).map((film) => (
              <KartuFilm key={film.id} film={film} />
            ))}
          </div>
        </Pesan>
      </section>
    </main>
  )
}

export function HalamanKoleksi() {
  const { koleksi, loading, error } = useKoleksi()
  const { kataKunci, setKataKunci, hasilPencarian } =
    usePencarian(koleksi)

  return (
    <main className="page-content">
      <h1>Daftar Koleksi Film dan Serial</h1>

      <label htmlFor="cari-film">Cari berdasarkan judul</label>
      <input
        id="cari-film"
        type="search"
        value={kataKunci}
        onChange={(event) => setKataKunci(event.target.value)}
        placeholder="Cari film..."
      />

      <Pesan loading={loading} error={error}>
        {hasilPencarian.length > 0 ? (
          <div className="film-grid">
            {hasilPencarian.map((film) => (
              <KartuFilm key={film.id} film={film} />
            ))}
          </div>
        ) : (
          <p>Film tidak ditemukan.</p>
        )}
      </Pesan>
    </main>
  )
}
