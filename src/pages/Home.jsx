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
    async function loadArticles() {
      try {
        const res = await fetchAPI('articles?populate=*')
        const articles = res?.data || []
        setProjects(articles)

        // Extract all unique category objects
        const allCategories = articles.flatMap(a => a.categories || [])
        const uniqueCategories = Array.from(
          new Map(allCategories.map(c => [c.id, c])).values()
        )
        setTags(uniqueCategories)
      } catch (err) {
        console.error('Error fetching articles:', err)
      }
    }

    loadArticles()
  }, [])

  // Filter projects by selected category name
  const filtered =
    filter === 'all'
      ? projects
      : projects.filter(p =>
        p.categories?.some(c => c.name === filter)
      )

  return (
    <div className='max-w-6xl mx-auto'>
      <HeroSection
        title="Illustrationen & Workshops"
        subtitle='"Du kannst alles drehen! Außer die Welt, die dreht sich von ganz allein!" (Buchkinder Leipzig)'
      />

      <FilterBar tags={tags} current={filter} onChange={setFilter} />
      <GalleryGrid items={filtered} />
    </div>
  )
}