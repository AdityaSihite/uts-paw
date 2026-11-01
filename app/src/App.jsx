
import { Route, Routes } from 'react-router-dom'
import mahasiswa from '../mahasiswa.json'

import { KoleksiProvider } from './context/KoleksiContext'
import Layout from './components/Layout'

import {
  Beranda,
  HalamanKoleksi,
} from './pages/HalamanUtama'

import DetailFilm from './pages/DetailFilm'
import TambahFilm from './pages/TambahFilm'
import Statistik from './pages/Statistik'
import Tentang from './pages/Tentang'

function TidakDitemukan() {
  return (
    <main className="page-content">
      <h1>404</h1>
      <p>Halaman tidak ditemukan.</p>
    </main>
  )
}

function InformasiMahasiswa() {
  return (
    <div className="identitas">
      {mahasiswa.nama} | {mahasiswa.nim}
    </div>
  )
}

function IsiAplikasi() {
  return (
    <Layout>
      <InformasiMahasiswa />

      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/koleksi" element={<HalamanKoleksi />} />
        <Route path="/koleksi/:id" element={<DetailFilm />} />
        <Route path="/tambah" element={<TambahFilm />} />
        <Route path="/statistik" element={<Statistik />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="*" element={<TidakDitemukan />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <KoleksiProvider>
      <IsiAplikasi />
    </KoleksiProvider>
  )
}
