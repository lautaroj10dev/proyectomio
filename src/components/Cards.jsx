import '../styles/Cards.css'

function Cards({ onOpenModal }) {
  const autos = [
    {
      id: 1,
      imagen: '/autos/camaleon.jpg',
      codigoColor: '#2BD4C7',
      nombre: 'Camaleon'
    },
    {
      id: 2,
      imagen: '/autos/caribbeanblue.jpg',
      codigoColor: '#708689',
      nombre: 'Caribbean Blue'
    },
    {
      id: 3,
      imagen: '/autos/glosssand.jpg',
      codigoColor: '#77705e',
      nombre: 'Gloss Sand'
    },
    {
      id: 4,
      imagen: '/autos/marron.jpg',
      codigoColor: '#958c86',
      nombre: 'Marron'
    },
    {
      id: 5,
      imagen: '/autos/olive.jpg',
      codigoColor: '#424240',
      nombre: 'Olive'
    },
    {
      id: 6,
      imagen: '/autos/orangejuice.jpg',
      codigoColor: '#443116',
      nombre: 'Orange Juice'
    },
    {
      id: 7,
      imagen: '/autos/satinred.jpg',
      codigoColor: '#453e48',
      nombre: 'Satin Red'
    },
    {
      id: 8,
      imagen: '/autos/verdemusgo.jpg',
      codigoColor: '#727a72',
      nombre: 'Verde Musgo'
    },
    {
      id: 9,
      imagen: '/autos/vibeblue.jpg',
      codigoColor: '#192765',
      nombre: 'Vibe Blue'
    },
  ]

  return (
    <>
      {autos.map((auto) => (
        <div key={auto.id} className="card">
          <img src={auto.imagen} alt={auto.nombre} />
          <div className="card-info">
            <h3 className="card-name">{auto.nombre}</h3>
            <p className="card-color">Color: {auto.codigoColor}</p>
            <button 
              className="card-button"
              onClick={() => onOpenModal(auto.imagen, auto.nombre, auto.codigoColor)}
            >
              Agrandar
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default Cards