// lib/media.js
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:1337"

/**
 * Returns a full URL for Strapi media
 */
export function getMediaUrl(media, format) {
  if (!media) return "/fallback.jpg"

  if (format && media.formats?.[format]?.url) return `${BASE_URL}${media.formats[format].url}`
  if (media.url) return `${BASE_URL}${media.url}`
  return "/fallback.jpg"
}