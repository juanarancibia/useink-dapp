import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RococoContractsTestnet } from "useink/chains";
import dynamic from "next/dynamic";

const UseInkProvider = dynamic(
  import("useink").then((c) => c.UseInkProvider),
  { ssr: false }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UseInkProvider
      config={{
        dappName: "useink dApp",
        chains: [RococoContractsTestnet],
      }}
    >
      <Component {...pageProps} />
    </UseInkProvider>
  );
}

export default MyApp;
