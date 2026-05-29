import { ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { createTheme } from "@mui/material/styles";
import {
  GameProvider,
} from "./context/GameContext";

import MainLayout from "./layout/MainLayout";
import { ModalProvider } from "./context/ModalContext";

export const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light",
    primary: {
      main: "#f0ba18",
    },
    secondary: {
      main: "#6a3b0d",
    },
  },
  typography: {
    fontFamily: "vazir,tanha",
  },
});

const cacheRTL = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const App = () => {
  return (
    <GameProvider>
      <ModalProvider>
        <CacheProvider value={cacheRTL}>
          <ThemeProvider theme={theme}>
            <HelmetProvider>
              <Helmet>
                <title>Word Guessing</title>
              </Helmet>
              <MainLayout />
            </HelmetProvider>
          </ThemeProvider>
        </CacheProvider>
      </ModalProvider>
    </GameProvider>
  );
};

export default App;
