import { Link } from 'react-router-dom'
import { getMediaUrl } from '../lib/media'

export default function ArticleCard({ item, className = '', decorative = false }) {
  const img = getMediaUrl(item.cover, 'medium')

  if (decorative) {
    return (
      <div
        className={`relative block overflow-hidden cursor-default pointer-events-none ${className}`}
        aria-hidden="true"
      >
        <img
          src={img}
          alt={item.title}
          className="w-full h-auto object-cover"
        />
      </div>
    )
  }

  return (
    <Link
      to={`/articles/${item.slug}`}
      className={`group relative block overflow-hidden 
     ${className}`}
    >
      {/* Bild */}
      <img
        src={img}
        alt={item.title}
        className="w-full h-auto object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-4 bg-white bg-opacity-90 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div>
          {/* Titel */}
          <h3 className="text-lg sm:text-xl font-semibold leading-tight mx-4">
            {item.title}
          </h3>
          {/* Kategorien */}
          {item.categories && item.categories.length > 0 && (
            <div className="text-xs uppercase tracking-wider text-[#F2D377] mb-2 font-medium mx-4">
              {item.categories.map((cat) => cat.name).join(', ')}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}