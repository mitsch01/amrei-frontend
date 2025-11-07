import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAPI } from '../lib/api'
import Slider from '../components/Slider'
import { getArticlesByCategory } from '../lib/getArticlesByCategory'
import { marked } from 'marked'

export default function DetailPage() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [related, setRelated] = useState([])

  useEffect(() => {
    async function loadArticles() {
      try {
        // fetch main article by slug
        const res = await fetchAPI(`articles?filters[slug][$eq]=${slug}&populate=*`)
        const main = res?.data?.[0]
        if (!main) return

        console.log("Fetched article:", main)

        setArticle(main)

        // fetch related articles by category IDs
        const categoryIds = main.categories?.map(c => c.id) || []
        if (categoryIds.length > 0) {
          const relatedArticles = await getArticlesByCategory({ categoryIds })
          // exclude the main article itself
          setRelated(relatedArticles.filter(a => a.id !== main.id))
        }
      } catch (err) {
        console.error('Error fetching article detail:', err)
      }
    }
    loadArticles()
  }, [slug])

  if (!article) return <div className="py-12 text-center">Loading…</div>

  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:1337'
  const images = [
    ...(article.cover ? [article.cover] : []),
    ...(Array.isArray(article.media) ? article.media : [])
  ]

  return (
    <div className="py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Image gallery */}
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map((img) => {
              const url = img.formats?.large?.url
                ? `${baseURL}${img.formats.large.url}`
                : img.url
                  ? `${baseURL}${img.url}`
                  : '/fallback.jpg'
              return (
                <img
                  key={img.id}
                  src={url}
                  alt={img.alternativeText || ''}
                  className="w-full h-64 object-cover rounded"
                />
              )
            })}
          </div>
        </div>

        {/* Text details */}
        <aside className="md:col-span-1">
          <h1 className="text-2xl font-semibold">{article.title}</h1>
          <div className="mt-4 text-gray-700 space-y-4"
            dangerouslySetInnerHTML={{ __html: marked(article.body) || 'No content available.' }}
          />
        </aside>
      </div>

      {/* Related items slider */}
      <div className="mt-12">
        <Slider items={related} />
      </div>
    </div>
  )
}