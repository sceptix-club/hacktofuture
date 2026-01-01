import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./scenes/scene";

function App() {
  return (
    <>
      <div id="scroll-spacer" />

      <div className="fixed inset-0 z-10 pointer-events-none">
        <Canvas>
          <Scene />
        </Canvas>
      </div>

      <div className="fixed left-0 right-0 bottom-[12vh] z-20 flex justify-center pointer-events-none">
        <div className="max-w-[95vw] overflow-hidden">
          <h2
            className="text-white whitespace-nowrap comic-sans font-bold"
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
