// lib/media.js
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:1337"

/**
 * Returns a full URL for Strapi media
 */
export function getMediaUrl(media, format) {
  if (!media) return "/fallback.jpg"

  let url = null
  if (format && media.formats?.[format]?.url) {
    url = media.formats[format].url
  } else if (media.url) {
    url = media.url
  } else {
    return "/fallback.jpg"
  }

  // Wenn URL bereits absolut ist (beginnt mit http:// oder https://), direkt zurückgeben
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  // Sonst BASE_URL hinzufügen (für relative URLs)
  return `${BASE_URL}${url}`
}