import { useEffect, useState } from "react"
import { fetchAPI } from "./api"

/**
 * Generic hook to fetch Strapi content
 * @param {string} endpoint - Strapi API endpoint, e.g., 'articles?populate=*'
 */
export function useFetch(endpoint) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    setLoading(true)

    fetchAPI(endpoint)
      .then((res) => {
        if (isMounted) setData(res?.data || null)
      })
      .catch((err) => {
        if (isMounted) setError(err)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => (isMounted = false)
  }, [endpoint])

  return { data, loading, error }
}