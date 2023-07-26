export interface Token {
    symbol: string;
    name: string;
    address?: string;
    balance?: number | string;
    using?: number | string;
}

export interface History {
    time: number;
    category: number;
    state: number;
    market?: string;
    pay: string;
    item: string;
    price?: number | string;
    amount?: number | string;
    quantity?: number | string;
    fees?: number | string;
    total?: number | string;
}