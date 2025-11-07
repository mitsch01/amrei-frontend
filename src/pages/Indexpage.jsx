import { useEffect, useState } from 'react'
import { fetchAPI } from '../lib/api'
import { getArticlesByCategory } from '../lib/getArticlesByCategory'
import GalleryGrid from '../components/GalleryGrid'
import { marked } from 'marked'

export default function UniversalPage({ slug, category }) {
  const [page, setPage] = useState(null)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        // 1️⃣ Fetch the page content (if slug is provided)
        let matchedPage = null
        if (slug) {
          const res = await fetchAPI('abouts?populate=*')
          const items = res?.data || []
          matchedPage = items.find(
            item => item?.title?.toLowerCase() === slug.toLowerCase()
          )
          setPage(matchedPage)
        }

        // 2️⃣ Fetch related articles (if category is provided)
        if (category) {
          const relatedArticles = await getArticlesByCategory({ categoryNames: [category] })
          setArticles(relatedArticles)
        }
      } catch (err) {
        console.error('Error fetching universal page data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [slug, category])

  if (loading) return <div className="py-12 px-4">Loading…</div>

  // nothing found
  if (!page && articles.length === 0)
    return <div className="py-12 px-4">No content found.</div>

  return (
    <div className="py-12 px-4 space-y-8">
      {/* Page Content */}
      {page && (
        <div>
          {page.title && <h2 className="text-2xl font-semibold mb-4">{page.title}</h2>}
          {page.quote && <p className="text-gray-700 mb-4">{page.quote}</p>}
          {page.body && (
            <div
              className="mt-4 text-gray-700 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: marked(page.body) }}
            />
          )}
        </div>
      )}

      {/* Gallery Section */}
      {articles.length > 0 && (
        <div>
          <GalleryGrid items={articles} />
        </div>
      )}
    </div>
  )
}