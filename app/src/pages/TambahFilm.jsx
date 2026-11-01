import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useKoleksiContext } from '../context/KoleksiContext'
import { useKoleksi } from '../hooks/useKoleksi'

export default function TambahFilm() {
  const navigate = useNavigate()
  const { tambahKoleksi } = useKoleksiContext()
  const { loading } = useKoleksi()

  const [form, setForm] = useState({
    judul: '',
    kategori: 'Film',
    sutradara: '',
    tahunRilis: '',
    rating: '',
  })

  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setForm((dataLama) => ({
      ...dataLama,
      [name]: value,
    }))

    if (error) {
      setError('')
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!form.judul.trim()) {
      setError('Judul wajib diisi.')
      return
    }

    if (
      !form.sutradara.trim() ||
      !form.tahunRilis ||
      form.rating === ''
    ) {
      setError('Semua data film wajib diisi.')
      return
    }

    const tahun = Number(form.tahunRilis)
    const rating = Number(form.rating)

    if (
      !Number.isFinite(tahun) ||
      tahun < 1888 ||
      tahun > 2100
    ) {
      setError('Tahun rilis tidak valid.')
      return
    }

    if (
      !Number.isFinite(rating) ||
      rating < 0 ||
      rating > 10
    ) {
      setError('Rating harus antara 0 sampai 10.')
      return
    }

    const filmBaru = {
      id: `film-${Date.now()}`,
      judul: form.judul.trim(),
      kategori: form.kategori,
      sutradara: form.sutradara.trim(),
      tahunRilis: tahun,
      rating,
    }

    try {
      tambahKoleksi(filmBaru)
      navigate('/koleksi')
    } catch {
      setError('Film gagal disimpan. Silakan coba lagi.')
    }
  }

  if (loading) {
    return (
      <main className="page-content">
        <p>Memuat koleksi film...</p>
      </main>
    )
  }

  return (
    <main className="page-content">
      <section className="form-card">
        <h1>Tambah Tontonan Baru</h1>

        <p>
          Masukkan informasi film atau serial yang ingin dicatat.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="judul">Judul</label>
          <input
            id="judul"
            name="judul"
            type="text"
            value={form.judul}
            onChange={handleChange}
            placeholder="Contoh: The Truman Show"
          />

          <label htmlFor="kategori">Kategori</label>
          <select
            id="kategori"
            name="kategori"
            value={form.kategori}
            onChange={handleChange}
          >
            <option value="Film">Film</option>
            <option value="Serial">Serial</option>
          </select>

          <label htmlFor="sutradara">Sutradara</label>
          <input
            id="sutradara"
            name="sutradara"
            type="text"
            value={form.sutradara}
            onChange={handleChange}
            placeholder="Nama sutradara"
          />

          <label htmlFor="tahunRilis">Tahun Rilis</label>
          <input
            id="tahunRilis"
            name="tahunRilis"
            type="number"
            min="1888"
            max="2100"
            value={form.tahunRilis}
            onChange={handleChange}
          />

          <label htmlFor="rating">Rating (IMDb)</label>
          <input
            id="rating"
            name="rating"
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={form.rating}
            onChange={handleChange}
          />

          {error && (
            <p
              role="alert"
              className="error-message"
            >
              {error}
            </p>
          )}

          <button
            className="tombol-utama"
            type="submit"
          >
            Simpan
          </button>
        </form>
      </section>
    </main>
  )
}