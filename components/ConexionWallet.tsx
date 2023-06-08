import { Logout } from "@mui/icons-material";
import DownloadIcon from "@mui/icons-material/Download";
import LoginIcon from "@mui/icons-material/Login";
import { Button, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import { FC } from "react";
import { useInstalledWallets, useUninstalledWallets, useWallet } from "useink";
import InformacionCuenta from "./InformacionCuenta";

export const ConexionBilletera: FC<{}> = () => {
  const { connect, disconnect, account } = useWallet();
  const installedWallets = useInstalledWallets();
  const uninstalledWallets = useUninstalledWallets();

  if (!account) {
    return (
      <Stack alignItems="start" justifyContent="center">
        <Typography variant="h5" paddingY={3} fontWeight="bold">
          EXTENSIONES INSTALADAS
        </Typography>

        {installedWallets.map((w) => (
          <Button
            key={w.title}
            fullWidth
            onClick={() => connect(w.extensionName)}
          >
            <Image src={w.logo.src} alt={w.logo.alt} width={50} height={50} />

            <Typography paddingX={3} textAlign="left" width={"100%"}>
              {w.title}
            </Typography>

            <LoginIcon />
          </Button>
        ))}

        <Typography variant="h5" paddingY={3} fontWeight="bold">
          EXTENSIONES NO INSTALADAS
        </Typography>

        {uninstalledWallets.map((w) => (
          <Button
            key={w.title}
            fullWidth
            onClick={() => window.open(w.installUrl, "_blank")}
          >
            <Image src={w.logo.src} alt={w.logo.alt} width={50} height={50} />

            <Typography paddingX={3} textAlign="left" width={"100%"}>
              {w.title}
            </Typography>

            <DownloadIcon />
          </Button>
        ))}
      </Stack>
    );
  }

  return (
    <Stack justifyContent={"center"} gap={3}>
      <InformacionCuenta />
      <Button variant="outlined" onClick={disconnect}>
        <Typography paddingX={3} paddingY={1} width={"100%"}>
          Desconectar
        </Typography>
        <Logout />
      </Button>
    </Stack>
  );
};

export default ConexionBilletera;
