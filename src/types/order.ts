import { Token } from "./web3";

export interface Order {
	pay: Token;
	item?: Token;
	price: number;
	amount: number;
	quantity?: number;
	fees?: number;
	total?: number;
}
