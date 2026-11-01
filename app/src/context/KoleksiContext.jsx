import { createContext, useContext, useState } from 'react'

const KoleksiContext = createContext(null)

export function KoleksiProvider({ children }) {
  const [koleksi, setKoleksi] = useState([])
  const [sudahDimuat, setSudahDimuat] = useState(false)

  function simpanKoleksi(dataBaru) {
    setKoleksi(dataBaru)

    localStorage.setItem(
      'koleksi-film',
      JSON.stringify(dataBaru)
    )
  }

  function tambahKoleksi(film) {
    setKoleksi((dataLama) => {
      const dataBaru = [...dataLama, film]

      localStorage.setItem(
        'koleksi-film',
        JSON.stringify(dataBaru)
      )

      return dataBaru
    })
  }

  function hapusKoleksi(id) {
    setKoleksi((dataLama) => {
      const dataBaru = dataLama.filter(
        (film) => film.id !== id
      )

      localStorage.setItem(
        'koleksi-film',
        JSON.stringify(dataBaru)
      )

      return dataBaru
    })
  }

  const nilai = {
    koleksi,
    setKoleksi,
    sudahDimuat,
    setSudahDimuat,
    tambahKoleksi,
    hapusKoleksi,
    simpanKoleksi,
  }

  return (
    <KoleksiContext.Provider value={nilai}>
      {children}
    </KoleksiContext.Provider>
  )
}

export function useKoleksiContext() {
  const context = useContext(KoleksiContext)

  if (context === null) {
    throw new Error(
      'useKoleksiContext harus digunakan di dalam KoleksiProvider'
    )
  }

  return context
}