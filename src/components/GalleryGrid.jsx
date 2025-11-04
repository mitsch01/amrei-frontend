import { Link } from 'react-router-dom'

export default function GalleryGrid({ items = [] }) {
  return (
    <div className="py-6 px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(item => {

          const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:1337';
          const img = item.cover?.formats?.small?.url
            ? `${baseURL}${item.cover.formats.small.url}`
            : item.cover?.url
              ? `${baseURL}${item.cover.url}`
              : '/fallback.jpg';
          return (
            <Link key={item.id} to={`/portfolio/${item.slug}`} className="block overflow-hidden bg-gray-50">
              <img src={img} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-3 text-sm">{item.title}</div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}