import "./App.css";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { ScrollControls, Stats } from "@react-three/drei";

function App() {
  return (
    <>
      <div className="fixed inset-0 z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 20], fov: 45, near: 0.1, far: 5000 }} shadows >
          <Stats />
          <ScrollControls pages={3} damping={0.4} distance={1} >
            <Experience />
          </ScrollControls>
        </Canvas>
      </div>
      <div className="fixed left-0 right-0 bottom-[12vh] z-20 flex justify-center pointer-events-none">
        <div className="max-w-[95vw] overflow-hidden">
          <h2
            className="text-white whitespace-nowrap font-bold"
            style={{ fontSize: "clamp(1.0rem, 4vw, 2.0rem)" }}
          >
            COMING SOON !
          </h2>
        </div>
      </div>
    </>
  );
}

export default App;
