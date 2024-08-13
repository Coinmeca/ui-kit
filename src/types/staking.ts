import { Token } from "./web3";

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
