export interface Token {
    symbol: string;
    name: string;
    address?: string;
    balance?: number | string;
    using?: number | string;
}

export interface Asset extends Token {
    key: boolean;
    exchange_rate: number | string;
    exchange_rate_change: number | string;
    tv: number | string;
    tv_change: number | string;
    tvl: number | string;
    tvl_change: number | string;
}