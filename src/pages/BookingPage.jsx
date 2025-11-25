import { marked } from 'marked'
import { useUniversalPage } from '../lib/useUniversalPage'
import { Link } from 'react-router-dom';
import { useArticles } from '../lib/useArticles'
import Slider from '../components/Slider'


export default function BookingPage({ slug }) {
  const { data, loading } = useUniversalPage(slug)
  const { articles } = useArticles({ categorySlugs: [data.page?.slug || slug] })

  if (loading) return <div className="py-12 px-4">Loading…</div>

  if (data.page) {
    return (
      <div className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">{data.page.title}</h2>
        {data.page.quote && <p className="text-gray-500 mb-4 italic text-right">{data.page.quote}</p>}
        <div
          className="prose text-gray-700 max-w-none mb-16"
          dangerouslySetInnerHTML={{ __html: marked(data.page.body || '') }}
        />
        <Link className="bg-black text-white border border-black px-6 py-2 rounded font-semibold hover:bg-white hover:text-black transition-colors duration-300 inline-block mb-12" to="/contact">
          Jetzt buchen
        </Link>
        <Slider items={articles} />
      </div>
    )
  }

  return <div className="py-12 px-4 max-w-6xl mx-auto">Page not found</div>
}