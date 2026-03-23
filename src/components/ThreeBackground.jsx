import { useEffect, useRef, useState } from "react";

const shouldEnable3D = () => {
  if (typeof window === "undefined") return false;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return false;
  if (window.innerWidth < 900) return false;
  return true;
};

export default function ThreeBackground() {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(shouldEnable3D());
  }, []);

  useEffect(() => {
    if (!active || !mountRef.current) return undefined;

    let renderer;
    let scene;
    let camera;
    let frameId;
    let resizeTimeout;
    let points;
    let geometry;
    let material;
    let unmounted = false;

    const init = async () => {
      const THREE = await import("three");
      if (unmounted || !mountRef.current) return;

      const { clientWidth, clientHeight } = mountRef.current;
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(55, clientWidth / clientHeight, 0.1, 1000);
      camera.position.z = 22;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      renderer.setSize(clientWidth, clientHeight);
      mountRef.current.appendChild(renderer.domElement);

      geometry = new THREE.BufferGeometry();
      const count = 900;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i += 1) {
        positions[i * 3] = (Math.random() - 0.5) * 62;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 34;
      }
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      material = new THREE.PointsMaterial({
        color: "#7cd4ff",
        size: 0.14,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      points = new THREE.Points(geometry, material);
      scene.add(points);

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        points.rotation.y += 0.0008;
        points.rotation.x += 0.0003;
        camera.position.x += (mouseRef.current.x * 1.4 - camera.position.x) * 0.03;
        camera.position.y += (mouseRef.current.y * 1.2 - camera.position.y) * 0.03;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
      };
      animate();
    };

    init();

    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!mountRef.current || !renderer || !camera) return;
        const { clientWidth, clientHeight } = mountRef.current;
        renderer.setSize(clientWidth, clientHeight);
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
      }, 120);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      unmounted = true;
      cancelAnimationFrame(frameId);
      clearTimeout(resizeTimeout);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && mountRef.current?.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
    };
  }, [active]);

  if (!active) return null;

  return <div className="bg-three" ref={mountRef} aria-hidden="true" />;
}
