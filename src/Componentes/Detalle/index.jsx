
import { useContext } from 'react';
import { EquiposContext } from '../../Contexto/EquiposContext';
import './style.css';

function Detalle({ equipo, posicion }) {
  const { favoritos, cambiarFavorito } = useContext(EquiposContext);

  const esFavorito = favoritos.includes(equipo.teamInfoId);

  return (
    <section className="detalle">
      <img
        src={equipo.teamIconUrl}
        alt={equipo.teamName}
      />

      <h1>{equipo.teamName}</h1>

      <p>Posición en la tabla: {posicion}</p>

      <button
        type="button"
        className="boton-favorito"
        onClick={() => cambiarFavorito(equipo.teamInfoId)}
      >
        {esFavorito
          ? '❤️ Quitar de favoritos'
          : '🤍 Agregar a favoritos'}
      </button>

      <h2>Estadísticas</h2>

      <div className="detalle-estadisticas">
        <p>
          Partidos jugados:
          <strong>{equipo.matches}</strong>
        </p>

        <p>
          Victorias:
          <strong>{equipo.won}</strong>
        </p>

        <p>
          Empates:
          <strong>{equipo.draw}</strong>
        </p>

        <p>
          Derrotas:
          <strong>{equipo.lost}</strong>
        </p>

        <p>
          Goles a favor:
          <strong>{equipo.goals}</strong>
        </p>

        <p>
          Goles en contra:
          <strong>{equipo.opponentGoals}</strong>
        </p>

        <p>
          Diferencia de goles:
          <strong>{equipo.goalDiff}</strong>
        </p>

        <p>
          Puntos:
          <strong>{equipo.points}</strong>
        </p>
      </div>
    </section>
  );
}

export default Detalle;
