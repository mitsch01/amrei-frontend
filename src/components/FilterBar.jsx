export default function FilterBar({ tags = [], current = 'all', onChange }) {
  // Helper to capitalize the first letter
  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

  return (
    <div className="py-6 px-4">
      <div className="flex gap-3 flex-wrap">
        {/* "All" button */}
        <button
          onClick={() => onChange('all')}
          className={`px-3 py-1 border rounded transition-colors duration-200 ${current === 'all'
              ? 'bg-accent/50 border-accent text-accent-foreground'
              : 'hover:bg-accent/20'
            }`}
        >
          All
        </button>

        {/* Category buttons */}
        {tags.map(tag => (
          <button
            key={tag.id}
            onClick={() => onChange(tag.name)}
            className={`px-3 py-1 border rounded transition-colors duration-200 ${current === tag.name
                ? 'bg-accent/50 border-accent text-accent-foreground'
                : 'hover:bg-accent/20'
              }`}
          >
            {capitalize(tag.name)}
          </button>
        ))}
      </div>
    </div>
  )
}