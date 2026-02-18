import SpotlightEffect from '../components/SpotlightEffect'
import { useRef } from 'react'
import '../styles/Testimonios.css'

function Testimonios() {
  const containerRef = useRef(null)

  return (
    <div className="testimonios spotlight-section" ref={containerRef}>
      <SpotlightEffect 
        containerRef={containerRef}
        enabled={true}
        spotlightRadius={400}
        glowColor="132, 0, 255"
      />
      <div className="testimonios-content">
        <h2>Testimonios</h2>
        <p>Próximamente...</p>
      </div>
    </div>
  )
}

export default Testimonios