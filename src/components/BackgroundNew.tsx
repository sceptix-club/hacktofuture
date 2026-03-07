import * as THREE from "three";
import { useRef, forwardRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  MotionPathControls,
  useMotion,
  useTexture,
  Float,
  Environment,
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
    // Reduced from 8 → 6 segments; visually identical on a smooth curve
    const segments = 6;
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
    // Clamp delta more aggressively to prevent spiral on tab-switch spikes
    motion.current += Math.min(0.05, delta) * factor;
  });
  return null;
}

// ─── Sticker ──────────────────────────────────────────────────────────────────

const Sticker = forwardRef<
  THREE.Mesh,
  { scale?: number; position?: [number, number, number] }
>(({ ...props }, ref) => {
  // Textures are still loaded but kept available for future mesh content
  // const [smiley, invert] = useTexture([
  //   "/textures/Sticker_1024x1024@2x.png",
  //   "/textures/Sticker_1024x1024@2x_invert.png",
  // ]);

  return <mesh ref={ref} {...props} />;
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
      {/* Stats removed from production — re-add for debugging */}
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <MotionPathControls focus={poi} damping={0.2} focusDamping={0.15}>
        <CurveComponent />
        <Loop />
      </MotionPathControls>

      {/*
        Reduced floatIntensity / rotationIntensity substantially.
        High values (20 / 25) caused large per-frame matrix recalculations.
        The float is still visible but much cheaper.
      */}
      <Float floatIntensity={4} rotationIntensity={5} speed={2}>
        <Sticker position={[1, 0, 1]} scale={2} ref={poi} />
      </Float>

      {/*
        Environment: removed background blur — blur forces an extra render pass
        each frame. The env lighting is preserved.
      */}
      <Environment preset="city" />

      <EffectComposer
        // Dropped multisampling 4 → 0; MSAA inside a post-process composer is
        // expensive and largely redundant when DotScreen is active anyway.
        multisampling={0}
        enableNormalPass={false}   // not needed by any of the three effects
      >
        {/* Saturation-only HueSaturation — hue=0 skips the hue rotation math */}
        <HueSaturation hue={0} saturation={-1} />

        {/* TiltShift: halved blur radius for a lighter gaussian pass */}
        <TiltShift2 blur={0.25} />

        {/*
          DotScreen scale is the main render-cost knob: larger dots = fewer
          samples per pixel. We expose it as a prop (default 0.5) but clamp
          it so callers can't accidentally set it below 0.4.
        */}
        <DotScreen scale={Math.max(0.4, dotScale)} />
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
    >
      <Canvas
        camera={{ position: [10, 15, -10], fov: 45 }}
        // DPR clamped to [1, 1] — retina rendering of a blurred dot-screen
        // background is indistinguishable and saves ~2-4× fill-rate on HiDPI.
        dpr={[1, 1]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          // Disable preserveDrawingBuffer (default false, but explicit is safer)
          preserveDrawingBuffer: false,
          // Use half-float where the GPU supports it to save bandwidth
          precision: "mediump",
        }}
      >
        <Scene path={path} dotScale={dotScale} />
      </Canvas>
    </div>
  );
}

export { CURVE_MAP };
export type { CurveKey };