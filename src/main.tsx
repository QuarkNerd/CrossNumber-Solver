import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { SelectedContextProvider } from "./contexts/SelectedContext.tsx";
import { ValueContextProvider } from "./contexts/ValuesContext.tsx";
import { enableMapSet } from "immer";

enableMapSet();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SelectedContextProvider>
      <ValueContextProvider>
        <App />
      </ValueContextProvider>
    </SelectedContextProvider>
  </StrictMode>
);
