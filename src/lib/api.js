// export async function fetchAPI(path) {
//   const res = await fetch(`${import.meta.env.VITE_API_URL}/${path}`);
//   if (!res.ok) throw new Error('API fetch failed');
//   return res.json();
// }

export async function fetchAPI(path) {
  try {
    const base = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337"; // 👈 default Strapi dev URL
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