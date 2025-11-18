import { useEffect, useState } from 'react'
import { fetchAPI } from '../lib/api'
import { getArticlesByCategory } from '../lib/getArticlesByCategory'

export function useArticleDetail(slug) {
  const [article, setArticle] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    async function load() {
      setLoading(true)

      try {
        // Fetch main article
        const res = await fetchAPI(`articles?filters[slug][$eq]=${slug}&populate=*`)
        const main = res?.data?.[0] || null
        setArticle(main)

        if (!main) {
          setRelated([])
          return
        }

        // Fetch related based on categories
        const categoryIds = main.categories?.map((c) => c.id) || []

        if (categoryIds.length > 0) {
          const relatedArticles = await getArticlesByCategory({ categoryIds })
          setRelated(relatedArticles.filter((a) => a.id !== main.id))
        } else {
          setRelated([])
        }
      } catch (err) {
        console.error("Error loading article detail:", err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [slug])

  return {
    article,
    related,
    loading
  }
}