import { useState } from 'react'
import '../styles/ImageModal.css'

export function useImageModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const openModal = (imagen, nombre, color) => {
    setSelectedImage({ imagen, nombre, color })
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsOpen(false)
    document.body.style.overflow = 'unset'
  }

  return { isOpen, selectedImage, openModal, closeModal }
}

function ImageModal({ isOpen, selectedImage, onClose }) {
  if (!isOpen || !selectedImage) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <img src={selectedImage.imagen} alt={selectedImage.nombre} />
        <div className="modal-info">
          <h3>{selectedImage.nombre}</h3>
          <p>Color: {selectedImage.color}</p>
        </div>
      </div>
    </div>
  )
}

export default ImageModal