import ArticleCard from './ArticleCard'

export default function GalleryGrid({ items = [] }) {
  const safeItems = Array.isArray(items) ? items : []

  return (
    <div className="py-8 px-8">
      <div className="columns-2 md:columns-4 gap-6 space-y-6">
        {safeItems.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No items found.
          </div>
        ) : (
          safeItems.map(item => (
            <div key={item.id} className="break-inside-avoid">
              <ArticleCard item={item} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}