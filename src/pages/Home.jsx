import HeroSection from '../components/HeroSection'
import FilterBar from '../components/FilterBar'
import GalleryGrid from '../components/GalleryGrid'
import { useEffect, useState } from 'react'
import { fetchAPI } from '../lib/api'

export default function Home() {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('all')
  const [tags, setTags] = useState([])
  const [home, setHome] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadHome() {
      try {
        const res = await fetchAPI('home?populate=*')
        setHome(res?.data || null)
      } catch (err) {
        console.error('Error fetching home data:', err)
      }
    }
    loadHome()
  }, [])

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
      } finally {
        setLoading(false)
      }
    }
    loadArticles()
  }, [])

  // --- Handle loading state ---
  if (loading || !home)
    return <div className="py-12 text-center">Loading…</div>

  // --- Extract home fields ---
  const { heroTitle, heroSubtitle, heroImage } = home || {}

  // --- Filter articles ---
  const filtered =
    filter === 'all'
      ? projects
      : projects.filter(p =>
        p.categories?.some(c => c.name === filter)
      )

  return (
    <div className='max-w-6xl mx-auto'>
      <HeroSection
        title={heroTitle}
        subtitle={heroSubtitle}
        image={heroImage}
      />

      <FilterBar tags={tags} current={filter} onChange={setFilter} />
      <GalleryGrid items={filtered} />
    </div>
  )
}