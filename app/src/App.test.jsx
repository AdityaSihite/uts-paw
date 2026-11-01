import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import App from './App.jsx'

function renderHalaman(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  )
}

test('rute tidak dikenal menampilkan 404', () => {
  renderHalaman('/tidak-ada')

  expect(
    screen.getByRole('heading', { name: '404' })
  ).toBeInTheDocument()
})

test('halaman beranda menampilkan judul utama', () => {
  renderHalaman('/')

  expect(
    screen.getByRole('heading', {
      name: 'Temukan Cerita Favoritmu',
    })
  ).toBeInTheDocument()
})

test('halaman tambah film menampilkan formulir', async () => {
  renderHalaman('/tambah')

  expect(
    await screen.findByRole('heading', {
      name: 'Tambah Tontonan Baru',
    })
  ).toBeInTheDocument()
})

test('form tambah film memiliki input judul', async () => {
  renderHalaman('/tambah')

  expect(
    await screen.findByLabelText('Judul')
  ).toBeInTheDocument()
})

test('halaman tentang menampilkan nama dan NIM', () => {
  renderHalaman('/tentang')

  expect(
    screen.getAllByText(/Aditya Hot Martua Sihite/i).length
  ).toBeGreaterThan(0)

  expect(
    screen.getAllByText(/123140114/).length
  ).toBeGreaterThan(0)
})