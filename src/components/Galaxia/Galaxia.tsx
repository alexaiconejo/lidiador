import { useEffect, useState } from 'react';
import styles from './Galaxia.module.css';

interface Dot {
  id: number;
  x: number;
  y: number;
  size: number;
  animationDelay: number;
}

const Galaxia = () => {
  const [dots, setDots] = useState<Dot[]>([]); // <-- tipo explícito Dot[]

  useEffect(() => {
    const generateDots = () => {
      const numDots = 100;
      const dotsArray: Dot[] = [];

      for (let i = 0; i < numDots; i++) {
        dotsArray.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 1,
          animationDelay: Math.random() * 3,
        });
      }

      setDots(dotsArray);
    };

    generateDots();
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
