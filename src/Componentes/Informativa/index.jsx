import './style.css';

function Informativa() {
  return (
    <section className="informativa">
      <h1>Acerca de Bundesliga App</h1>

      <div className="informativa-caja">
        <h2>Bundesliga 2025/26</h2>

        <p>
          Aplicación para consultar la clasificación
          de los equipos de la liga alemana.
        </p>

        <p>
          Los datos se consultan desde la API pública
          OpenLigaDB.
        </p>
      </div>

      <div className="informativa-caja">
        <h2>Funciones</h2>

        <p>
          Consulta equipos, busca por nombre,
          filtra por posición y revisa estadísticas.
        </p>

        <p>
          También puedes guardar favoritos
          y utilizar el diagnóstico de rendimiento.
        </p>
      </div>

      <div className="informativa-caja">
        <h2>Fuente de información</h2>

        <p>OpenLigaDB · Bundesliga 2025/26</p>

        <a
          href="https://www.openligadb.de/"
          target="_blank"
          rel="noreferrer"
        >
          Visitar OpenLigaDB
        </a>
      </div>
    </section>
  );
}

export default Informativa;
