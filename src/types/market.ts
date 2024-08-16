import { Token } from "./web3";


export interface Tick {
    price: number | string;
    balance: number | string;
}

export interface Orderbook {
    asks?: Tick[];
    bids?: Tick[];
}

export interface Market extends Token {
    ticker?: string;
    base?: Token;
    quote?: Token;
    price?: number | string;
    change?: number | string
    changeRate?: number | string
    high?: number | string
    low?: number | string
    tick?: number | string
    fee?: number | string
    orderbook?: Orderbook;
    liquidity?: {
        base?: number | string;
        quote?: number | string;
    };
    volume?: {
        base?: number | string;
        quote?: number | string;
    };
}

type MarketTradeType = "BID" | "ASK" | "BUY" | "SELL";

export interface MarketRecent {
    time?: number | string;
    type: MarketTradeType;
    amount: number | string;
    quantity: number | string;
    txHash: number | string;
}
