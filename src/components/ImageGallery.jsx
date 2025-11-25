import { Play } from "lucide-react";

export function ImageGallery({ images, onOpen }) {
  if (!images?.length) return null

  return (
    <div className="columns-1 sm:columns-2 md:columns-2 gap-4 space-y-4 pb-16">
      {images.map((img, i) => (
        <div
          key={img.id || i}
          className="break-inside-avoid cursor-pointer group relative"
          onClick={() => onOpen(i)}
        >
          <img
            src={img.url}
            alt={img.alternativeText || ''}
            className="w-full h-auto object-cover hover:opacity-80 transition"
          />
          <div className="absolute inset-0 vignette-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      ))}
    </div>
  )
}