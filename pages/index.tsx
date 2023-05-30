import type { NextPage } from "next";
import Head from "next/head";
import ConexionBilletera from "../components/ConexionBilletera";
import Stack from "@mui/material/Stack";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>useink dApp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Stack alignItems="center" justifyContent="center">
          <ConexionBilletera />
        </Stack>
      </main>
    </div>
  );
};

export default Home;
