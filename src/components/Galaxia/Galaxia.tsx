import React, { useEffect, useState } from 'react';
import styles from './Galaxia.module.css';

const Galaxia = () => {
  const [dots, setDots] = useState([]);

  // Crear puntos aleatorios
  useEffect(() => {
    const generateDots = () => {
      const numDots = 100; // Número de puntos
      const dotsArray = [];
      for (let i = 0; i < numDots; i++) {
        dotsArray.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 1, // Tamaño aleatorio de los puntos
          animationDelay: Math.random() * 3, // Retardo aleatorio para animación
        });
      }
      setDots(dotsArray);
    };

    generateDots();
    // Regenerar puntos cuando la ventana cambie de tamaño
    window.addEventListener('resize', generateDots);
    return () => {
      window.removeEventListener('resize', generateDots);
    };
  }, []);

  return (
    <div className={styles.container}>
      {dots.map((dot) => (
        <div
          key={dot.id}
          className={styles.dot}
          style={{
            left: `${dot.x}px`,
            top: `${dot.y}px`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            animationDelay: `${dot.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Galaxia;
