import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Portfolio from './pages/Portfolio.jsx'
import Workshops from './pages/Workshops.jsx'
import BasicPage from './pages/BasicPage.jsx'
import DetailPage from './pages/Detailpage.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const pages = ['about', 'contact', 'impressum', 'datenschutz']

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/articles/:slug" element={<DetailPage />} />
            {pages.map(slug => (
              <Route key={slug} path={`/${slug}`} element={<BasicPage slug={slug} />} />
            ))}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}


