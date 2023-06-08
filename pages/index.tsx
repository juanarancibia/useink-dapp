import type { NextPage } from "next";
import Head from "next/head";
import WalletConnection from "../components/WalletConnection";
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
          <WalletConnection />
        </Stack>
      </main>
    </div>
  );
};

export default Home;
