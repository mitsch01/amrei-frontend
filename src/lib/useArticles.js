import { useState, useEffect } from "react"
import { getArticlesByCategory } from "./getArticlesByCategory"

export function useArticles({ categoryIds = [], categorySlugs = [] }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    getArticlesByCategory({ categoryIds, categorySlugs })
      .then((res) => isMounted && setArticles(res))
      .catch(console.error)
      .finally(() => isMounted && setLoading(false))

    return () => (isMounted = false)
  }, [categoryIds.join(","), categorySlugs.join(",")])

  return { articles, loading }
}