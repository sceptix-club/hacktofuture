import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Stats from "stats.js";

// --- Stats.js integration ---
const stats = new Stats();
stats.showPanel(0); // 0: FPS, 1: ms, 2: MB
document.body.appendChild(stats.dom);

function animate() {
  stats.begin();
  stats.end();
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
// ---------------------------

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
