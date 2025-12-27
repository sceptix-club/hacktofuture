import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./scenes/scene";

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gray">
      {/*<div className="absolute inset-0 z-0 grid-bg" /> */}
      <div className="relative h-full max-w-[100vw] mx-auto overflow-hidden">


        <Canvas className="absolute inset-0 z-10">
          <Scene />
        </Canvas>


        <div className="absolute left-0 right-0 bottom-[12vh] z-20 flex justify-center pointer-events-none">
          <div className="max-w-[95vw] overflow-hidden">
            <h2
              className="text-white whitespace-nowrap comic-sans font-bold"
              style={{ fontSize: "clamp(1.0rem, 4vw, 2.0rem)" }}
            >
              COMING SOON !
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
