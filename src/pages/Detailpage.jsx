import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { marked } from 'marked'
import Slider from '../components/Slider'
import Lightbox from '../components/Lightbox'
import { Breadcrumbs } from '../components/Breadcrumbs'

import { useArticleDetail } from '../lib/useArticleDetail'
import { useMediaGallery } from '../lib/useMediaGallery'
import { VideoList } from '../components/VideoList'
import { ImageGallery } from '../components/ImageGallery'

export default function DetailPage() {
  const { slug } = useParams()
  const { article, related, loading } = useArticleDetail(slug)
  const [metaOpen, setMetaOpen] = useState(false)

  const {
    images,
    videos,
    galleryItems,
    lightboxOpen,
    currentIndex,
    openLightbox,
    closeLightbox,
    next,
    prev,
  } = useMediaGallery(article)

  const metaItems = [
    { label: 'Author', value: article?.author },
    { label: 'Illustrator', value: article?.illustrator },
    { label: 'Publisher', value: article?.publisher },
    { label: 'Year Of Publication', value: article?.publishingYear },
    { label: 'Pages', value: article?.pageCount },
    { label: 'Recommended Age', value: article?.age },
    { label: 'Language', value: article?.language },
    { label: 'Format', value: article?.format },
    { label: 'ISBN', value: article?.ISBN },
  ].filter((item) => Boolean(item.value))

  if (loading) return <div className="py-12 px-4">Loading…</div>
  if (!article) return <div className="py-12 text-center">Page not found</div>

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto">
      <Breadcrumbs
        articleTitle={article.title}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* LEFT SIDE: media */}
        <div className="md:col-span-2">
          <VideoList videos={videos} />
          <ImageGallery images={images} onOpen={openLightbox} />
        </div>


        {/* RIGHT SIDE: text */}
        <aside className="md:col-span-1 md:sticky top-20 self-start">
          <h1 className="text-2xl font-semibold">{article.title}</h1>
          {/* Zitat */}
          {article.quote && (
            <p className="italic mt-18 mb-14 max-w-3xs text-sm text-gray-800">
              "{article.quote}"
            </p>
          )}
          {/* Body */}
          <div
            className="prose max-w-none mt-16"
            dangerouslySetInnerHTML={{
              __html: marked(article.body || ''),
            }}
          />
          {/* Details zum Ausklappen */}
          {metaItems.length > 0 && (
            <div className='mt-8 p-2 border-y border-gray-500'>
              <button
                onClick={() => setMetaOpen((open) => !open)}
                className='flex items-center justify-between w-full text-left font-semibold'
              >
                <span>Details</span>
                <span>{metaOpen ? '' : '+'}</span>
              </button>

              {metaOpen && (
                <dl className='mt-4 space-y-2 text-sm'>
                  {metaItems.map((item) => (
                    <div key={item.label} className='flex justify-between gap-20'>
                      <dt>{item.label}</dt>
                      <dd className='text-right'>{item.value}</dd>
                    </div>
                  )
                  )}
                </dl>
              )}
            </div>
          )}
        </aside>
      </div>

      {/* Related articles */}
      <div className="mt-12">
        <Slider items={related} />
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          galleryItems={galleryItems}
          currentIndex={currentIndex}
          onClose={closeLightbox}
          onPrev={prev}
          onNext={next}
        />
      )}
    </div>
  )
}