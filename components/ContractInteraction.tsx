import { Button, Stack, Typography } from "@mui/material";
import Decimal from "decimal.js";
import { FC, useEffect } from "react";
import {
  useCall,
  useChainDecimals,
  useContract,
  useTokenSymbol,
  useTx,
  useWallet,
} from "useink";
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

  const deposit = useTx(bankContract, BANK_CONTRACT_MESSAGES.deposit);
  const withdraw = useTx(bankContract, BANK_CONTRACT_MESSAGES.withdraw);

  const tokenSymbol = useTokenSymbol() || "";
  const chainDecimals = useChainDecimals() || 12;

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
          pickDecoded(getBalanceByAccount.result)?.Ok,
          chainDecimals,
          tokenSymbol
        ) ?? pickDecoded(getBalanceByAccount.result)?.Err}
      </Typography>

      <Button
        onClick={() =>
          deposit.signAndSend([], {
            value: formatNumber(0.1, chainDecimals),
          })
        }
      >
        Depositar 0.1 {tokenSymbol}
      </Button>
      <Button
        disabled={!pickDecoded(getBalanceByAccount.result)?.Ok}
        onClick={() => withdraw.signAndSend([formatNumber(0.1, chainDecimals)])}
      >
        Retirar 0.1 {tokenSymbol}
      </Button>
    </Stack>
  );
};

const formatAccountDepositBalance = (
  accountBalance: string | undefined,
  chainDecimals: number,
  tokenSymbol: string
): string | undefined => {
  return accountBalance
    ? `Depósito de cuenta: ${formatNumber(
        +accountBalance.replaceAll(",", ""),
        chainDecimals,
        false
      )} ${tokenSymbol}`
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
