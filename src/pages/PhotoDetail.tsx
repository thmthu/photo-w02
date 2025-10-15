import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

type Pic = {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

/**
 * PhotoDetail page
 * - Fetches metadata for a single photo using Picsum's `/id/{id}/info` endpoint
 * - The endpoint doesn't always provide a 'title' or 'description', so the
 *   UI falls back to placeholder strings when those fields are missing.
 */
export default function PhotoDetail() {
  const { id } = useParams<{ id: string }>()
  const [photo, setPhoto] = useState<Pic | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
  // If no id (shouldn't happen due to routing), do nothing
  if (!id) return
    let cancelled = false
    setLoading(true)
    setError(null)
    ;(async () => {
      try {
        const res = await fetch(`https://picsum.photos/id/${id}/info`)
        if (!res.ok) throw new Error('Not found')
        const data: Pic = await res.json()
        if (!cancelled) setPhoto(data)
      } catch (err: any) {
        console.error(err)
        if (!cancelled) setError(String(err.message || err))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [id])

  return (
    <div className="container py-4 mt-4">
      <header className="d-flex align-items-center justify-content-between mb-4">
        <h1 className="h4 fw-semibold mb-0">Photo Details</h1>
        <Link to="/photos" className="text-muted">← Back to list</Link>
      </header>

      <main>
        {loading && <div className="text-center py-6">Loading...</div>}
        {error && <div className="text-center py-6 text-danger">{error}</div>}
        {photo && (() => {
          const title = (photo as any).title || `Photo ${photo.id}`
          const author = photo.author || 'Unknown author'
          const description = (photo as any).description || 'No description available for this photo.'
          const size = `${photo.width} × ${photo.height}`

          return (
            <div className="row g-4">
              <div className="col-12 col-lg-8">
                <img className="img-fluid rounded" src={photo.download_url} alt={title} />
                <div className="mt-3 d-flex gap-2">
                  <a href={photo.download_url} target="_blank" rel="noreferrer" className="btn btn-primary me-2">Open full</a>
                  <button className="btn btn-outline-secondary">Copy link</button>
                </div>
              </div>

              <aside className="col-12 col-lg-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p className="mb-2 text-muted">By <strong>{author}</strong></p>
                    <p className="mb-2 text-muted"><small>Size: {size}</small></p>
                    <p className="text-muted">{description}</p>
                  </div>
                </div>
              </aside>
            </div>
          )
        })()}
      </main>
    </div>
  )
}
