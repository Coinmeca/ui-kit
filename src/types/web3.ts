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
    validate?: boolean;
    amount?: number;
    balance?: number | string;
    using?: number | string;
    staked?: number | string;
    interest?: number | string;
    allowance?: number;
}