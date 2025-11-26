import { marked } from 'marked'
import { useUniversalPage } from '../lib/useUniversalPage'
import { Link } from 'react-router-dom';
import { useArticles } from '../lib/useArticles'
import { useMediaGallery } from '../lib/useMediaGallery';
import Slider from '../components/Slider'
import { ImageGallery } from '../components/ImageGallery';


export default function BookingPage({ slug }) {
  const { data, loading } = useUniversalPage(slug)
  const { articles } = useArticles({ categorySlugs: [data.page?.slug || slug] })
  const { images } = useMediaGallery(data.page)

  if (loading) return <div className="py-12 px-4">Loading…</div>

  if (!data.page) {
    return <div className="py-12 px-4 max-w-6xl mx-auto">Page not found</div>
  }

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto">

      <h2 className="text-2xl font-semibold mb-8">
        {data.page.title}
      </h2>

      {/* Grid: Quote + Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Image Gallery */}
        {images.length > 0 && (
          <div className="md:col-span-2">
            <ImageGallery images={images}/>
          </div>
        )}
        
        {/* Quote */}
        {data.page.quote && (
         
            <p className="text-gray-500 italic text-left">
              {data.page.quote}
            </p>
        )}
      </div>

      <div
        className="prose text-gray-700 max-w-none mb-16"
        dangerouslySetInnerHTML={{ __html: marked(data.page.body || '') }}
      />

      <div className="flex">
        <Link
          className="bg-black text-white border border-black px-6 py-2 rounded font-semibold hover:bg-white hover:text-black transition-colors duration-300 inline-block mb-24 ml-auto"
          to="/contact"
        >
          Book Now
        </Link>
      </div>

      <Slider items={articles} />
    </div>
  )
}


