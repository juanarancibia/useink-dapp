import { Button, Stack, Typography } from "@mui/material";
import Decimal from "decimal.js";
import { FC, useEffect } from "react";
import { useCall, useContract, useTx, useWallet } from "useink";
import { pickDecoded } from "useink/utils";
import { BANK_CONTRACT_ADDRESS_ROC } from "../contracts/addresses";
import bankContractMetadata from "../contracts/bank.json";

const ContractInteraction: FC<{}> = () => {
  const { account } = useWallet();

  const bankContract = useContract(
    BANK_CONTRACT_ADDRESS_ROC,
    bankContractMetadata
  );

  const getBalanceByAccount = useCall<{ Ok: string; Err: string }>(
    bankContract,
    "getBalanceByAccount"
  );

  const deposit = useTx(bankContract, "deposit");
  const withdraw = useTx(bankContract, "withdraw");

  useEffect(() => {
    getBalanceByAccount.send();
  }, [account, getBalanceByAccount]);

  return (
    <Stack marginTop={3}>
      <Typography paddingY={2} variant="h4" textAlign="center">
        Contrato de Banco
      </Typography>

      <Typography paddingBottom={1} textAlign="center">
        {formatAccountDepositBalance(
          pickDecoded(getBalanceByAccount.result)?.Ok
        ) ?? pickDecoded(getBalanceByAccount.result)?.Err}
      </Typography>

      <Button
        onClick={() =>
          deposit.signAndSend([], {
            value: formatNumber(0.1, 12),
          })
        }
      >
        Depositar 0.1 ROC
      </Button>
      <Button
        disabled={!pickDecoded(getBalanceByAccount.result)?.Ok}
        onClick={() => withdraw.signAndSend([formatNumber(0.1, 12)])}
      >
        Retirar 0.1 ROC
      </Button>
    </Stack>
  );
};

const formatAccountDepositBalance = (
  accountBalance: string | undefined
): string | undefined => {
  return accountBalance
    ? `Depósito de cuenta: ${formatNumber(
        +accountBalance.replaceAll(",", ""),
        12,
        false
      )} ROC`
    : undefined;
};

const formatNumber = (
  value: number,
  decimals: number,
  toInteger: boolean = true
): number => {
  return new Decimal(value)
    .mul(new Decimal(10).pow((toInteger ? 1 : -1) * decimals))
    .toNumber();
};

export default ContractInteraction;
