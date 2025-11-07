export default function FilterBar({ tags = [], current = 'all', onChange }) {
  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

  return (
    <div className="pb-6">
      <div className="flex gap-3 flex-wrap">
        {/* "All" button */}
        <button
          onClick={() => onChange('all')}
          className={`px-4 py-2 border font-medium transition-all duration-300
            ${current === 'all'
              ? 'bg-[#0D0D0D] text-[#FFFFFF] border-[#0D0D0D]'
            : ' border-[#0D0D0D] text-[#0D0D0D] hover:bg-[#F2A999] hover:text-[#FFFFFF] hover:border-[#F2A999]'
            }`}
        >
          All
        </button>

        {/* Category buttons */}
        {tags.map(tag => (
          <button
            key={tag.id}
            onClick={() => onChange(tag.name)}
            className={`px-4 py-2 border font-medium transition-all duration-300
              ${current === tag.name
                ? 'bg-[#0D0D0D] text-[#FFFFFF] border-[#0D0D0D]'
              : ' border-[#0D0D0D] text-[#0D0D0D] hover:bg-[#F2A999] hover:text-[#FFFFFF] hover:border-[#F2A999]'
              }`}
          >
            {capitalize(tag.name)}
          </button>
        ))}
      </div>
    </div>
  )
}