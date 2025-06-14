import React, { useState, useEffect } from 'react';
import styles from './Red.module.css';
import { Link } from 'react-router-dom';

interface Node {
  id: number;
  label: string;
}

interface Position {
  x: number;
  y: number;
}

const nodes: Node[] = [
  { id: 1, label: 'MUSICA' },
  { id: 2, label: 'TECNOLOGIA' },
  { id: 3, label: 'DISEÑO' },
  { id: 4, label: 'ILUSTRACION' },
  { id: 5, label: 'CINE' },
  { id: 6, label: 'VIDEO' },
  { id: 7, label: 'VJ' },
  { id: 8, label: 'DISEÑO WEB' },
];

const Red: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const initialPositions: Position[] = nodes.map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setPositions(initialPositions);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const moveNodes = () => {
    const newPositions = positions.map((pos) => {
      const distance = Math.sqrt(
        Math.pow(mousePos.x - pos.x, 2) + Math.pow(mousePos.y - pos.y, 2)
      );
      const proximity = Math.min(1, Math.max(0, 100 / distance));

      const moveFactor = proximity * 30;
      const angle = Math.atan2(mousePos.y - pos.y, mousePos.x - pos.x);

      return {
        x: pos.x + moveFactor * Math.cos(angle),
        y: pos.y + moveFactor * Math.sin(angle),
      };
    });

    setPositions(newPositions);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moveNodes();
    }, 16);

    return () => clearInterval(interval);
  }, [positions, mousePos]);

  return (
    <div className={styles.container}>
      <Link to="/crear" className={styles.link}>
        <div className={styles.whiteLayer}></div>

        {hover && <div className={styles.lidiadorText}>LIDIADOR</div>}

        {positions.map((pos, index) => (
          <div
            key={nodes[index].id}
            className={styles.node}
            style={{
              left: pos.x,
              top: pos.y,
              transform: 'translate(-50%, -50%)',
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <button
              className={styles.button}
              onClick={() => alert(`Acción para ${nodes[index].label}`)}
            >
              {nodes[index].label}
            </button>
          </div>
        ))}

        {positions.map((pos1, i) =>
          positions.slice(i + 1).map((pos2, j) => (
            <svg key={`line-${i}-${i + j + 1}`} className={styles.line}>
              <path
                d={`M${pos1.x} ${pos1.y} Q${(pos1.x + pos2.x) / 2} ${
                  (pos1.y + pos2.y) / 2
                } ${pos2.x} ${pos2.y}`}
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
