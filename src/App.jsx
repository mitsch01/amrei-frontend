import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import DetailPage from './pages/Detailpage.jsx'
import UniversalPage from './pages/UniversalPage.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
          <Header />
        <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/articles/:slug" element={<DetailPage />} />
              <Route path="/:slug" element={<UniversalPage />} />
            </Routes>
          </main>
        <Footer />
      </div>
    </Router>
  )
}