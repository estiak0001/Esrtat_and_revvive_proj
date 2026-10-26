import axios from 'axios'
import { useEffect, useState } from 'react'

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const publicApi = axios.create({ baseURL: API_BASE })

export function assetUrl(path?: string | null) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${API_BASE}${path}`
}

/** Fetches a public GET endpoint once on mount. Returns the given fallback until it resolves. */
export function useApi<T>(path: string, fallback: T): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    setLoading(true)
    publicApi
      .get<T>(path)
      .then((res) => {
        if (active) setData(res.data)
      })
      .catch(() => {
        /* keep fallback on error */
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  return { data, loading }
}
