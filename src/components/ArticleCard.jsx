import { Link } from 'react-router-dom'

export default function ArticleCard({ item, className = '' }) {
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:1337'
  const img =
    item.cover?.formats?.small?.url
      ? `${baseURL}${item.cover.formats.small.url}`
      : item.cover?.url
        ? `${baseURL}${item.cover.url}`
        : '/fallback.jpg'

  return (
    <Link
      to={`/articles/${item.slug}`}
      className={`block rounded overflow-hidden bg-gray-50 ${className}`}
    >
      <img
        src={img}
        alt={item.title}
        className="w-full h-36 object-cover"
      />
    </Link>
  )
}