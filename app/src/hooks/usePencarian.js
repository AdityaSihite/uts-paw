
import { useMemo, useState } from 'react'

export function usePencarian(data) {
  const [kataKunci, setKataKunci] = useState('')

  const hasilPencarian = useMemo(() => {
    return data.filter((film) =>
      film.judul
        .toLowerCase()
        .includes(kataKunci.toLowerCase().trim()),
    )
  }, [data, kataKunci])

  return {
    kataKunci,
    setKataKunci,
    hasilPencarian,
  }
}
