import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Balance, useBalance, useWallet } from "useink";
import { formatBalance } from "useink/utils";
import AccountSelection from "./AccountSelection";

const getTokenSymbol = (balance: Balance): string => {
  return balance?.freeBalance.registry.getChainProperties().tokenSymbol
    .value[0];
};

export const AccountInformation: FC<{}> = () => {
  const { account } = useWallet();
  const balance = useBalance(account);

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
          {formatBalance(balance?.freeBalance, {
            withSi: false,
            withZero: false,
          })}
        </b>{" "}
        {getTokenSymbol(balance)}
      </Typography>
    </Stack>
  );
};

export default AccountInformation;
