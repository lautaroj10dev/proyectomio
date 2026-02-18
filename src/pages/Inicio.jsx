import Cards from '../components/Cards'
import ImageModal, { useImageModal } from '../components/ImageModal'
import SpotlightEffect from '../components/SpotlightEffect'
import { useRef } from 'react'
import '../styles/Inicio.css'

function Inicio() {
  const containerRef = useRef(null)
  const { isOpen, selectedImage, openModal, closeModal } = useImageModal()

  return (
    <div className="inicio spotlight-section" ref={containerRef}>
      <SpotlightEffect 
        containerRef={containerRef}
        enabled={true}
        spotlightRadius={400}
        glowColor="132, 255, 0"
      />
      <div className="inicio-content" data-spotlight-card>
        <Cards onOpenModal={openModal} />
      </div>
      <ImageModal isOpen={isOpen} selectedImage={selectedImage} onClose={closeModal} />
    </div>
  )
}

export default Inicio