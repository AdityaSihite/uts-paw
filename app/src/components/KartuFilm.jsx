import { Link } from 'react-router-dom'
import BadgeRating from './BadgeRating'

export default function KartuFilm({ film }) {
  return (
    <article className="film-card">
      <div className="film-card-info">
        <span className="film-category">
          {film.kategori}
        </span>

        <h2>{film.judul}</h2>

        <p>Sutradara: {film.sutradara}</p>

        <p>Tahun Rilis: {film.tahunRilis}</p>

        <p>
          Rating IMDb: <BadgeRating rating={film.rating} />
        </p>
      </div>

      <Link
        className="detail-link"
        to={`/koleksi/${film.id}`}
      >
        Lihat Detail →
      </Link>
    </article>
  )
}