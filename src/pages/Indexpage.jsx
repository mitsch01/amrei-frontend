import { useEffect, useState } from 'react'
import { fetchAPI } from '../lib/api'
import GalleryGrid from '../components/GalleryGrid'

export default function IndexPage({category}) {
const [articles, setArticles] = useState([])
const [loading, setLoading] = useState(true)

useEffect(() => {
  fetchAPI(`articles?filters[category][$eq]=${category}`)
  .then(data => {
    setArticles(data)
    setLoading(false)
  })
}, [category])

  if (loading) return <div className="py-12 px-4">Loading...</div>

  return (
    <div className="py-12 px-4">
      <h2 className="text-2xl font-semibold mb-4">{category}</h2>
      <GalleryGrid items={articles} />
    </div>
  )
}