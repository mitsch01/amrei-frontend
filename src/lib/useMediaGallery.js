import { useMemo, useState } from "react"

export function useMediaGallery(article) {
  const baseURL = import.meta.env.VITE_API_URL || "http://localhost:1337"

  // Extract images
  const images = useMemo(() => {
    if (!article) return []

    const rawImages = [
      ...(article.cover ? [article.cover] : []),
      ...(Array.isArray(article.media) ? article.media : []),
    ].filter((m) => m.mime?.includes("image"))

    return rawImages.map((img) => ({
      ...img,
      type: "image",
      url: img.formats?.large?.url
        ? `${baseURL}${img.formats.large.url}`
        : `${baseURL}${img.url}`,
    }))
  }, [article, baseURL])

  // Extract videos
  const videos = useMemo(() => {
    if (!article) return []
    const rawVideos = Array.isArray(article.videoUrl) ? article.videoUrl : []

    return rawVideos.map((v) => ({
      ...v,
      type: "video",
    }))
  }, [article])

  // Combined gallery items
  const galleryItems = useMemo(() => {
    return [...videos, ...images]
  }, [videos, images])

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

  const prevImage = () =>
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1))

  const nextImage = () =>
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1))

  return {
    images,
    videos,
    galleryItems,
    lightboxOpen,
    currentIndex,
    openLightbox,
    closeLightbox,
    nextImage,
    prevImage,
  }
}