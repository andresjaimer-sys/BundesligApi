
import { useContext } from 'react';
import { EquiposContext } from '../../Contexto/EquiposContext';
import './style.css';

function Favoritos({ seleccionarEquipo }) {
  const {
    equipos,
    favoritos,
    cambiarFavorito,
    cargando,
    error
  } = useContext(EquiposContext);

  const guardados = equipos.filter((equipo) =>
    favoritos.includes(equipo.teamInfoId)
  );

  return (
    <section className="favoritos">
      <h1>Mis favoritos</h1>

      {cargando && <p>Cargando equipos...</p>}

      {error && <p>Error: {error}</p>}

      {!cargando && !error && (
        <>
          <p>Equipos guardados: {guardados.length}</p>

          {guardados.length === 0 && (
            <p>Aún no has agregado equipos favoritos.</p>
          )}

          <div className="favoritos-lista">
            {guardados.map((equipo) => (
              <div
                className="favorito-tarjeta"
                key={equipo.teamInfoId}
              >
                <img
                  src={equipo.teamIconUrl}
                  alt={equipo.teamName}
                />

                <h3>{equipo.teamName}</h3>

                <p>{equipo.points} puntos</p>

                <button
                  type="button"
                  onClick={() => seleccionarEquipo(equipo)}
                >
                  Ver detalle
                </button>

                <button
                  type="button"
                  className="quitar"
                  onClick={() => cambiarFavorito(equipo.teamInfoId)}
                >
                  Quitar favorito
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Favoritos;
