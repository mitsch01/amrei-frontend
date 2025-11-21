import { useMemo, useState } from "react"
import { getEmbedUrl, getYoutubeId } from "./video"   // <-- updated import

export function useMediaGallery(article) {
  const baseURL = import.meta.env.VITE_API_URL || "http://localhost:1337"

  // ---------------------------
  // IMAGES
  // ---------------------------
  const images = useMemo(() => {
    if (!article) return []

    const rawImages = [
      ...(article.cover ? [article.cover] : []),
      ...(Array.isArray(article.media) ? article.media : []),
    ].filter(m => m.mime?.includes("image"))

    return rawImages.map(img => ({
      type: "image",
      url: img.formats?.large?.url
        ? `${baseURL}${img.formats.large.url}`
        : `${baseURL}${img.url}`,
      thumbnail: img.formats?.small?.url
        ? `${baseURL}${img.formats.small.url}`
        : `${baseURL}${img.url}`,
      alt: img.alternativeText || "",
      id: img.id,
    }))
  }, [article, baseURL])

  // ---------------------------
  // VIDEOS
  // ---------------------------
  const videos = useMemo(() => {
    if (!article) return []
    if (!Array.isArray(article.video)) return []

    return article.video.map(v => {
      const id = getYoutubeId(v.videoLink)
      const embedUrl = getEmbedUrl(v.videoLink)

      // Thumbnail logic:
      const thumbnail =
        v.cover
          ? `${baseURL}${v.cover.url}`                           // Strapi custom cover
          : id
            ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`  // YouTube generated
            : "/fallback-video-thumbnail.jpg"                    // fallback

      return {
        type: "video",
        id,
        embedUrl,
        url: v.videoLink,
        thumbnail,
        title: v.videoTitle,
        position: v.position ?? 0,

        safeLinkProps: {
          target: "_blank",
          rel: "noopener noreferrer",
          referrerPolicy: "no-referrer"
        }
      }
    })
  }, [article, baseURL])


  // Sorted by "position"
  const sortedVideos = useMemo(() => {
    return [...videos].sort((a, b) => a.position - b.position)
  }, [videos])

  // ---------------------------
  // MERGED GALLERY (videos → images)
  // ---------------------------
  const galleryItems = useMemo(() => {
    const mergedItems = [...images]
    return mergedItems
  }, [images])

  // ---------------------------
  // LIGHTBOX STATE
  // ---------------------------
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = imageIndex => {
    // When opening the lightbox, we need to find the correct index
    // within the galleryItems (which now only contain images).
    // The `imageIndex` here refers to the index within the `images` array.
    setCurrentIndex(imageIndex)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

  const prev = () => {
    setCurrentIndex(i =>
      i === 0 ? galleryItems.length - 1 : i - 1
    )
  }

  const next = () => {
    setCurrentIndex(i =>
      i === galleryItems.length - 1 ? 0 : i + 1
    )
  }

  // ---------------------------
  // RETURN API
  // ---------------------------
  return {
    images,
    videos: sortedVideos,
    galleryItems,
    lightboxOpen,
    currentIndex,
    openLightbox,
    closeLightbox,
    prev,
    next,
  }
}