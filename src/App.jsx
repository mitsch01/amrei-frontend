import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import DetailPage from './pages/Detailpage.jsx'
import UniversalPage from './pages/UniversalPage.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import BookingPage from './pages/BookingPage.jsx'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles/:slug" element={<DetailPage />} />
            <Route path="/books" element={<BookingPage slug="books" />} />
            <Route path="/workshops" element={<BookingPage slug="workshops" />} />
            <Route path="/collaborations" element={<BookingPage slug="collaborations" />} />
            <Route path="/about" element={<UniversalPage slug="about" />} />
            <Route path="/contact" element={<UniversalPage slug="contact" />} />
            <Route path="/datenschutz" element={<UniversalPage slug="datenschutz" />} />
            <Route path="/impressum" element={<UniversalPage slug="impressum" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}