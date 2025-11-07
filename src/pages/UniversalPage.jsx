import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAPI } from '../lib/api'
import { getArticlesByCategory } from '../lib/getArticlesByCategory'
import GalleryGrid from '../components/GalleryGrid'
import { marked } from 'marked'

export default function UniversalPage() {
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

  // 🟢 CATEGORY PAGE (Portfolio / Workshops)
  if (data.articles.length > 0) {
    return (
      <div className="py-12 px-4">
        {/* Intro from page (if available) */}
        {data.page && (
          <>
            <h2 className="text-2xl font-semibold mb-4">{data.page.title}</h2>
            {data.page.quote && (
              <p className="text-gray-700 mb-4">{data.page.quote}</p>
            )}
            {data.page.body && (
              <div
                className="prose text-gray-700 max-w-none mb-8"
                dangerouslySetInnerHTML={{
                  __html: marked(data.page.body || ''),
                }}
              />
            )}
          </>
        )}

        {/* Gallery */}
        <GalleryGrid items={data.articles} />
      </div>
    )
  }

  // 🟠 BASIC PAGE (About, Contact, etc.)
  if (data.page) {
    return (
      <div className="py-12 px-4">
        <h2 className="text-2xl font-semibold mb-4">{data.page.title}</h2>
        {data.page.quote && <p className="text-gray-700 mb-4">{data.page.quote}</p>}
        <div
          className="prose text-gray-700 max-w-none"
          dangerouslySetInnerHTML={{ __html: marked(data.page.body || '') }}
        />
      </div>
    )
  }

  // 🔴 Not found
  return <div className="py-12 px-4">Page not found</div>
}