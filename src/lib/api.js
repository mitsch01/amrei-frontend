export async function fetchAPI(path) {
  try {
    const base = import.meta.env.VITE_API_URL || "http://localhost:1337"
//TEST//
    console.log("🔍 VITE_API_URL:", import.meta.env.VITE_API_URL)
    console.log("🔍 Using base:", base)

    const res = await fetch(`${base}/api/${path}`);

    if (!res.ok) {
      throw new Error(`API fetch failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("❌ fetchAPI error:", err);
    throw err;
  }
}