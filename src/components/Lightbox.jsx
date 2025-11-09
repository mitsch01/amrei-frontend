import { useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize } from 'lucide-react'

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const current = images[currentIndex]

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = '')
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

  // Swipe for mobile
  let touchStartX = 0
  let touchEndX = 0
  const handleTouchStart = (e) => (touchStartX = e.changedTouches[0].screenX)
  const handleTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].screenX
    if (touchStartX - touchEndX > 50) onNext()
    if (touchEndX - touchStartX > 50) onPrev()
  }

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Image Container */}
          <motion.div
            key={current.url}
            className="relative w-fit max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={current.url}
              alt={current.alternativeText || ''}
              className="w-full h-auto object-contain max-h-[90vh] shadow-lg"
            />

            {/* Close Button Top Right */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-[#F2D377] transition"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Footer White Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-white h-12 flex items-center justify-between px-4">
              {/* Left: Arrows */}
              <div className="flex gap-2 items-center">
                <button onClick={onPrev} aria-label="Previous image" className="text-black hover:text-[#F2D377]">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={onNext} aria-label="Next image" className="text-black hover:text-[#F2D377]">
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Center: Index */}
              <div className="text-black text-sm font-medium">
                {currentIndex + 1} / {images.length}
              </div>

              {/* Right: Fullscreen */}
              <button
                onClick={() => window.open(current.url, '_blank')}
                aria-label="Fullscreen"
                className="text-black hover:text-[#F2D377]"
              >
                <Maximize size={20} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}