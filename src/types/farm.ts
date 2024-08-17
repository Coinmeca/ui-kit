import { Token } from "./web3";

export interface Farm extends Token {
    main?: string;
    type?: boolean;
    master?: string;
    id?: number | string;
    start?: number;
    period?: number;
    goal?: number;
    stake?: Token;
    earn?: Token;
    staked?: number | string;
    stakedChange?: number | string;
    valueStaked?: number | string;
    valueStakedChange?: number | string;
    staking24h?: number | string;
    staking24hChange?: number | string;
    unstaking24h?: number | string;
    unstaking24hChange?: number | string;
    interest?: number | string;
    interestChange?: number | string;
    interest24h?: number | string;
    interest24hChange?: number | string;
    apr?: number | string;
}

export type FarmTradeType = "STAKING" | "UNSTAKE" | "CLAIM" | "HARVEST"

export interface FarmRecent {
    time?: number | string;
    type?: FarmTradeType;
    amount?: number | string;
    share?: number | string;
    txHash?: string;
}

export interface Staking {
    pay?: Token;
    amount: number;
    share?: number;
    apr?: number;
}

export interface Interest {
    pay?: Token;
    amount: number;
    tax?: number;
    total?: number;
    ror?: number | string;
}