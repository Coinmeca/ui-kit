import { MulticallWrapper } from "ethers-multicall-provider";
import { memoize } from "lodash";

import { ContractName } from "@/types/Contract";
import { jsonRpcProvider } from "@/constants";
import {
  App__factory,
  Farm__factory,
  Market__factory,
  Orderbook__factory,
  Vault__factory,
} from "../types";

export const contractFactories = {
  App: App__factory,
  Farm: Farm__factory,
  Market: Market__factory,
  Orderbook: Orderbook__factory,
  Vault: Vault__factory,
} as const;

export const contractAddresses: Record<ContractName, string> = {
  App: process.env.App_ADDRESS!,
  Farm: process.env.Farm_ADDRESS!,
  Market: process.env.Market_ADDRESS!,
  Orderbook: process.env.Orderbook_ADDRESS!,
  Vault: process.env.Vault_ADDRESS!,
} as const;

const multicall = MulticallWrapper.wrap(jsonRpcProvider);

function getContractInternal<T extends ContractName>(
  contractName: T
): ReturnType<(typeof contractFactories)[T]["connect"]> {
  const factory = contractFactories[contractName];
  const address = contractAddresses[contractName];
  return factory.connect(address, multicall) as any;
}

export function getContractABI(contractName: ContractName) {
  const factory = contractFactories[contractName];
  return factory.abi;
}

export const getContract = memoize(getContractInternal);
