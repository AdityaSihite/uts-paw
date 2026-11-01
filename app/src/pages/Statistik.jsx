
import { useKoleksi } from '../hooks/useKoleksi'

export default function Statistik() {
  const { koleksi, loading, error } = useKoleksi()

  const jumlahKategori = koleksi.reduce((hasil, film) => {
    hasil[film.kategori] = (hasil[film.kategori] || 0) + 1
    return hasil
  }, {})

  return (
    <main className="page-content">
      <h1>Statistik Koleksi</h1>

      {loading && <p role="status">Memuat statistik...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        <section className="section-content">
          <p>
            Total seluruh tontonan: <strong>{koleksi.length}</strong>
          </p>

          <table className="statistik-table">
            <thead>
              <tr>
                <th>Kategori</th>
                <th>Jumlah Tontonan</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(jumlahKategori).map(([kategori, jumlah]) => (
                <tr key={kategori}>
                  <td>{kategori}</td>
                  <td>{jumlah}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  )
}
