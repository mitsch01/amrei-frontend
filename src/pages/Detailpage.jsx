import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAPI } from '../lib/api'
import RelatedWorkSlider from '../components/RelatedWorkSlider'

export default function PortfolioDetail() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [related, setRelated] = useState([])

  useEffect(() => {
    fetchAPI(`/projects?filters[slug][$eq]=${slug}`).then(data => {
      setProject(data[0])
      // fetch related (example: same category)
      if (data[0]) {
        const cat = data[0].category
        fetchAPI(`/projects?filters[category][$eq]=${cat}&pagination[limit]=4`).then(setRelated)
      }
    }).catch(console.error)
  }, [slug])

  if (!project) return <div className=" py-12">Loading…</div>

  const images = project.images?.data || []

  return (
    <div>
      <div className=" py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map(img => {
              const url = img.formats?.large?.url || img.url
              return <img key={img.id} src={url} alt="" className="w-full h-64 object-cover rounded" />
            })}
          </div>
        </div>
        <aside className="md:col-span-1">
          <h1 className="text-2xl font-semibold">{project.title}</h1>
          <div className="mt-4 text-gray-700">{project.body}</div>
        </aside>
      </div>

      <RelatedWorkSlider items={related} />
    </div>
  )
}