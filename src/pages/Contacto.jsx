import SpotlightEffect from '../components/SpotlightEffect'
import { useRef } from 'react'
import '../styles/Contacto.css'

function Contacto() {
  const containerRef = useRef(null)

  return (
    <div className="contacto spotlight-section" ref={containerRef}>
      <SpotlightEffect 
        containerRef={containerRef}
        enabled={true}
        spotlightRadius={400}
        glowColor="132, 0, 255"
      />
      <div className="contacto-content">
        <h2>Contacto</h2>
        <p>Próximamente...</p>
      </div>
    </div>
  )
}

export default Contacto