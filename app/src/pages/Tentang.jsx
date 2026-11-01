
import mahasiswa from '../../mahasiswa.json'

export default function Tentang() {
  return (
    <main className="page-content">
      <section className="about-card">
        <h1>Tentang Pembuat</h1>

        <p>
          Aplikasi Daftar Tontonan Film dan Serial ini dibuat
          untuk memenuhi Ujian Tengah Semester Pengembangan
          Aplikasi Web.
        </p>

        <div className="about-info">
          <p><strong>Nama:</strong> {mahasiswa.nama}</p>
          <p><strong>NIM:</strong> {mahasiswa.nim}</p>
          <p><strong>Kelas:</strong> {mahasiswa.kelas}</p>
          <p><strong>Tema:</strong> {mahasiswa.tema}</p>
        </div>
      </section>
    </main>
  )
}
