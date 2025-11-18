import { useEffect, useState } from "react"
import { fetchAPI } from "./api"
import { getArticlesByCategory } from "./getArticlesByCategory"

export function useUniversalPage(slug) {
  const [data, setData] = useState({ articles: [], page: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    async function loadData() {
      setLoading(true)

      try {
        const [articles, pagesRes] = await Promise.all([
          getArticlesByCategory({ categoryNames: [slug] }),
          fetchAPI("abouts?populate=*"),
        ])

        const pages = pagesRes?.data || []
        const matchedPage = pages.find((p) => p.slug === slug) || null

        setData({
          articles,
          page: matchedPage,
        })
      } catch (err) {
        console.error("Error loading Page:", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [slug])

  return { data, loading }
}