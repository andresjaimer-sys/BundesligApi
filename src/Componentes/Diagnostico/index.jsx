
import { useContext, useState } from 'react';
import { EquiposContext } from '../../Contexto/EquiposContext';
import './style.css';

function Diagnostico() {
  const { equipos, cargando, error } =
    useContext(EquiposContext);

  const [equipoId, setEquipoId] = useState('');

  const equipo = equipos.find(
    (item) => String(item.teamInfoId) === equipoId
  ) || equipos[0];

  if (cargando) {
    return <p>Cargando equipos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!equipo) {
    return <p>No hay equipos disponibles.</p>;
  }

  const partidos = equipo.matches;

  const victorias = partidos > 0
    ? (equipo.won / partidos) * 100
    : 0;

  const goles = partidos > 0
    ? equipo.goals / partidos
    : 0;

  const efectividad = partidos > 0
    ? (equipo.points / (partidos * 3)) * 100
    : 0;

  let resultado = 'Rendimiento bajo';

  if (partidos === 0) {
    resultado = 'Sin partidos suficientes';
  } else if (efectividad >= 70) {
    resultado = 'Rendimiento alto';
  } else if (efectividad >= 40) {
    resultado = 'Rendimiento medio';
  }

  return (
    <section className="diagnostico">
      <h1>Diagnóstico de rendimiento</h1>

      <p>
        Consulta las estadísticas de cualquier equipo.
      </p>

      <label htmlFor="diagnostico-equipo">
        Selecciona un equipo:
      </label>

      <select
        id="diagnostico-equipo"
        value={equipo.teamInfoId}
        onChange={(e) => setEquipoId(e.target.value)}
      >
        {equipos.map((item) => (
          <option
            key={item.teamInfoId}
            value={item.teamInfoId}
          >
            {item.teamName}
          </option>
        ))}
      </select>

      <div className="diagnostico-equipo">
        <img
          src={equipo.teamIconUrl}
          alt={equipo.teamName}
        />

        <h2>{equipo.teamName}</h2>

        <p>Partidos jugados: {partidos}</p>
      </div>

      <div className="diagnostico-estadisticas">
        <div>
          <h3>Victorias</h3>
          <p>{equipo.won}</p>
        </div>

        <div>
          <h3>Porcentaje de victorias</h3>
          <p>{victorias.toFixed(1)}%</p>
        </div>

        <div>
          <h3>Goles por partido</h3>
          <p>{goles.toFixed(2)}</p>
        </div>

        <div>
          <h3>Efectividad en puntos</h3>
          <p>{efectividad.toFixed(1)}%</p>
        </div>
      </div>

      <div className="diagnostico-resultado">
        <h2>{resultado}</h2>

        <p>
          Diagnóstico orientativo calculado con
          los puntos obtenidos respecto a los posibles.
        </p>
      </div>
    </section>
  );
}

export default Diagnostico;
