import { useEffect, useState } from 'react';

import Inicio from './Componentes/Inicio';
import Menu from './Componentes/Menu';
import Detalle from './Componentes/Detalle';
import Favoritos from './Componentes/Favoritos';
import Diagnostico from './Componentes/Diagnostico';
import Informativa from './Componentes/Informativa';
import Usuario from './Componentes/Usuario';

import { EquiposContext } from './Contexto/EquiposContext';

import './App.css';

function App() {
  const [pestana, setPestana] = useState('Inicio');
  const [detalle, setDetalle] = useState(null);

  const [equipos, setEquipos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Recuperar favoritos guardados
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const datos = JSON.parse(
        localStorage.getItem('favoritosBundesliga') || '[]'
      );

      return Array.isArray(datos) ? datos : [];
    } catch {
      return [];
    }
  });

  // Consultar API de la Bundesliga
  useEffect(() => {
    fetch('https://api.openligadb.de/getbltable/bl1/2025')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudo consultar OpenLigaDB');
        }

        return respuesta.json();
      })
      .then((datos) => {
        if (!Array.isArray(datos)) {
          throw new Error('Formato de datos incorrecto');
        }

        setEquipos(datos);
      })
      .catch((problema) => {
        setError(problema.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  // Conservar los favoritos
  useEffect(() => {
    localStorage.setItem(
      'favoritosBundesliga',
      JSON.stringify(favoritos)
    );
  }, [favoritos]);

  // Agregar o quitar favoritos
  function cambiarFavorito(id) {
    setFavoritos((actuales) =>
      actuales.includes(id)
        ? actuales.filter((equipoId) => equipoId !== id)
        : [...actuales, id]
    );
  }

  // Navegar entre pestañas
  function navegar(nombre) {
    setPestana(nombre);
    setDetalle(null);
  }

  // Obtener la posición del equipo seleccionado
  const posicion = detalle
    ? equipos.findIndex(
        (equipo) => equipo.teamInfoId === detalle.teamInfoId
      ) + 1
    : 0;

  return (
    <EquiposContext.Provider
      value={{
        equipos,
        cargando,
        error,
        favoritos,
        cambiarFavorito
      }}
    >
      <div className="contenedor">
        {detalle ? (
          <Detalle
            equipo={detalle}
            posicion={posicion}
          />
        ) : (
          <>
            {pestana === 'Inicio' && (
              <Inicio seleccionarEquipo={setDetalle} />
            )}

            {pestana === 'Favoritos' && (
              <Favoritos seleccionarEquipo={setDetalle} />
            )}

            {pestana === 'Diagnóstico' && (
              <Diagnostico />
            )}

            {pestana === 'Informativa' && (
              <Informativa />
            )}

            {pestana === 'Usuario' && (
              <Usuario />
            )}
          </>
        )}
      </div>

      <Menu
        pestana={pestana}
        cambiarPestana={navegar}
      />
    </EquiposContext.Provider>
  );
}

export default App;
