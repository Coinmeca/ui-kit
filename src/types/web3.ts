export interface Token {
    logo?: string;
    address: string;
    name?: string;
    symbol?: string;
    decimals: number;
    balance?: number | string;
    using?: number | string;
    staked?: number | string;
    interest?: number | string;
    value?: number | string;
}

export interface Asset extends Token {
    key?: boolean;
    rate?: number | string;
    rateChange?: number | string;
    rateChangeRate?: number | string;
    locked?: number | string;
    lockedChange?: number | string;
    valueLocked?: number | string;
    valueLockedChange?: number | string;
    logo?: string;
}

export interface Farm {
    address: string;
    type: number;
    id?: number | string;
    name?: string;
    stake: Token;
    earn?: Token;
    staked?: number | string;
    stakedChange?: number | string;
    interest?: number | string;
    interestChange?: number | string;
    apr?: number | string;
    charts?: {
        apr: any;
        staked: any;
    };
    logo?: string;
}
