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