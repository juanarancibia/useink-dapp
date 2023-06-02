import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useWallet } from "useink";

export const InformacionCuenta: FC<{}> = () => {
  const { account } = useWallet();

  return (
    <Stack height="fit-content">
      <Typography variant="h5" fontWeight="bold" marginBottom={2}>
        CUENTA CONECTADA
      </Typography>

      <Typography color="grey">Nombre: {account?.name}</Typography>
      <Typography color="grey">
        Dirección: {account?.address.substring(0, 15)}...
      </Typography>
    </Stack>
  );
};

export default InformacionCuenta;
