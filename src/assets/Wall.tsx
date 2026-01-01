import { useMemo } from "react"
import * as THREE from "three"

type WallProps = {
  size: number
}

export function Wall({ size }: WallProps) {

  const positions = [
    new THREE.Vector3(0, 0, -40),
    new THREE.Vector3(1, 0, -40),
    new THREE.Vector3(-1, 0, -40),
  ]

  const wallSize = (size < 6) ? { x: 10, y: 35 } : { x: 25, y: 35 };
  const geometry = useMemo(() => new THREE.PlaneGeometry(wallSize.x, wallSize.y), []);
  const defaultMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x888888 }), []);

  return (
    <>
      {
        positions.map((pos, i) => (
          <mesh
            key={i}
            geometry={geometry}
            position={[pos.x * wallSize.x, pos.y, pos.z]}
          >
            <meshStandardMaterial color={`hsl(${i * 40}, 70%, 50%)`} />
          </mesh>
        ))
      }
    </>
  );
}

export default Wall
