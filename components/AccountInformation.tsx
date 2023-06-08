import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useWallet } from "useink";
import AccountSelection from "./AccountSelection";

export const AccountInformation: FC<{}> = () => {
  const { account } = useWallet();

  return (
    <Stack height="fit-content">
      <AccountSelection />

      <Typography variant="h5" fontWeight="bold" marginTop={4} marginBottom={2}>
        Cuenta seleccionada
      </Typography>
      <Typography color="grey">Nombre: {account?.name}</Typography>
      <Typography color="grey">
        Dirección: {account?.address.substring(0, 15)}...
      </Typography>
    </Stack>
  );
};

export default AccountInformation;
