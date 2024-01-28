export interface Token {
	symbol: string;
	name: string;
	decimals?: number;
	address?: string;
	balance?: number | string;
	using?: number | string;
}

export interface Asset extends Token {
	key: boolean;
	exchange_rate: number | string;
	exchange_rate_change: number | string;
	tl: number | string;
	tl_change: number | string;
	tvl: number | string;
	tvl_change: number | string;
}

export interface Farm {
	name: string;
	type: number;
	id?: number | string;
	address?: string;
	stake?: Token;
	reward?: Token;
	rewards?: number;
	rewards_rate?: number;
	tl?: number;
	tl_change?: number;
}