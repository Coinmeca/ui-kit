export interface Token {
	address: string;
	decimals: number;
	logo?: string;
	symbol?: string;
	name?: string;
	balance?: number | string;
	using?: number | string;
}

export interface Asset extends Token {
	key?: boolean;
	exchange?: number | string;
	exchangeChange?: number | string;
	exchangeChangeRate?: number | string;
	locked?: number | string;
	lockedChange?: number | string;
	valueLocked?: number | string;
	valueLockedChange?: number | string;
	logo?: string;
}

export interface Farm {
	name: string;
	type: number;
	id?: number | string;
	stake: Token;
	earn?: Token;
	address?: string;
	interest?: number | string;
	interestChange?: number | string;
	staked?: number | string;
	stakedChange?: number | string;
	apr?: number | string
	charts?: {
		apr: any;
		staked: any;
	}
}
