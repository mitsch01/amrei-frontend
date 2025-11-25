import ArticleCard from './ArticleCard'

export default function GalleryGrid({ items = [] }) {
  const safeItems = Array.isArray(items) ? [...items].sort((a, b) => {
    if (a.position && b.position) {
      return a.position - b.position;
    }
    if (a.position) {
      return -1;
    }
    if (b.position) {
      return 1;
    }
    return 0;
  }) : [];

  return (
    <div>
      <div className="columns-2 md:columns-4 gap-2 space-y-2 mt-24">
        {safeItems.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No items found.
          </div>
        ) : (
          safeItems.map(item => (
            <div key={item.id} className="break-inside-avoid">
              <ArticleCard key={item.id} item={item} showMeta={false} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}