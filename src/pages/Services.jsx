import { Link } from 'react-router-dom'
import { useFetch } from '../lib/useFetch'

const STRAPI_URL = import.meta.env.VITE_API_URL

export default function Services() {
  const { data: cards, loading, error } = useFetch('cards?populate=image')
  console.log("cards:", cards)

  if (loading) {
    return <div className="py-12 text-center">Loading services…</div>
  }

  if (error || !Array.isArray(cards)) {
    return <div className="py-12 text-center">Failed to load services.</div>
  }

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Leistungen</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map(card => {
          const Card = card.slug ? Link : 'div'

          return (
            <Card
              key={card.id}
              to={card.slug ? `/${card.slug}` : undefined}
              className="block bg-[#F2D377] p-6 transition-transform hover:-translate-y-1"
            >
              {card.image && (
                <img
                  src={card.image.url}
                  alt={card.title}
                  className="mb-4 w-full h-40 object-cover"
                />
              )}

              <h3 className="text-2xl font-semibold mb-2">
                {card.title}
              </h3>

              {card.body && (
                <p className="text-gray-700">
                  {card.body}
                </p>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}