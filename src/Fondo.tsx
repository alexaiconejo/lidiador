import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Fondo = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

    // Luz direccional
    const directionalLight = new THREE.DirectionalLight(0xffffff, 10); // Luz blanca
    directionalLight.position.set(-10, 10, 10); // Posición de la luz
    scene.add(directionalLight);

    // Crear material para los objetos luminosos (galácticos)
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff, // Rosa
      opacity: 0.7,
      transparent: true,
      shininess: 100,
    });

    // Crear geometría para la dona
    const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const torus = new THREE.Mesh(torusGeometry, material);
    scene.add(torus);

    // Crear partículas luminosas (efecto galáctico)
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      map: new THREE.TextureLoader().load('https://threejs.org/examples/textures/particle2.png'),
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const particlesPositions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      particlesPositions[i * 3] = (Math.random() - 0.5) * 10;
      particlesPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      particlesPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
    const particles = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particles);

    // Crear efecto de glitch con líneas aleatorias y píxeles
    const glitchMaterial = new THREE.LineBasicMaterial({
      color: 0x222222,
      linewidth: 120,
    });

    // Usar BufferGeometry para crear líneas de glitch
    const glitchGeometry = new THREE.BufferGeometry();
    const glitchVertices = [];
    for (let i = 0; i < 100; i++) {
      glitchVertices.push(Math.random() * 5 - 2.5, Math.random() * 5 - 2.5, Math.random() * 5 - 2.5);
    }

    glitchGeometry.setAttribute('position', new THREE.Float32BufferAttribute(glitchVertices, 3));
    const glitchLine = new THREE.Line(glitchGeometry, glitchMaterial);
    scene.add(glitchLine);

    // Posicionar la cámara
    camera.position.z = 1;

    // Función de animación
    const animate = () => {
      requestAnimationFrame(animate);

      // Movimiento de la dona
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;

      // Movimiento de partículas (efecto galáctico)
      particles.rotation.x += 0.002;
      particles.rotation.y += 0.002;

      // Efecto de glitch (mover líneas de glitch)
      glitchGeometry.attributes.position.needsUpdate = true;

      // Desplazar objetos basados en la posición del mouse
      torus.position.x = (mousePosition.x / window.innerWidth) * 2 - 1;  // Normaliza la posición del ratón
      torus.position.y = -(mousePosition.y / window.innerHeight) * 2 + 1;

      particles.position.x = (mousePosition.x / window.innerWidth) * 2 - 1;
      particles.position.y = -(mousePosition.y / window.innerHeight) * 2 + 1;

      glitchLine.position.x = (mousePosition.x / window.innerWidth) * 2 - 1;
      glitchLine.position.y = -(mousePosition.y / window.innerHeight) * 2 + 1;

      // Renderizar la escena
      renderer.render(scene, camera);
    };

    // Iniciar animación
    animate();

    // Añadir evento de movimiento del mouse
    const handleMouseMove = (event: { clientX: any; clientY: any; }) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    // Escuchar el evento de movimiento del ratón
    window.addEventListener('mousemove', handleMouseMove);

    // Limpiar cuando el componente se desmonta
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement?.parentNode?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [mousePosition]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default Fondo;
