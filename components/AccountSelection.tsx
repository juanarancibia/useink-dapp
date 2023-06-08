import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC, ReactNode } from "react";
import { WalletState, useWallet } from "useink";

const getAccountDisplayValue = (account: WalletState["account"]) => {
  return `${account!.name} - ${account!.address.substring(0, 7)}...`;
};

const AccountSelection: FC<{}> = () => {
  const { account, accounts, setAccount } = useWallet();

  return (
    <FormControl>
      <InputLabel id="seleccionar-cuenta-label">Seleccionar cuenta</InputLabel>
      <Select
        labelId="seleccionar-cuenta-label"
        value={account?.address}
        onChange={(event: SelectChangeEvent<unknown>, _: ReactNode) =>
          setAccount(
            accounts?.find((acc) => acc.address === event.target.value)!
          )
        }
      >
        {accounts &&
          accounts.map((acc) => (
            <MenuItem key={acc.address} value={acc.address}>
              {getAccountDisplayValue(acc)}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default AccountSelection;
