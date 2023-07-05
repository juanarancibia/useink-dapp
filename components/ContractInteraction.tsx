import { Stack, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useCall, useContract, useWallet } from "useink";
import { pickDecoded } from "useink/utils";
import {
  BANK_CONTRACT_ADDRESS_ROC,
  BANK_CONTRACT_MESSAGES,
} from "../contracts/constants";
import bankContractMetadata from "../contracts/bank.json";

const ContractInteraction: FC<{}> = () => {
  const { account } = useWallet();

  const bankContract = useContract(
    BANK_CONTRACT_ADDRESS_ROC,
    bankContractMetadata
  );

  const getBalanceByAccount = useCall<{ Ok: string; Err: string }>(
    bankContract,
    BANK_CONTRACT_MESSAGES.getBalanceByAccount
  );

  useEffect(() => {
    getBalanceByAccount.send();
  }, [account, getBalanceByAccount]);

  return (
    <Stack marginTop={3}>
      <Typography paddingY={2} variant="h4" textAlign="center">
        Contrato de Banco
      </Typography>

      <Typography paddingBottom={1} textAlign="center">
        Balance de la cuenta:{" "}
        {pickDecoded(getBalanceByAccount.result)?.Ok ??
          pickDecoded(getBalanceByAccount.result)?.Err}
      </Typography>
    </Stack>
  );
};

export default ContractInteraction;
