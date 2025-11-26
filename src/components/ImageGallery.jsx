import { Play } from "lucide-react";

export function ImageGallery({ images, onOpen }) {
  if (!images?.length) return null

  // Logik: Wenn nur 1 Bild da ist -> 1 Spalte (volle Breite). 
  // Sonst -> Masonry Layout wie vorher.
  const isSingleImage = images.length === 1;

  return (
    <div
      className={`
        gap-4 space-y-4 pb-16
        ${isSingleImage ? 'columns-1' : 'columns-1 sm:columns-2 md:columns-2'}
      `}
    >
      {images.map((img, i) => (
        <div
          key={img.id || i}
          className="break-inside-avoid cursor-pointer group relative"
          // onOpen nur aufrufen, wenn funktion übergeben wurde
          onClick={() => onOpen && onOpen(i)}
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