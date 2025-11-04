import { Link } from 'react-router-dom'

export default function GalleryGrid({ items }) {
  const safeItems = Array.isArray(items) ? items : []

  return (
    <div className="py-6 px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {safeItems.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            No items found.
          </div>
        ) : (
          safeItems.map(item => {
            const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:1337'
            const img =
              item.cover?.formats?.small?.url
                ? `${baseURL}${item.cover.formats.small.url}`
                : item.cover?.url
                  ? `${baseURL}${item.cover.url}`
                  : '/fallback.jpg'

            return (
              <Link
                key={item.id}
                to={`/articles/${item.slug}`}
                className="block overflow-hidden bg-gray-50"
              >
                <img
                  src={img}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3 text-sm">{item.title}</div>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}