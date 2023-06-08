import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RococoContractsTestnet } from "useink/chains";
import dynamic from "next/dynamic";
import { ThemeProvider, createTheme } from "@mui/material";

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
