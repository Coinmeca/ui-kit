export interface Token {
    logo?: string;
    chainId?: number | string;
    address?: string;
    name?: string;
    symbol?: string;
    decimals?: number;
    value?: number | string;
}

export interface Asset extends Token {
    key?: boolean;
    type?: string;
    validate?: boolean;
    amount?: number;
    balance?: number;
    using?: number;
    staked?: number;
    interest?: number;
    allowance?: number;
}