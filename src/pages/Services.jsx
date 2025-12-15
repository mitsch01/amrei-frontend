import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Bücher',
    description: 'Geschichten, Illustrationen und Publikationen zum Entdecken.',
    to: '/books',
  },
  {
    title: 'Workshops',
    description: 'Kreative Formate für Teams, Schulen und Events.',
    to: '/workshops',
  },
  {
    title: 'Kollaborationen',
    description: 'Gemeinsame Projekte mit Marken, Verlagen und Partner:innen.',
    to: '/collaborations',
  },
  {
    title: 'Skizzen und Animationen',
    description: 'Ein weiteres Format folgt bald – schon jetzt vormerken lassen.',
    to: null,
    comingSoon: true,
  },
]

export default function Services() {
  return (
    <div className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Leistungen</h2>
      <p className="text-lg text-gray-700 mb-10 max-w-3xl">
        Entdecken Sie die Angebote von Amrei Fiedler. Wählen Sie direkt aus den Kategorien
        oder lernen Sie alle Leistungen auf einen Blick kennen.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map(service => {
          const Card = service.to ? Link : 'div'
          return (
            <Card
              key={service.title}
              to={service.to || undefined}
              className="block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-2xl font-semibold">{service.title}</h3>
                {service.comingSoon && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    Bald
                  </span>
                )}
              </div>
              <p className="text-gray-700 leading-relaxed">{service.description}</p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

