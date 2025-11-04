import { motion } from 'framer-motion'

export default function HeroSection({ title, subtitle, image }) {
  // Fallbacks
  const fallbackImg = '/images/hero_maedchen2024.jpg'
  const fallbackTitle = 'Illustrationen & Projekte'
  const fallbackSubtitle = 'Eine Auswahl meiner Arbeiten. Workshops und mehr.'

  // Image resolution logic
  const heroImg =
    image?.data?.formats?.large?.url ||
    image?.data?.url ||
    fallbackImg

  // Optional Strapi base URL (only applied if defined)
  const baseUrl = import.meta.env.VITE_STRAPI_URL
  const fullImageUrl =
    heroImg.startsWith('http') || !baseUrl
      ? heroImg
      : `${baseUrl}${heroImg}`

  // Text fallbacks
  const heroTitle = title?.trim() || fallbackTitle
  const heroSubtitle = subtitle?.trim() || fallbackSubtitle

  return (
    <section className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full"
        >
          <img
            src={fullImageUrl}
            alt={heroTitle}
            className="object-cover w-full h-auto"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          className="px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-4xl font-bold mb-4">
            {heroTitle}
          </h1>
          <p className="text-lg text-gray-700 max-w-xl">
            {heroSubtitle}
          </p>
        </motion.div>
      </div>
    </section>
  )
}