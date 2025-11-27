import HeroSection from '../components/HeroSection'
import FilterBar from '../components/FilterBar'
import GalleryGrid from '../components/GalleryGrid'
import { useState, useMemo } from 'react'
import { useHomeData } from '../lib/useHomeData'


const isCoverOnlyArticle = (article) => {
  if (!article) return false
  return !article.body
}

export default function Home() {
  const { home, articles, tags, loading } = useHomeData()
  const [filter, setFilter] = useState('all')

  const { coverOnlyArticles, regularArticles } = useMemo(() => {
    const coverOnly = articles.filter(isCoverOnlyArticle)
    const regular = articles.filter(item => !isCoverOnlyArticle(item))
    return { coverOnlyArticles: coverOnly, regularArticles: regular }
  }, [articles])

  const filteredArticles = useMemo(() => {
    if (filter === 'all') return [...coverOnlyArticles, ...regularArticles]
    return [...coverOnlyArticles, ...regularArticles].filter(a =>
      a.categories?.some(c => c.name === filter)
    )
  }, [coverOnlyArticles, regularArticles, filter])

  if (loading || !home)
    return <div className="py-12 text-center">Loading…</div>

  const { heroTitle, heroSubtitle, heroImage } = home

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