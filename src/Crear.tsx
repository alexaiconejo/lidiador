import React, { useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import * as THREE from 'three';
import styles from './Crear.module.css';

const Crear = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Configuración de Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Adjuntar el renderizador al elemento DOM
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    
    // Crear luz direccional desde el costado
    const directionalLight = new THREE.DirectionalLight(0xffffff, 10); // Luz blanca
    directionalLight.position.set(-10, 10, 10); // Posición desde donde viene la luz

    // Agregar la luz a la escena
    scene.add(directionalLight);
    
// Crea un material con color rosa y semitransparente
const material = new THREE.MeshPhongMaterial({
    color: 0xfff9f4, // Hexadecimal para rosa
    opacity: 0.5,    // 50% de transparencia
    transparent: true,
    shininess: 100,  // Brillo
  });

    // Crear un objeto simple para la escena
    const geometry = new THREE.DodecahedronGeometry(1);
    const diamond = new THREE.Mesh(geometry, material);

    // Añadir el objeto a la escena
    scene.add(diamond);

    // Posicionar la cámara
    camera.position.z = 2;

    // Función de animación
    const animate = () => {
      requestAnimationFrame(animate);
      diamond.rotation.x += 0.002;
      diamond.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    // Iniciar animación
    animate();

    // Limpieza cuando el componente se desmonta
    return () => {
      renderer.domElement?.parentNode?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className={styles.crear}>
      <Link to='/'>
        <h4>Volver</h4>
      </Link>

      <h2 className={styles.title}>Modo Crear</h2>
      <div className={styles.three} ref={mountRef} />
    </div>
  );
};

export default Crear;
