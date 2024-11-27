import React, { useState, useEffect } from 'react';
import styles from './Red.module.css';
import { Link } from 'react-router-dom';

const nodes = [
  { id: 1, label: 'MUSICA' },
  { id: 2, label: 'TECNOLOGIA' },
  { id: 3, label: 'DISEÑO' },
  { id: 4, label: 'ILUSTRACION' },
  { id: 5, label: 'CINE' },
  { id: 6, label: 'VIDEO' },
  { id: 7, label: 'VJ' },
  { id: 8, label: 'DISEÑO WEB' },
];

const Red = () => {
  const [positions, setPositions] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false); // Estado para controlar el hover

  // Generar posiciones aleatorias para los nodos inicialmente
  useEffect(() => {
    const initialPositions = nodes.map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setPositions(initialPositions);
  }, []);

  // Manejar el movimiento del mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Función para mover los nodos cercanos al mouse
  const moveNodes = () => {
    const newPositions = positions.map((pos) => {
      const distance = Math.sqrt(
        Math.pow(mousePos.x - pos.x, 2) + Math.pow(mousePos.y - pos.y, 2)
      );
      const proximity = Math.min(1, Math.max(0, 100 / distance)); // Controlar la proximidad

      // Si está cerca del mouse, acercar el nodo hacia el mouse
      const moveFactor = proximity * 30; // Cuánto se mueve
      const angle = Math.atan2(mousePos.y - pos.y, mousePos.x - pos.x);

      return {
        x: pos.x + moveFactor * Math.cos(angle),
        y: pos.y + moveFactor * Math.sin(angle),
      };
    });
    setPositions(newPositions);
  };

  // Llamar a moveNodes cada frame
  useEffect(() => {
    const interval = setInterval(() => {
      moveNodes();
    }, 16); // 60fps
    return () => clearInterval(interval);
  }, [positions, mousePos]);

  return (
    <div className={styles.container}>
      <Link to="/crear" className={styles.link}>
        <div className={styles.whiteLayer}></div>

        {/* Mostrar el texto "Lidiador" cuando se haga hover */}
        {hover && (
          <div className={styles.lidiadorText}>LIDIADOR</div>
        )}

        {positions.map((pos, index) => (
          <div
            key={nodes[index].id}
            className={styles.node}
            style={{
              left: pos.x,
              top: pos.y,
              transform: 'translate(-50%, -50%)',
            }}
            onMouseEnter={() => setHover(true)} // Activar hover
            onMouseLeave={() => setHover(false)} // Desactivar hover
          >
            <button
              className={styles.button}
              onClick={() => alert(`Acción para ${nodes[index].label}`)}
            >
              {nodes[index].label}
            </button>
          </div>
        ))}

        {/* Dibujar líneas entre los nodos de manera más fluida */}
        {positions.map((pos1, i) =>
          positions.slice(i + 1).map((pos2, j) => (
            <svg key={`line-${i}-${i + j + 1}`} className={styles.line}>
              <path
                d={`M${pos1.x} ${pos1.y} Q${(pos1.x + pos2.x) / 2} ${(pos1.y + pos2.y) / 2} ${pos2.x} ${pos2.y}`}
                stroke="white"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          ))
        )}
      </Link>
    </div>
  );
};

export default Red;
