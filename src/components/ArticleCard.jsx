import { Link } from 'react-router-dom'

export default function ArticleCard({ item, className = '' }) {
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:1337'
  const img =
    item.cover?.formats?.medium?.url
      ? `${baseURL}${item.cover.formats.medium.url}`
      : item.cover?.url
        ? `${baseURL}${item.cover.url}`
        : '/fallback.jpg'

  return (
    <Link
      to={`/articles/${item.slug}`}
      className={`group relative block overflow-hidden bg-gray-100 shadow-sm ${className}`}
    >
      {/* Bild */}
      <img
        src={img}
        alt={item.title}
        className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="
        absolute inset-0 flex flex-col justify-end 
        bg-gradient-to-t from-black/70 via-black/40 to-transparent 
        opacity-0 group-hover:opacity-100 
        transition-opacity duration-500 ease-in-out
        p-4 sm:p-6
      ">
        <div className="text-white">
          {/* Kategorien */}
          {item.categories && item.categories.length > 0 && (
            <div className="text-xs uppercase tracking-wider text-[#F2D377] mb-1 font-medium">
              {item.categories.map((cat) => cat.name).join(', ')}
            </div>
          )}

          {/* Titel */}
          <h3 className="text-lg sm:text-xl font-semibold leading-tight">
            {item.title}
          </h3>
        </div>
      </div>
    </Link>
  )
}