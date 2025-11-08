import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAPI } from '../lib/api'
import Slider from '../components/Slider'
import Lightbox from '../components/Lightbox'
import { getArticlesByCategory } from '../lib/getArticlesByCategory'
import { marked } from 'marked'

export default function DetailPage() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [related, setRelated] = useState([])
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

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
    ...(Array.isArray(article.media) ? article.media : []),
  ].map((img) => {
    const url =
      img.formats?.large?.url
        ? `${baseURL}${img.formats.large.url}`
        : img.url
          ? `${baseURL}${img.url}`
          : '/fallback.jpg'
    return { ...img, url }
  })

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)
  const prevImage = () => setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  const nextImage = () => setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1))

  return (
    <div className="py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Galerie */}
        <div className="md:col-span-2">
          <div className="columns-1 sm:columns-2 gap-4 space-y-4">
            {images.map((img, index) => (

              <div
                key={img.id || index}
                className="break-inside-avoid cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={img.url}
                  alt={img.alternativeText || ''}
                  className="w-full h-auto object-cover hover:opacity-80 transition"
                />
              </div>
            ))}

          </div>
        </div>

        {/* Text */}
        <aside className="md:col-span-1">
          <h1 className="text-2xl font-semibold">{article.title}</h1>
          <div
            className="mt-4 text-gray-700 space-y-4 prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: article.body ? marked(article.body) : '<p>No content available.</p>',
            }}
          />
        </aside>
      </div>

      {/* Related */}
      <div className="mt-12">
        <Slider items={related} />
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          currentIndex={currentIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  )
}