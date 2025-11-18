import HeroSection from '../components/HeroSection'
import FilterBar from '../components/FilterBar'
import GalleryGrid from '../components/GalleryGrid'
import { useState } from 'react'
import { useHomeData } from '../lib/useHomeData'

export default function Home() {
  const {home, articles, tags, loading} = useHomeData()
  const [filter, setFilter] = useState('all')

  if (loading || !home)
    return <div className="py-12 text-center">Loading…</div>

  const { heroTitle, heroSubtitle, heroImage } = home

  const filteredArticles = filter === 'all'
    ? articles
    : articles.filter(a => a.categories?.some(c => c.name === filter))

  return (
    <div className='max-w-6xl mx-auto'>
      <HeroSection
        title={heroTitle}
        subtitle={heroSubtitle}
        image={heroImage}
      />

      <FilterBar tags={tags} current={filter} onChange={setFilter} />
      <GalleryGrid items={filteredArticles} />
    </div>
  )
}