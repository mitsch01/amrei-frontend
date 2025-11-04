import { useEffect, useState } from 'react'
import GalleryGrid from '../components/GalleryGrid'
import { getArticlesByCategory } from '../lib/getArticlesByCategory'

export default function IndexPage({ category }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadArticles() {
      try {
        const data = await getArticlesByCategory({ categoryNames: [category] })
        setArticles(data)
      } catch (err) {
        console.error('Error fetching articles:', err)
      } finally {
        setLoading(false)
      }
    }
    loadArticles()
  }, [category])

  if (loading) return <div className="py-12 px-4">Loading...</div>

  return (
    <div className="py-12 px-4">
      <h2 className="text-2xl font-semibold mb-4">{category}</h2>
      <GalleryGrid items={articles} />
    </div>
  )
}