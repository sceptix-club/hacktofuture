import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TV } from "../assets/TV";


gsap.registerPlugin(ScrollTrigger);

const Scene = () => {
  return (
    <>
      <OrbitControls />
      <PerspectiveCamera
        fov={45}
        near={1}
        far={50000}
        makeDefault
        position={[0, 0, 20]}
      />
      <Environment preset="city" />
      <TV position={[0, 0, 0]} />
    </>
  );
};

export default Scene;
