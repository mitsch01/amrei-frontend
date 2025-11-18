import { marked } from 'marked'
import { useUniversalPage } from '../lib/useUniversalPage'

export default function UniversalPage({slug}) {
  const {data, loading} = useUniversalPage(slug)

  if (loading) return <div className="py-12 px-4">Loading…</div>

  if (data.page) {
    return (
      <div className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">{data.page.title}</h2>
        {data.page.quote && <p className="text-gray-700 mb-4">{data.page.quote}</p>}
        <div
          className="prose text-gray-700 max-w-none"
          dangerouslySetInnerHTML={{ __html: marked(data.page.body || '') }}
        />     
      </div>
    )
  }

  return <div className="py-12 px-4 max-w-6xl mx-auto">Page not found</div>
}