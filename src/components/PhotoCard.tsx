import { Link } from 'react-router-dom'

// Pic: subset of the fields returned by the Lorem Picsum API
type Pic = {
  id: string
  author: string
  download_url: string
  width: number
  height: number
}

/**
 * PhotoCard - displays a single photo thumbnail and the author name.
 * Props:
 *  - photo: Pic
 * Notes:
 *  - Uses the sized picsum endpoint to request a consistent thumbnail size for performance.
 *  - The card is clickable and navigates to /photos/:id for the detail view.
 */
export default function PhotoCard({ photo }: { photo: Pic }) {
  // Use the Picsum small image endpoint to request a sized thumbnail
  const thumb = `https://picsum.photos/id/${photo.id}/300/200`

  return (
    <div className="card h-100 shadow-sm">
      <Link to={`/photos/${photo.id}`} className="text-reset text-decoration-none">
        <img src={thumb} alt={`By ${photo.author}`} loading="lazy" className="card-img-top" style={{ objectFit: 'cover', height: 180 }} />
      </Link>
      <div className="card-body py-2">
        {/* Always show the author for clarity; fallback text when missing */}
        <p className="card-text mb-0 text-truncate" title={photo.author}>{photo.author || 'Unknown author'}</p>
      </div>
    </div>
  )
}
