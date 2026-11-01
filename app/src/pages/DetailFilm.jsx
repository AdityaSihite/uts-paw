
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useKoleksiContext } from '../context/KoleksiContext'
import { useKoleksi } from '../hooks/useKoleksi'
import Pesan from '../components/Pesan'

export default function DetailFilm() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { koleksi, loading, error } = useKoleksi()
  const { hapusKoleksi } = useKoleksiContext()

  const film = koleksi.find((item) => item.id === id)

  function handleHapus() {
    const yakin = window.confirm(
      `Hapus "${film.judul}" dari koleksi?`,
    )

    if (yakin) {
      hapusKoleksi(id)
      navigate('/koleksi')
    }
  }

  return (
    <main className="page-content">
      <Pesan loading={loading} error={error}>
        {film ? (
          <section className="detail-card">
            <span className="film-category">{film.kategori}</span>
            <h1>{film.judul}</h1>

            <div className="detail-info">
              <p><strong>Sutradara:</strong> {film.sutradara}</p>
              <p><strong>Tahun Rilis:</strong> {film.tahunRilis}</p>
              <p><strong>Rating (IMDb):</strong> ⭐ {film.rating}</p>
            </div>

            <div className="detail-actions">
              <Link className="tombol-sekunder" to="/koleksi">
                Kembali
              </Link>

              <button
                className="tombol-hapus"
                type="button"
                onClick={handleHapus}
              >
                Hapus Film
              </button>
            </div>
          </section>
        ) : (
          <section>
            <h1>Film Tidak Ditemukan</h1>
            <p>Maaf, data film dengan ID tersebut tidak ditemukan.</p>
            <Link to="/koleksi">Kembali ke Koleksi</Link>
          </section>
        )}
      </Pesan>
    </main>
  )
}
