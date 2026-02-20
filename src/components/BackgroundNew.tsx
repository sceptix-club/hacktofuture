import * as THREE from "three";
import { useRef, forwardRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  MotionPathControls,
  useMotion,
  useTexture,
  MeshWobbleMaterial,
  Float,
  Environment,
  Stats,
} from "@react-three/drei";
import {
  EffectComposer,
  TiltShift2,
  HueSaturation,
  DotScreen,
} from "@react-three/postprocessing";

// ─── Curves ───────────────────────────────────────────────────────────────────

const Heart = () => {
  const controlPoints1 = useMemo(
    () =>
      [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1, 1, 0),
        new THREE.Vector3(1, 3, 0),
        new THREE.Vector3(0, 2, 0),
      ].map((p) => p.multiplyScalar(2)),
    []
  );
  const controlPoints2 = useMemo(
    () => controlPoints1.map((p) => new THREE.Vector3(-p.x, p.y, p.z)),
    [controlPoints1]
  );

  return (
    <>
      {[controlPoints1, controlPoints2].map(([v0, v1, v2, v3], i) => (
        <cubicBezierCurve3 key={i} v0={v0} v1={v1} v2={v2} v3={v3} />
      ))}
    </>
  );
};

const Circle = ({
  centerX = 0,
  centerY = 0,
  radius = 5,
}: {
  centerX?: number;
  centerY?: number;
  radius?: number;
}) => {
  const segments = useMemo(
    () => [
      [
        new THREE.Vector3(centerX + radius, centerY, 0),
        new THREE.Vector3(centerX + radius, centerY, radius),
        new THREE.Vector3(centerX - radius, centerY, radius),
        new THREE.Vector3(centerX - radius, centerY, 0),
      ],
      [
        new THREE.Vector3(centerX - radius, centerY, 0),
        new THREE.Vector3(centerX - radius, centerY, -radius),
        new THREE.Vector3(centerX + radius, centerY, -radius),
        new THREE.Vector3(centerX + radius, centerY, 0),
      ],
    ],
    [centerX, centerY, radius]
  );

  return (
    <>
      {segments.map(([v0, v1, v2, v3], i) => (
        <cubicBezierCurve3 key={i} v0={v0} v1={v1} v2={v2} v3={v3} />
      ))}
    </>
  );
};

const Rollercoaster = () => {
  const segments = useMemo(
    () => [
      [
        new THREE.Vector3(-5, -5, 0),
        new THREE.Vector3(-10, 0, 0),
        new THREE.Vector3(0, 3, 0),
        new THREE.Vector3(6, 3, 0),
      ],
      [
        new THREE.Vector3(6, 3, 0),
        new THREE.Vector3(10, 5, 5),
        new THREE.Vector3(5, 3, 5),
        new THREE.Vector3(5, 5, 5),
      ],
    ],
    []
  );

  return (
    <>
      {segments.map(([v0, v1, v2, v3], i) => (
        <cubicBezierCurve3 key={i} v0={v0} v1={v1} v2={v2} v3={v3} />
      ))}
    </>
  );
};

const InfinityCurve = () => {
  const curves = useMemo(() => {
    const centerX = 0;
    const centerY = 0;
    const radius = 5;
    const segments = 8;
    const amplitude = 5;
    const result: THREE.Vector3[][] = [];

    for (let i = 0; i < segments; i++) {
      const startAngle = (i / segments) * Math.PI * 2;
      const endAngle = ((i + 1) / segments) * Math.PI * 2;
      const startPoint = new THREE.Vector3(
        centerX + radius * Math.cos(startAngle),
        centerY + amplitude * Math.sin(2 * startAngle),
        radius * Math.sin(startAngle)
      );
      const endPoint = new THREE.Vector3(
        centerX + radius * Math.cos(endAngle),
        centerY + amplitude * Math.sin(2 * endAngle),
        radius * Math.sin(endAngle)
      );
      const cp1 = new THREE.Vector3(
        centerX + radius * Math.cos(startAngle + Math.PI / (2 * segments)),
        centerY +
          amplitude * Math.sin(2 * (startAngle + Math.PI / (2 * segments))),
        radius * Math.sin(startAngle + Math.PI / (2 * segments))
      );
      const cp2 = new THREE.Vector3(
        centerX + radius * Math.cos(endAngle - Math.PI / (2 * segments)),
        centerY +
          amplitude * Math.sin(2 * (endAngle - Math.PI / (2 * segments))),
        radius * Math.sin(endAngle - Math.PI / (2 * segments))
      );
      result.push([startPoint, cp1, cp2, endPoint]);
    }
    return result;
  }, []);

  return (
    <>
      {curves.map(([v0, v1, v2, v3], i) => (
        <cubicBezierCurve3 key={i} v0={v0} v1={v1} v2={v2} v3={v3} />
      ))}
    </>
  );
};

const CURVE_MAP = {
  Circle,
  Rollercoaster,
  Infinity: InfinityCurve,
  Heart,
} as const;

type CurveKey = keyof typeof CURVE_MAP;

// ─── Loop ─────────────────────────────────────────────────────────────────────

function Loop({ factor = 0.2 }: { factor?: number }) {
  const motion = useMotion();
  useFrame((_, delta) => {
    motion.current += Math.min(0.1, delta) * factor;
  });
  return null;
}

// ─── Sticker ──────────────────────────────────────────────────────────────────

const Sticker = forwardRef<
  THREE.Mesh,
  { scale?: number; position?: [number, number, number] }
>(({ ...props }, ref) => {
  const [smiley, invert] = useTexture([
    "/textures/Sticker_1024x1024@2x.png",
    "/textures/Sticker_1024x1024@2x_invert.png",
  ]);

  return (
  // <mesh ref={ref} {...props}>
  //     <planeGeometry args={[1, 1, 32, 32]} />
  //     <MeshWobbleMaterial
  //       factor={4}
  //       speed={2}
  //       depthTest={false}
  //       transparent
  //       map={smiley}
  //       map-flipY={false}
  //       roughness={1}
  //       roughnessMap={invert}
  //       roughnessMap-flipY={false}
  //       map-anisotropy={16}
  //       metalness={0.8}
  //       side={THREE.DoubleSide}
  //     />
    //   </mesh>
    <></>
  );
});
Sticker.displayName = "Sticker";

// ─── Scene ────────────────────────────────────────────────────────────────────

function Scene({
  path = "Circle",
  dotScale = 0.5,
}: {
  path?: CurveKey;
  dotScale?: number;
}) {
  const poi = useRef<THREE.Mesh>(null!);
  const CurveComponent = CURVE_MAP[path];

  return (
    <>
      <Stats />
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <MotionPathControls focus={poi} damping={0.2} focusDamping={0.15}>
        <CurveComponent />
        <Loop />
      </MotionPathControls>

      <Float floatIntensity={20} rotationIntensity={25} speed={4}>
        <Sticker position={[1, 0, 1]} scale={2} ref={poi} />
      </Float>

      <Environment preset="city" background blur={0.5} />
      {/* 
      <Clouds>
        <Cloud
          concentrate="outside"
          seed={1}
          segments={100}
          bounds={20}
          volume={20}
          growth={10}
          opacity={0.15}
          position={[0, 0, -10]}
          speed={1}
        />
      </Clouds> */}

      <EffectComposer enableNormalPass multisampling={4}>
        <HueSaturation saturation={-1} />
        <TiltShift2 blur={0.5} />
        <DotScreen scale={dotScale} />
      </EffectComposer>
    </>
  );
}

// ─── BackgroundNew ────────────────────────────────────────────────────────────

interface BackgroundNewProps {
  path?: CurveKey;
  dotScale?: number;
  className?: string;
}

export default function BackgroundNew({
  path = "Circle",
  dotScale = 0.5,
  className,
}: BackgroundNewProps) {
  return (
    <div
      className={`w-full h-full pointer-events-none ${className ?? ""}`}
      // removed "absolute inset-0" — let the parent control positioning
    >
      <Canvas
        camera={{ position: [10, 15, -10], fov: 45 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <Scene path={path} dotScale={dotScale} />
      </Canvas>
    </div>
  );
}

export { CURVE_MAP };
export type { CurveKey };
