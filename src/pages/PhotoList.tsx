import { useEffect, useState, useRef } from 'react'
import PhotoCard from '../components/PhotoCard'
import useInfiniteScroll from '../hooks/useInfiniteScroll'

type Pic = {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

/**
 * PhotosPage
 * - Displays a paginated list of photos from Lorem Picsum
 * - Uses IntersectionObserver (via useInfiniteScroll) to load additional pages
 * - Shows skeleton placeholders while loading and handles end-of-list
 */
export default function PhotosPage() {
  const [photos, setPhotos] = useState<Pic[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  useInfiniteScroll({
    target: loaderRef,
    onIntersect: () => setPage((p) => p + 1),
    enabled: hasMore && !loading,
  })

  useEffect(() => {
    let cancelled = false
    const fetchPhotos = async () => {
      setLoading(true)
      try {
        // Fetch a page of photos. The 'limit' controls page size.
        // The Picsum v2 list endpoint returns an array of photo metadata.
        const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=20`)
        if (!res.ok) throw new Error('Failed to fetch')
        const data: Pic[] = await res.json()
        if (cancelled) return
        setPhotos((prev) => [...prev, ...data])
        if (data.length === 0) setHasMore(false)
      } catch (err) {
        console.error(err)
        setHasMore(false)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchPhotos()
    return () => {
      cancelled = true
    }
  }, [page])

  return (
    <div className="container py-8 mt-5">
      <main>
        <div className="row g-4">
          {photos.map((p) => (
            <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <PhotoCard photo={p} />
            </div>
          ))}

          {loading && Array.from({ length: 8 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 placeholder-glow" style={{height:180}}>
                <div className="card-body" />
              </div>
            </div>
          ))}
        </div>

        <div ref={loaderRef} className="text-center py-4">
          {loading ? <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div> : hasMore ? <span className="text-muted">Scroll to load more</span> : <span className="text-muted">End of list</span>}
        </div>
      </main>
    </div>
  )
}
