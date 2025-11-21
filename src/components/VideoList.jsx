import { getEmbedUrl } from "../lib/video"

export function VideoList({ videos }) {
  if (!videos?.length) return null

  return (
    <div className="mb-4 space-y-6">
      {videos.map((v, idx) => {
        const embed = getEmbedUrl(v.url)

        return (
          <div key={idx} className="aspect-video w-full overflow-hidden shadow">
            <iframe
              src={embed}
              className="w-full h-full"
              loading="lazy"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          </div>
        )
      })}
    </div>
  )
}