import { useParams } from 'react-router-dom'
import { marked } from 'marked'
import Slider from '../components/Slider'
import Lightbox from '../components/Lightbox'

import { useArticleDetail } from '../lib/useArticleDetail'
import { useMediaGallery } from '../lib/useMediaGallery'
import { VideoList } from '../components/VideoList'
import { ImageGallery } from '../components/ImageGallery'

export default function DetailPage() {
  const { slug } = useParams()
  const { article, related, loading } = useArticleDetail(slug)

  const {
    images,
    videos,
    galleryItems,
    lightboxOpen,
    currentIndex,
    openLightbox,
    closeLightbox,
    nextImage,
    prevImage,
  } = useMediaGallery(article)

  if (loading) return <div className="py-12 px-4">Loading…</div>
  if (!article) return <div className="py-12 text-center">Page not found</div>

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* LEFT SIDE: media */}
        <div className="md:col-span-2">
          <VideoList videos={videos} />
          <ImageGallery images={images} onOpen={openLightbox} />
        </div>

        {/* RIGHT SIDE: text */}
        <aside className="md:col-span-1 md:sticky top-20 self-start">
          <h1 className="text-2xl font-semibold">{article.title}</h1>
          <div
            className="mt-4 text-gray-700 prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: marked(article.body || ''),
            }}
          />
        </aside>
      </div>

      {/* Related articles */}
      <div className="mt-12">
        <Slider items={related} />
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={galleryItems}
          currentIndex={currentIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  )
}