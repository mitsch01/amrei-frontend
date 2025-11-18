export default function HeroSection({ title, subtitle, image }) {
  const fallbackImg = '/images/hero_maedchen2024.jpg'
  const fallbackTitle = 'Illustrationen & Projekte'
  const fallbackSubtitle = 'Eine Auswahl meiner Arbeiten. Workshops und mehr.'

  const baseUrl = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

  const heroImage =
    image?.url ||
    fallbackImg

  const fullImageUrl =
    heroImage.startsWith('http') || !baseUrl
      ? heroImage
      : `${baseUrl}${heroImage}`

  const heroTitle = title?.trim() || fallbackTitle
  const heroSubtitle = subtitle?.trim() || fallbackSubtitle

  return (
    <section className="relative">
      <div className="grid grid-cols-1 md:grid-cols-7 items-center py-24">
        {/* Image */}
        <div className="md:col-span-4 pt-32 pb-24 w-[130%]">
          <img
            src={fullImageUrl}
            alt={heroTitle}
            className="object-cover w-full h-auto pt-16"
          />
        </div>

        {/* Text */}
        <div className="md:col-span-3 pl-8 self-start">
          <h1 className="mb-4">
            {heroTitle}
          </h1>
          <p className="text-lg text-gray-700 max-w-xl italic">
            {heroSubtitle}
          </p>
        </div>
      </div>
    </section>
  )
}