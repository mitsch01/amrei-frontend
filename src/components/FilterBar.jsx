export default function FilterBar({
  tags = [],
  current = 'all',
  onChange,
}) {
  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

  // Sort tags alphabetically by name
  const sortedTags = [...tags].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
  )

  return (
    <div className="pb-6">
      <div className="flex gap-3 flex-wrap">
        {/* "All" button */}
        <button
          onClick={() => onChange('all')}
          className={`px-4 py-2 border font-medium 
            ${current === 'all'
              ? 'bg-[#0D0D0D] text-[#FFFFFF] border-[#0D0D0D]'
              : ' border-[#0D0D0D] text-[#0D0D0D] hover:bg-[#F2D377] hover:text-[#0D0D0D] hover:border-[#F2D377]'
            }`}
        >
          All
        </button>

        {/* Category buttons */}
        {sortedTags.map(tag => (
          <button
            key={tag.id}
            onClick={() => onChange(tag.name)}
            className={`px-4 py-2 border font-medium 
              ${current === tag.name
                ? 'bg-[#0D0D0D] text-[#FFFFFF] border-[#0D0D0D]'
                : ' border-[#0D0D0D] text-[#0D0D0D] hover:bg-[#F2D377] hover:text-[#0D0D0D] hover:border-[#F2D377]'
              }`}
          >
            {capitalize(tag.name)}
          </button>
        ))}
      </div>
    </div>
  )
}