import { useContext, useEffect, useState } from 'react';
import { EquiposContext } from '../../Contexto/EquiposContext';
import './style.css';

function Usuario() {
  const { favoritos } = useContext(EquiposContext);

  const [nombre, setNombre] = useState(() =>
    localStorage.getItem('usuarioBundesliga') || ''
  );

  useEffect(() => {
    localStorage.setItem('usuarioBundesliga', nombre);
  }, [nombre]);

  return (
    <section className="usuario">
      <h1>Mi perfil</h1>

      <div className="usuario-caja">
        <h2>
          Bienvenido{nombre ? `, ${nombre}` : ''}
        </h2>

        <label htmlFor="nombre-usuario">
          Tu nombre
        </label>

        <input
          id="nombre-usuario"
          type="text"
          placeholder="Escribe tu nombre"
          maxLength={40}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <p>
          Equipos favoritos:
          <strong> {favoritos.length}</strong>
        </p>

        <p>
          Temporada consultada:
          <strong> 2025/26</strong>
        </p>
      </div>
    </section>
  );
}

export default Usuario;
