import { useEffect, useState } from 'react'
import { useKoleksiContext } from '../context/KoleksiContext'

export function useKoleksi() {
  const {
    koleksi,
    setKoleksi,
    sudahDimuat,
    setSudahDimuat,
  } = useKoleksiContext()

  const [loading, setLoading] = useState(!sudahDimuat)
  const [error, setError] = useState('')

  useEffect(() => {
    if (sudahDimuat) {
      setLoading(false)
      return
    }

    let aktif = true

    async function ambilData() {
      try {
        setLoading(true)
        setError('')

        // Ambil data yang sudah tersimpan
        const dataTersimpan = localStorage.getItem('koleksi-film')

        let koleksiLama = []

        if (dataTersimpan !== null) {
          const hasilParse = JSON.parse(dataTersimpan)

          if (!Array.isArray(hasilParse)) {
            throw new Error('Format data koleksi tidak valid.')
          }

          koleksiLama = hasilParse
        }

        // Ambil 10 film bawaan dari JSON
        const response = await fetch(
          `${import.meta.env.BASE_URL}data/koleksi.json`
        )

        if (!response.ok) {
          throw new Error('Gagal mengambil data koleksi.')
        }

        const dataDefault = await response.json()

        if (!Array.isArray(dataDefault)) {
          throw new Error('Format data koleksi tidak valid.')
        }

        // Gabungkan film bawaan dengan film tambahan
        const gabungan = new Map()

        dataDefault.forEach((film) => {
          gabungan.set(film.id, film)
        })

        koleksiLama.forEach((film) => {
          gabungan.set(film.id, film)
        })

        const dataGabungan = Array.from(gabungan.values())

        if (aktif) {
          setKoleksi(dataGabungan)

          localStorage.setItem(
            'koleksi-film',
            JSON.stringify(dataGabungan)
          )

          setSudahDimuat(true)
        }
      } catch (err) {
        if (aktif) {
          setError(err.message || 'Terjadi kesalahan.')

          // Jika JSON gagal diambil, tetap tampilkan data tersimpan
          try {
            const tersimpan = localStorage.getItem('koleksi-film')

            if (tersimpan !== null) {
              const data = JSON.parse(tersimpan)

              if (Array.isArray(data)) {
                setKoleksi(data)
                setSudahDimuat(true)
              }
            }
          } catch {
            setError('Data koleksi tidak dapat dibaca.')
          }
        }
      } finally {
        if (aktif) {
          setLoading(false)
        }
      }
    }

    ambilData()

    return () => {
      aktif = false
    }
  }, [sudahDimuat, setKoleksi, setSudahDimuat])

  return { koleksi, loading, error }
}