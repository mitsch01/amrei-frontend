import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Indexpage from './pages/Indexpage.jsx'
import Detailpage from './pages/Detailpage.jsx'
import BasicPage from './pages/BasicPage.jsx'
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
            <Route path="/portfolio" element={<Indexpage />} />
            <Route path="/portfolio/:slug" element={<Detailpage />} />
            <Route path="/workshops" element={<Indexpage />} />
            <Route path="/workshops/:slug" element={<Detailpage />} />
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


