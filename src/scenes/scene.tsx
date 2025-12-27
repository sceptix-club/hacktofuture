import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react"
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TV } from "../assets/TV";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { useThree } from "@react-three/fiber";

gsap.registerPlugin(ScrollTrigger);

const HackToFuture = ({ onPositionReady, onViewportWidth }) => {
  const { scene } = useThree();
  const textGroupRef = useRef<THREE.Group | null>(null);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;

    const loader = new FontLoader();
    loader.load('fonts/DelaGothicOne_Regular.typeface.json', (font) => {
      const color = 0xf0f0f0;
      const matLight = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
      })
      const title = "HACKTOFUTURE";
      const size = onViewportWidth < 6 ? 0.2 : 0.5;
      const shapes = font.generateShapes(title, size);
      const geometry = new THREE.ShapeGeometry(shapes);
      geometry.computeBoundingBox();
      const xMid = -0.5 * (geometry.boundingBox!.max.x - geometry.boundingBox!.min.x);
      geometry.translate(xMid, 0, 0);

      const textGroup = new THREE.Group();
      textGroupRef.current = textGroup;

      const text = new THREE.Mesh(geometry, matLight);
      text.position.z = 10;
      textGroup.add(text);

      scene.add(textGroup);

      // Find the "O" position
      const oShape = shapes[5];
      if (oShape) {
        const geoO = new THREE.ShapeGeometry(oShape);
        geoO.computeBoundingBox();
        const oBounds = geoO.boundingBox;
        const oX = xMid + (oBounds!.min.x + oBounds!.max.x) / 2.1;
        const oY = (oBounds!.min.y + oBounds!.max.y) / 1.0;
        const oPosition = new THREE.Vector3(oX, oY, 0);
        onPositionReady?.(oPosition);
      }
    });

    return () => {
      if (textGroupRef.current) {
        scene.remove(textGroupRef.current);
        textGroupRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => mat.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }
    };
  }, [scene, onPositionReady]);

  return null;
}

const Scene = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const tvRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<any>(null);
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const longPressTimerRef = useRef<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [oPos, setOPos] = useState<THREE.Vector3 | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const { viewport } = useThree();
  const viewportWidthRef = useRef<number | null>(null);

  if (viewportWidthRef.current === null) {
    viewportWidthRef.current = viewport.width;
  }

  const vw = viewportWidthRef.current;

  useEffect(() => {
    if (!cameraRef.current || !tvRef.current || !oPos) return;

    if (controlsRef.current) {
      controlsRef.current.enabled = false;
    }

    if (isMobile) {
      // Mobile: Long press to trigger animation
      const handleTouchStart = () => {
        if (isAnimating) return;

        longPressTimerRef.current = window.setTimeout(() => {
          setIsAnimating(true);

          const tl = gsap.timeline({
            onComplete: () => setIsAnimating(false)
          });

          tl.to(cameraRef.current!.position, {
            z: 2,
            x: oPos.x,
            y: oPos.y,
            duration: 3,
            ease: "power2.inOut"
          }, 0);

          tl.to(cameraRef.current!.rotation, {
            z: Math.PI / 6,
            duration: 3,
            ease: "power2.inOut"
          }, 0);

          tl.to(tvRef.current!.rotation, {
            y: Math.PI * 2,
            duration: 3,
            ease: "power2.inOut"
          }, 0);

          tl.to(tvRef.current!.scale, {
            x: 3,
            y: 3,
            z: 3,
            duration: 3,
            ease: "power2.inOut"
          }, 0);

          tl.to(tvRef.current!.position, {
            z: 5,
            duration: 1.5,
            ease: "power2.in"
          }, 1.5);
        }, 500);
      };

      const handleTouchEnd = () => {
        if (longPressTimerRef.current) {
          clearTimeout(longPressTimerRef.current);
          longPressTimerRef.current = null;
        }
      };

      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchend', handleTouchEnd);
      document.addEventListener('touchcancel', handleTouchEnd);

      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchend', handleTouchEnd);
        document.removeEventListener('touchcancel', handleTouchEnd);
        if (longPressTimerRef.current) {
          clearTimeout(longPressTimerRef.current);
        }
      };
    } else {
      // Desktop: ScrollTrigger - wait for DOM to be ready
      const initScrollTrigger = () => {
        if (!document.body) {
          requestAnimationFrame(initScrollTrigger);
          return;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "+=2000",
            scrub: 1,
            pin: true,
            onRefresh: (self) => {
              scrollTriggerRef.current = self;
            }
          }
        });

        tl.to(cameraRef.current!.position, {
          z: 2,
          x: oPos.x,
          y: oPos.y,
          duration: 1,
          ease: "power2.inOut"
        }, 0);

        tl.to(cameraRef.current!.rotation, {
          z: Math.PI / 6,
          duration: 1,
          ease: "power2.inOut"
        }, 0);

        tl.to(tvRef.current!.rotation, {
          y: Math.PI * 2,
          duration: 1,
          ease: "power2.inOut"
        }, 0);

        tl.to(tvRef.current!.scale, {
          x: 3,
          y: 3,
          z: 3,
          duration: 1,
          ease: "power2.inOut"
        }, 0);

        tl.to(tvRef.current!.position, {
          z: 5,
          duration: 0.5,
          ease: "power2.in"
        }, 0.8);
      };

      initScrollTrigger();

      return () => {
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    }
  }, [isMobile, isAnimating, oPos, vw]);

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enabled={false}
      />
      <PerspectiveCamera
        ref={cameraRef}
        fov={45}
        near={0.1}
        far={50000}
        makeDefault
        position={[0, 0, 20]}
      />
      <Environment preset="city" />
      <group ref={tvRef}>
        <TV position={[0, 0, 0]} size={vw} />
      </group>
      <HackToFuture onPositionReady={setOPos} onViewportWidth={vw} />
    </>
  );
};

export default Scene;
