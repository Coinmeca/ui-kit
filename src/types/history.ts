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

export interface Trade {
	time?: number | string;
	type: string;
	volume: number | string;
	meca: number | string;
	share: number | string;
}
