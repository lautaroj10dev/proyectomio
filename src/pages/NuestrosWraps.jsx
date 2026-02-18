import CircularGallery from '../components/CircularGallery'
import SpotlightEffect from '../components/SpotlightEffect'
import { useRef } from 'react'
import '../styles/NuestrosWraps.css'

function NuestrosWraps() {
  const containerRef = useRef(null)

  const wraps = [
    { image: '/colores/color_lamborghiniurus.png', text: 'Camaleon' },
    { image: '/colores/color_caribbeanblue.png', text: 'Caribbean Blue' },
    { image: '/colores/color_glosssand.png', text: 'Gloss Sand' },
    { image: '/colores/color_marron.png', text: 'Marron' },
    { image: '/colores/color_olive.png', text: 'Olive' },
    { image: '/colores/color_orangejuice.png', text: 'Orange Juice' },
    { image: '/colores/color_satinred.png', text: 'Satin Red' },
    { image: '/colores/color_verdemusgo.png', text: 'Verde Musgo' },
    { image: '/colores/color_vibeblue.png', text: 'Vibe Blue' }
  ]

  return (
    <div className="nuestros-wraps spotlight-section" ref={containerRef}>
      <SpotlightEffect 
        containerRef={containerRef}
        enabled={true}
        spotlightRadius={400}
        glowColor="132, 255, 0"
      />
      <div className="wraps-content">
        <h2>Nuestra Variedad de Wraps</h2>
        <div className="carousel-container" data-spotlight-card>
          <CircularGallery items={wraps} bend={3} textColor="#ffffff" />
        </div>
      </div>
    </div>
  )
}

export default NuestrosWraps