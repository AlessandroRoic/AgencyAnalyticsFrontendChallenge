import React from "react";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { Gallery } from "./features/gallery";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Gallery />
    </ThemeProvider>
  );
}

export default App;
