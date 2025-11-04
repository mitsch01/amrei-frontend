export default function FilterBar({ tags = [], current = 'all', onChange }) {
  return (
    <div className=" py-6 px-4">
      <div className="flex gap-3 flex-wrap">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => onChange(tag)}
            className={`px-3 py-1 border ${current === tag ? 'bg-accent/50' : ''}`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}