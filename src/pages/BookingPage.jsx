import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAPI } from '../lib/api'
import { getArticlesByCategory } from '../lib/getArticlesByCategory'
import { marked } from 'marked'

export default function BookingPage() {
  const { slug } = useParams()
  const [data, setData] = useState({ articles: [], page: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const [articles, pagesRes] = await Promise.all([
          getArticlesByCategory({ categoryNames: [slug] }),
          fetchAPI('abouts?populate=*'),
        ])

        const pages = pagesRes?.data || []
        const matchedPage = pages.find(
          (p) => p.slug === slug
        )

        setData({
          articles,
          page: matchedPage || null,
        })
      } catch (err) {
        console.error('Error loading UniversalPage:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [slug])

  if (loading) return <div className="py-12 px-4">Loading…</div>

  if (data.page) {
    return (
      <div className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">{data.page.title}</h2>
        {data.page.quote && <p className="text-gray-700 mb-4">{data.page.quote}</p>}
        <div
          className="prose text-gray-700 max-w-none"
          dangerouslySetInnerHTML={{ __html: marked(data.page.body || '') }}
        />
      </div>
    )
  }

  return <div className="py-12 px-4 max-w-6xl mx-auto">Page not found</div>
}