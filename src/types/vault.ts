import { Token } from "./web3";

export interface Vault extends Token {
    key?: boolean;
    rate?: number | string;
    rateChange?: number | string;
    rateChangeRate?: number | string;
    ratio?: number | string;
    locked?: number | string;
    lockedChange?: number | string;
    value?: number | string;
    valueLocked?: number | string;
    valueLockedChange?: number | string;
    weight?: number | string;
    need?: number | string;
    require?: number | string;
    deposit?: number | string;
    deposit24h?: number | string;
    withdraw?: number | string;
    withdraw24h?: number | string;
    mint?: number | string;
    burn?: number | string;
}

export type VaultTradeType = "DEPOSIT" | "WITHDRAW"

export interface VaultRecent {
    time?: number | string;
    type?: VaultTradeType;
    amount?: number | string;
    meca?: number | string;
    share?: number | string;
    txHash?: string;
}
