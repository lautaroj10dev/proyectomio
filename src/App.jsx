import { useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Prism from './components/Prism'
import Nav from './components/Nav'
import Inicio from './pages/Inicio'
import NuestrosWraps from './pages/NuestrosWraps'
import Testimonios from './pages/Testimonios'
import Contacto from './pages/Contacto'
import './App.css'

function App() {
  const prismRef = useRef(null)

  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="prism-bg" ref={prismRef}>
          <Prism />
        </div>
        <div className="app-content">
          <header className="app-header">
            <div className="header-title">
              <h1 className="logo">YourDesign</h1>
              <p className="logo-subtitle">Premium Wraps</p>
            </div>
            <nav className="header-nav">
              <Nav />
            </nav>
          </header>
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/nuestros-wraps" element={<NuestrosWraps />} />
              <Route path="/testimonios" element={<Testimonios />} />
              <Route path="/contacto" element={<Contacto />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App