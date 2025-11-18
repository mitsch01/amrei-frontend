import { useState, useEffect, useMemo } from 'react'
import { fetchAPI } from './api'

export function useHomeData() {
  const [home, setHome] = useState(null)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [homeRes, articlesRes] = await Promise.all([
          fetchAPI('home?populate=*'),
          fetchAPI('articles?populate=*'),
        ])

        setHome(homeRes?.data || null)
        const articlesData = articlesRes?.data || []
        setArticles(articlesData)
      } catch (err) {
        console.error('Error loading home data:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const tags = useMemo(() => {
    const allCategories = articles.flatMap(a => a.categories || [])
    return Array.from(new Map(allCategories.map(c => [c.id, c])).values())
  }, [articles])

  return { home, articles, tags, loading }
}