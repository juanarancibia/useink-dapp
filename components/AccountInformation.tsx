import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useApi, useBalance, useChain, useWallet } from "useink";
import { planckToDecimalFormatted } from "useink/utils";
import AccountSelection from "./AccountSelection";

export const AccountInformation: FC<{}> = () => {
  const { account } = useWallet();
  const balance = useBalance(account);
  const chain = useChain();
  const apiProvider = useApi(chain?.id);

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

      <Typography color="grey">
        Balance:{" "}
        <b>
          {planckToDecimalFormatted(balance?.freeBalance, apiProvider?.api) ||
            " - "}
        </b>
      </Typography>
    </Stack>
  );
};

export default AccountInformation;
