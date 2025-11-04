import ArticleCard from './ArticleCard'

export default function Slider({ items }) {
  const safeItems = Array.isArray(items) ? items : []

  return (
    <div className="py-8">
      <h3 className="text-lg font-semibold mb-4">Related Work</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {safeItems.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            No related work.
          </div>
        ) : (
            safeItems.map(item => (
              <ArticleCard key={item.id} item={item} />
            ))
            )
          }
      </div>
    </div>
  )
}