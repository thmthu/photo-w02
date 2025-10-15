import { useEffect } from 'react'

/**
 * Props for useInfiniteScroll hook
 * - target: ref to the element to observe (typically a loader div at the end of the list)
 * - onIntersect: callback to run when the element becomes visible
 * - enabled: flip to false to temporarily disable observing
 * - rootMargin: IntersectionObserver rootMargin (useful to trigger earlier)
 */
type Props = {
  target: React.RefObject<Element | null>
  onIntersect: () => void
  enabled?: boolean
  rootMargin?: string
}

/**
 * useInfiniteScroll
 * - Lightweight hook that observes `target` using IntersectionObserver and runs
 *   `onIntersect` whenever it becomes visible. The hook cleans up the observer
 *   when the component unmounts or when `enabled` becomes false.
 *
 * Example usage:
 *  const loaderRef = useRef(null)
 *  useInfiniteScroll({ target: loaderRef, onIntersect: () => setPage(p => p+1) })
 */
export default function useInfiniteScroll({ target, onIntersect, enabled = true, rootMargin = '200px' }: Props) {
  useEffect(() => {
    if (!enabled) return
    const el = target.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) onIntersect()
        })
      },
      { root: null, rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, onIntersect, enabled, rootMargin])
}
