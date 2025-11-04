import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAPI } from '../lib/api'
import Slider from '../components/Slider'

export default function DetailPage() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [related, setRelated] = useState([])

  useEffect(() => {
    async function loadArticles() {
      try {
        // fetch article by slug
        const res = await fetchAPI(`articles?filters[slug][$eq]=${slug}&populate=*`)
        const item = res?.data?.[0]
        if (!item) return

        setArticle(item)

        // fetch related articles (based on categories)
        if (item.categories?.length) {
          const relRes = await fetchAPI('articles?populate=categories&pagination[limit]=10');
          const filtered = (relRes?.data || []).filter(p =>
            p.id !== item.id &&
            p.categories?.some(c => item.categories.map(cat => cat.id).includes(c.id))
          );
          
          setRelated(filtered)
        }
      } catch (err) {
        console.error('Error fetching article detail:', err)
      }
    }

    loadArticles()
  }, [slug])

  if (!article) return <div className="py-12 text-center">Loading…</div>

  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:1337'
  const images = Array.isArray(article.images) && article.images.length > 0
    ? article.images
    : article.cover
      ? [article.cover]
      : []

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
          <div className="mt-4 text-gray-700 whitespace-pre-line">{article.blocks?.length ? article.blocks.map(block => block.body).join('') : 'No content available.'}</div>
        </aside>
      </div>

      {/* Related items slider */}
      <div className="mt-12">
        <Slider items={related} />
      </div>
    </div>
  )
}