import HeroSection from '../components/HeroSection'
import FilterBar from '../components/FilterBar'
import GalleryGrid from '../components/GalleryGrid'
import { useEffect, useState } from 'react'
import { fetchAPI } from '../lib/api'

export default function Home() {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('all')
  const [tags, setTags] = useState([])

  useEffect(() => {
    fetchAPI('articles?populate=*')
    .then(data => {
      const articles = data?.data || []
      setProjects(articles)
      const t = Array.from(new Set(articles.map(d => d?.category?.name).filter(Boolean)))
      setTags(t)
    }).catch(console.error)
  }, [])

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter)


  return (
    <div>
      <HeroSection title="Illustrationen & Workshops" subtitle='"Du kannst alles drehen! Außer die Welt, die dreht sich von ganz allein!" (Buchkinder Leipzig)' />
      <FilterBar tags={tags} current={filter} onChange={setFilter} />
      <GalleryGrid items={filtered} />

    </div>
  )
}