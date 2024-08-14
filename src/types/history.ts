
export interface History {
	key?: string;
	time: number;
	category: string;
	option: string;
	state: string;
	market?: string;
	pay: string;
	item: string;
	price?: number | string;
	amount?: number | string;
	quantity?: number | string;
	fees?: number | string;
	total?: number | string;
}

export interface Trade {
	time?: number | string;
	type: string;
	amount: number | string;
	meca: number | string;
	share: number | string;
}

export interface Stake {
	time?: number | string;
	type: string;
	amount: number | string;
	share: number | string;
	txHash?: string;
}
