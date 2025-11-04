import { useEffect, useState } from 'react'
import { fetchAPI } from '../lib/api'

export default function BasicPage({ slug }) {
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchAPI('abouts?populate=*')
      .then(res => {
        const items = res?.data || []

        console.log("Fetched items:", items)
        console.log("Current slug:", slug)

        const matchedPage = slug
          ? items.find(
            item => item?.title?.toLowerCase() === slug.toLowerCase()
          )
          : null

        setPage(matchedPage || null)
        setLoading(false)
      })
      .catch(err => {
        console.error("Fetch error:", err)
        setLoading(false)
      })
  }, [slug])

  if (loading) return <div className="py-12 px-4">Loading…</div>
  if (!page) return <div className="py-12 px-4">Page not found</div>

  return (
    <div className="py-12 px-4">
      <h2 className="text-2xl font-semibold mb-4">{page.title}</h2>
      <div className="prose max-w-none">
        {page.blocks?.map((block, index) => (
          <div key={block.id || index}>{block.body}</div>
        )) || 'No content available'}
      </div>
    </div>
  )
}