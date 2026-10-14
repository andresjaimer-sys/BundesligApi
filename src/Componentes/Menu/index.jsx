import './style.css';

function Menu({ pestana, cambiarPestana }) {
  const opciones = [
    'Inicio',
    'Favoritos',
    'Diagnóstico',
    'Informativa',
    'Usuario'
  ];

  return (
    <nav className="menu">
      {opciones.map((opcion) => (
        <button
          key={opcion}
          type="button"
          className={pestana === opcion ? 'activo' : ''}
          onClick={() => cambiarPestana(opcion)}
        >
          {opcion}
        </button>
      ))}
    </nav>
  );
}

export default Menu;
