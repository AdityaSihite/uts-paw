
export default function Pesan({ loading, error, children }) {
  if (loading) {
    return (
      <p className="status-message" role="status">
        Memuat data koleksi...
      </p>
    )
  }

  if (error) {
    return (
      <p className="status-message error-message" role="alert">
        {error}
      </p>
    )
  }

  return children
}
