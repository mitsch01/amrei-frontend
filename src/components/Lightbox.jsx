import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
// eslint-disable-next-line
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize } from "lucide-react";

const SWIPE_THRESHOLD = 50;

export default function Lightbox({
  galleryItems = [],
  currentIndex = 0,
  onClose,
  onPrev,
  onNext,
}) {
  const isBrowser = typeof document !== "undefined";
  const inRange =
    currentIndex >= 0 && currentIndex < galleryItems.length;
  const current = inRange ? galleryItems[currentIndex] : null;

  const startX = useRef(0);
  const dialogRef = useRef(null);
  const openerRef = useRef(null);
  const titleId = "lightbox-title";

  // Prevent background scroll
  useEffect(() => {
    if (!isBrowser) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isBrowser]);

  // Keyboard navigation
  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (!isBrowser) return;
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isBrowser, handleKey]);

  // Focus on open, restore on close
  useEffect(() => {
    if (!isBrowser) return;
    openerRef.current = document.activeElement;
    const dialog = dialogRef.current;
    dialog?.focus();
    return () => openerRef.current?.focus?.();
  }, [isBrowser]);

  if (!isBrowser || !current) return null;

  // Mobile swipe gesture
  const handleTouchStart = (e) =>
    (startX.current = e.changedTouches[0].clientX);
  const handleTouchEnd = (e) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > SWIPE_THRESHOLD) onNext();
    if (diff < -SWIPE_THRESHOLD) onPrev();
  };

  return createPortal(
    <AnimatePresence initial={false}>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          role="document"
          key={current.url || current.embedUrl}
          className="relative w-fit max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          ref={dialogRef}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <h2 id={titleId} className="sr-only">
            Media lightbox
          </h2>

          {/* ---------------------------
              VIDEO
          ---------------------------- */}
          {current.type === "video" ? (
            <iframe
              title={current.title || "Video"}
              loading="lazy"
              src={current.embedUrl}
              className="w-full h-[70vh] max-h-[90vh] shadow-lg"
              allow="autoplay; encrypted-media"
              allowFullScreen
              referrerPolicy="no-referrer"
            />
          ) : (
            /* ---------------------------
               IMAGE
            ---------------------------- */
            <img
              loading="lazy"
              src={current.url}
              alt={current.alt || ""}
              className="w-full h-auto object-contain max-h-[90vh] shadow-lg"
            />
          )}

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-[#F2D377] transition"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white h-12 flex items-center justify-between px-4">

            {/* Arrows */}
            <div className="flex gap-2 items-center">
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous"
                className="text-black hover:text-[#F2D377]"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Next"
                className="text-black hover:text-[#F2D377]"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Index */}
            <div className="text-black text-sm font-medium">
              {currentIndex + 1} / {galleryItems.length}
            </div>

            {/* Fullscreen / external open */}
            {current.type === "image" ? (
              <button
                type="button"
                onClick={() =>
                  window.open(
                    current.url,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                aria-label="Open full size"
                className="text-black hover:text-[#F2D377]"
              >
                <Maximize size={20} />
              </button>
            ) : (
              <a
                href={current.url || current.embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                aria-label="Open video externally"
                className="text-black hover:text-[#F2D377]"
              >
                <Maximize size={20} />
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}