import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3D = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, mountRef.current.clientWidth / 360, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(mountRef.current.clientWidth, 360);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(1.5, 0.35, window.innerWidth < 768 ? 120 : 220, 24);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6,
      transmission: 0.9,
      roughness: 0.2,
      metalness: 0.2,
      transparent: true,
      opacity: 0.8,
    });

    const mesh = new THREE.Mesh(geometry, material);
    const light = new THREE.PointLight(0xffffff, 20, 50);
    light.position.set(4, 5, 8);
    scene.add(mesh, light);

    let raf = 0;
    let running = true;

    const render = () => {
      if (!running) return;
      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.002;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) render();
      else cancelAnimationFrame(raf);
    };

    const onResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / 360;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, 360);
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', onResize);
    render();

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      mountRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="pointer-events-none h-[360px] w-full" />;
};
