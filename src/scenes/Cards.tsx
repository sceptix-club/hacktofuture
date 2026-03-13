import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type CardsProps = {
  pointerRef: React.RefObject<THREE.PointLight | null>;
  groupRef?: React.RefObject<THREE.Group | null>;
};

const CARD_THEMES = ["cloud", "devops", "open", "security"] as const;

export default function Cards({ pointerRef, groupRef }: CardsProps) {
  const texLoader = useMemo(() => new THREE.TextureLoader(), []);
  const cardsRef = useRef<THREE.Mesh[]>([]);

  const allMaps = useMemo(() => {
    return CARD_THEMES.map((theme) => {
      const color = texLoader.load(`/textures/${theme}/${theme}_diffuse.webp`);
      color.colorSpace = THREE.SRGBColorSpace;
      const normal = texLoader.load(`/textures/${theme}/${theme}_normal_map.webp`);
      const spec = texLoader.load(`/textures/${theme}/${theme}_specular.webp`);
      return { color, normal, spec };
    });
  }, [texLoader]);

  useEffect(() => {
    cardsRef.current = [];
  }, []);

  useEffect(() => {
    for (const card of cardsRef.current) {
      if (!card) continue;
      const geo = card.geometry;
      geo.setAttribute(
        "uv2",
        new THREE.BufferAttribute(geo.attributes.uv.array, 2)
      );
    }
  }, []);

  useFrame((_, dt) => {
    if (!pointerRef.current || !cardsRef.current || cardsRef.current.length === 0)
      return;

    const pointerPos = pointerRef.current.position;
    for (const card of cardsRef.current) {
      const worldPos = new THREE.Vector3();
      card.getWorldPosition(worldPos);
      const dir = pointerPos.clone().sub(worldPos);
      const targetRotX = -dir.y * 0.03;
      const targetRotY = dir.x * 0.03;
      card.rotation.x = THREE.MathUtils.lerp(card.rotation.x, targetRotX, 2 * dt);
      card.rotation.y = THREE.MathUtils.lerp(card.rotation.y, targetRotY, 2 * dt);
    }
  });

  const radius = 10;

  const cardConfigs = [
    { position: [0, radius, 0] as [number, number, number], rotation: [0, 0, 0] as [number, number, number] },           // Top
    { position: [-radius, 0, 0] as [number, number, number], rotation: [0, 0, Math.PI / 2] as [number, number, number] }, // Left
    { position: [radius, 0, 0] as [number, number, number], rotation: [0, 0, -Math.PI / 2] as [number, number, number] }, // Right
    { position: [0, -radius, 0] as [number, number, number], rotation: [0, 0, Math.PI] as [number, number, number] },     // Bottom
  ];

  return (
    <group ref={groupRef} position={[0, -124, 0]}>
      {cardConfigs.map((config, i) => {
        const maps = allMaps[i];
        return (
          <mesh
            key={CARD_THEMES[i]}
            ref={(m) => { if (m) cardsRef.current[i] = m; }}
            position={config.position}
            rotation={config.rotation}
          >
            <planeGeometry args={[3, 4, 64, 64]} />
            <meshStandardMaterial
              map={maps.color}
              normalMap={maps.normal}
              metalnessMap={maps.spec}
              roughness={0.6}
              metalness={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
}
