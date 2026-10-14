import { useContext, useState } from 'react';
import { EquiposContext } from '../../Contexto/EquiposContext';
import './style.css';

function Inicio({ seleccionarEquipo }) {
  const { equipos, cargando, error } = useContext(EquiposContext);

  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('todos');

  const filtrados = equipos.filter((equipo, index) => {
    const nombre = equipo.teamName.toLowerCase();

    const coincideNombre = nombre.includes(
      busqueda.trim().toLowerCase()
    );

    let coincidePuesto = true;

    if (filtro === 'primeros') {
      coincidePuesto = index < 6;
    }

    if (filtro === 'medio') {
      coincidePuesto = index >= 6 && index < 12;
    }

    if (filtro === 'ultimos') {
      coincidePuesto = index >= 12;
    }

    return coincideNombre && coincidePuesto;
  });

  return (
    <section className="inicio">
      <h1>Bundesliga 2025/26</h1>
      <p className="subtitulo">Tabla de posiciones</p>

      <div className="controles">
        <input
          type="search"
          placeholder="Buscar un equipo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="todos">Todos los equipos</option>
          <option value="primeros">Primeros 6 puestos</option>
          <option value="medio">Puestos 7 al 12</option>
          <option value="ultimos">Últimos 6 puestos</option>
        </select>
      </div>

      {cargando && <p>Cargando equipos...</p>}

      {error && (
        <p className="mensaje-error">Error: {error}</p>
      )}

      {!cargando && !error && (
        <>
          <p className="contador">
            Equipos encontrados: {filtrados.length}
          </p>

          <div className="c-lista">
            {filtrados.map((equipo) => (
              <button
                type="button"
                className="c-equipo"
                key={equipo.teamInfoId}
                onClick={() => seleccionarEquipo(equipo)}
              >
                <span className="posicion">
                  Posición {equipos.indexOf(equipo) + 1}
                </span>

                <img
                  src={equipo.teamIconUrl}
                  alt={equipo.teamName}
                  loading="lazy"
                />

                <strong>{equipo.teamName}</strong>

                <span>
                  {equipo.points} puntos · {equipo.matches} partidos
                </span>
              </button>
            ))}
          </div>

          {filtrados.length === 0 && (
            <p>No se encontraron equipos.</p>
          )}
        </>
      )}
    </section>
  );
}

export default Inicio;
