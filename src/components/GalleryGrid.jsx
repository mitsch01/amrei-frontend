import ArticleCard from './ArticleCard'

export default function GalleryGrid({ items = [] }) {
  const safeItems = Array.isArray(items) ? items : []

  return (
    <div className="py-6 px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {safeItems.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            No items found.
          </div>
        ) : (
          safeItems.map(item => (
            <ArticleCard key={item.id} item={item} />
          ))
        )}

      </div>
    </div>
  )
}