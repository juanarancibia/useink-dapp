import { ThemeProvider, createTheme } from "@mui/material";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { RococoContractsTestnet, RococoTestnet } from "useink/chains";
import "../styles/globals.css";

const UseInkProvider = dynamic(
  import("useink").then((c) => c.UseInkProvider),
  { ssr: false }
);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <UseInkProvider
        config={{
          dappName: "useink dApp",
          chains: [RococoContractsTestnet],
        }}
      >
        <Component {...pageProps} />
      </UseInkProvider>
    </ThemeProvider>
  );
}

export default MyApp;
