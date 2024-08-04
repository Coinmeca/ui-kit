import { Token } from "./web3";

export interface Staking {
    pay: Token;
    amount: number;
    share?: number;
    apr?: number;
}