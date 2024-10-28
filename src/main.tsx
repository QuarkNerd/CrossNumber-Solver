import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { SelectedContextProvider } from "./contexts/SelectedContext.tsx";
import { ValuesContextProvider } from "./contexts/ValuesContext.tsx";
import { enableMapSet } from "immer";

enableMapSet();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SelectedContextProvider>
      <ValuesContextProvider>
        <App />
      </ValuesContextProvider>
    </SelectedContextProvider>
  </StrictMode>
);
