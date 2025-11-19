export function getYoutubeId(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    // 1) Standard format
    if (parsed.searchParams.get("v")) {
      return parsed.searchParams.get("v");
    }

    // 2) youtu.be short format
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "");
    }

    // 3) /embed/VIDEOID
    if (parsed.pathname.includes("/embed/")) {
      return parsed.pathname.split("/embed/")[1];
    }

    // 4) /shorts/VIDEOID
    if (parsed.pathname.includes("/shorts/")) {
      return parsed.pathname.split("/shorts/")[1];
    }

    return null;
  } catch {
    return null;
  }
}


export function getEmbedUrl(url) {
  if (!url || typeof url !== "string") return null;

  // --- YOUTUBE ---
  const youtubeId = getYoutubeId(url);
  if (youtubeId) {
    return `https://www.youtube.com/embed/${youtubeId}`;
  }

  // --- VIMEO ---
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);

  if (vimeoMatch) {
    const id = vimeoMatch[1];
    return `https://player.vimeo.com/video/${id}`;
  }

  // fallback: return unchanged
  return url;
}