import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./styles/index.scss";
import { GlobalConstProvider } from "./context/GlobalConstContext";

createRoot(document.getElementById("root")!).render(
  <GlobalConstProvider>
    <App />
  </GlobalConstProvider>
);
