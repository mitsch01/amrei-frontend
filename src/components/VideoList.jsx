export function VideoList({ videos }) {
  if (!videos?.length) return null

  return (
    <div className="mb-4 space-y-4">
      {videos.map((url, idx) => {
        const id = url.split('v=')[1] || url.split('/').pop()
        return (
          <iframe
            key={idx}
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${id}`}
            allowFullScreen
          />
        )
      })}
    </div>
  )
}