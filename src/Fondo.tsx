import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Fondo = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight.position.set(-10, 10, 10);
    scene.add(directionalLight);

    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      opacity: 0.7,
      transparent: true,
      shininess: 100,
    });

    const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const torus = new THREE.Mesh(torusGeometry, material);
    scene.add(torus);

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      map: new THREE.TextureLoader().load(
        'https://threejs.org/examples/textures/particle2.png'
      ),
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

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlesPositions, 3)
    );
    const particles = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particles);

    const glitchMaterial = new THREE.LineBasicMaterial({
      color: 0x222222,
      linewidth: 120,
    });

    const glitchGeometry = new THREE.BufferGeometry();
    const glitchVertices = [];
    for (let i = 0; i < 100; i++) {
      glitchVertices.push(
        Math.random() * 5 - 2.5,
        Math.random() * 5 - 2.5,
        Math.random() * 5 - 2.5
      );
    }

    glitchGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(glitchVertices, 3)
    );
    const glitchLine = new THREE.Line(glitchGeometry, glitchMaterial);
    scene.add(glitchLine);

    camera.position.z = 1;

    const animate = () => {
      requestAnimationFrame(animate);

      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;

      particles.rotation.x += 0.002;
      particles.rotation.y += 0.002;

      glitchGeometry.attributes.position.needsUpdate = true;

      // Leer posición del mouse desde el ref
      const x = (mousePositionRef.current.x / window.innerWidth) * 2 - 1;
      const y = -(mousePositionRef.current.y / window.innerHeight) * 2 + 1;

      torus.position.x = x;
      torus.position.y = y;

      particles.position.x = x;
      particles.position.y = y;

      glitchLine.position.x = x;
      glitchLine.position.y = y;

      renderer.render(scene, camera);
    };

    animate();

    const handleMouseMove = (event: MouseEvent) => {
      mousePositionRef.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement?.parentNode?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []); // <-- Importante: arreglo vacío para que se ejecute solo una vez

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default Fondo;
