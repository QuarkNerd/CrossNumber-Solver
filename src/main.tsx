import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { SelectedContextProvider } from "./contexts/Selected/SelectedContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SelectedContextProvider>
      <App />
    </SelectedContextProvider>
  </StrictMode>
);
