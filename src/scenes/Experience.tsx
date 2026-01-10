import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/Addons.js';
import Wall from '../assets/Wall';
import { TV } from '../assets/TV';

const Experience = () => {
  const scroll = useScroll();
  const { camera, viewport } = useThree();
  const SCENES = 3;

  const font = useLoader(
    FontLoader,
    "fonts/DelaGothicOne_Regular.typeface.json"
  );

  const currentSceneRef = useRef<number>(0);

  const tvRef = useRef<THREE.Group>(null);
  const [oPos, setOPos] = useState<THREE.Vector3 | null>(null);
  const cameraStart = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 20));

  const sphereRef = useRef<THREE.Mesh>(null);
  const scene2Curve = useRef(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(10, 8, 18),
      new THREE.Vector3(8, 10, 12),
      new THREE.Vector3(4, 4, 8),
      new THREE.Vector3(2, 1, 4)
    )
  );

  const torusRef = useRef<THREE.Mesh>(null);

  const { textGeometry, calculatedOPos } = useMemo(() => {
    const size = viewport.width < 6 ? 0.2 : 0.5;
    const title = "HACKTOFUTURE";
    const shapes = font.generateShapes(title, size);
    const geometry = new THREE.ShapeGeometry(shapes);
    geometry.computeBoundingBox();

    const xMid = -0.5 * (geometry.boundingBox!.max.x - geometry.boundingBox!.min.x);
    geometry.translate(xMid, 0, 0);

    let oPos: THREE.Vector3 | null = null;
    const oShape = shapes[5];
    if (oShape) {
      const oGeometry = new THREE.ShapeGeometry(oShape);
      oGeometry.computeBoundingBox();
      const b = oGeometry.boundingBox!;
      const center = new THREE.Vector3(
        (b.min.x + b.max.x) * 0.5,
        (b.min.y + b.max.y) * 0.5,
        0
      );
      center.x += xMid;
      oPos = center;
    }

    return { textGeometry: geometry, calculatedOPos: oPos };
  }, [font, viewport.width]);

  useEffect(() => {
    if (calculatedOPos) {
      setOPos(calculatedOPos.clone());
    }
  }, [calculatedOPos]);

  useFrame((state) => {
    const time = scroll.offset * SCENES;
    const current = Math.min(Math.floor(time), SCENES - 1);
    const progress = time % 1;

    currentSceneRef.current = current;

    switch (current) {
      case 0:
        // Scene1: Camera zoom into "O" with rotation
        if (tvRef.current && oPos && camera) {
          const target = oPos.clone();
          target.z += 6;
          camera.position.lerpVectors(cameraStart.current, target, progress);
          camera.lookAt(oPos);
          camera.rotation.z = THREE.MathUtils.lerp(0, Math.PI / 6, progress);

          const base = viewport.width < 10 ? 0.6 : 1.0;
          const scale = THREE.MathUtils.lerp(1, 3 * base, progress);
          tvRef.current.scale.setScalar(scale);
          tvRef.current.rotation.y = progress * Math.PI * 2;
        }
        break;

      case 1:
        const position = scene2Curve.current.getPoint(progress);
        camera.position.set(position.x, position.y - 30, position.z);
        camera.lookAt(0, -30, 0);

        if (sphereRef.current) {
          const et = state.clock.elapsedTime;
          sphereRef.current.position.y = Math.sin(et * 0.5) * 0.5;
          sphereRef.current.rotation.x += 0.01;
          sphereRef.current.rotation.y += 0.015;

          const scale = THREE.MathUtils.lerp(1, 2, Math.sin(progress * Math.PI));
          sphereRef.current.scale.setScalar(scale);
        }
        break;

      case 2:
        const radius = 5;
        const angle = progress * Math.PI * 2;
        camera.position.x = Math.sin(angle) * radius;
        camera.position.y = -60 + Math.cos(angle * 0.5) * 2;
        camera.position.z = Math.cos(angle) * radius;
        camera.lookAt(0, -60, 0);

        if (torusRef.current) {
          const et = state.clock.elapsedTime;
          const pulsate = 1 + Math.sin(et * 2) * 0.1;
          torusRef.current.scale.setScalar(pulsate);
        }
        break;
    }
  });

  const textScale = viewport.width < 10 ? 0.7 : 0.9;

  return (
    <>
      <Wall size={viewport.width} />
      <group ref={tvRef}>
        <TV position={[0, 0, 0]} size={viewport.width} />
      </group>
      <group scale={textScale}>
        <mesh position={[0, 0, 10]}>
          <primitive object={textGeometry} attach="geometry" />
          <meshBasicMaterial color={0xf0f0f0} />
        </mesh>
      </group>

      <group position={[0, -30, 0]}>
        <mesh ref={sphereRef} position={[0, 0, 0]}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial
            color="#4a90e2"
            metalness={0.7}
            roughness={0.2}
            envMapIntensity={1}
          />
        </mesh>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />
      </group>

      <group position={[0, -60, 0]}>
        <mesh ref={torusRef} position={[0, 0, 0]}>
          <torusGeometry args={[2, 0.6, 32, 100]} />
          <meshStandardMaterial
            color="#50c878"
            metalness={0.8}
            roughness={0.3}
            envMapIntensity={1}
          />
        </mesh>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-5, -5, 5]} intensity={0.8} color="#ffd700" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />
      </group>
    </>
  );
};

export default Experience;
