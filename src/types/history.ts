
export type AddressString = `0x${string}`;

export type Category =
	| 'Order'
	| 'Bid'
	| 'Ask'
	| 'Buy'
	| 'Sell'
	| 'Deposit'
	| 'Withdraw'
	| 'Stake'
	| 'Unstake'
	| 'Claim'
	| 'Long'
	| 'Short'
	| 'Futures'
	| 'Perpetual'
	| 'Earn'
	| 'Charge'
	| 'Grant'
	| 'Lockup'
	| 'Vesting'
	| 'Listing';
export type Option = 'general' | 'market' | 'limit' | 'debit' | 'prepaid' | 'postpaid' | 'linear' | 'cliff' | 'rate';
export type State =
	| 'Pending'
	| 'Filled'
	| 'Claimable'
	| 'Complete'
	| 'Cancel'
	| 'Open'
	| 'Close'
	| 'Liquidated'
	| 'Requested'
	| 'Paid'
	| 'Shipping'
	| 'Proceeding'
	| 'Terminated'
	| 'Expired';

export const c = [
	'Order',
	'Bid',
	'Ask',
	'Buy',
	'Sell',
	'Deposit',
	'Withdraw',
	'Stake',
	'Unstake',
	'Claim',
	'Long',
	'Short',
	'Futures',
	'Perpetual',
	'Earn',
	'Charge',
	'Grant',
	'Lockup',
	'Vesting',
	'Listing',
];
export const o = ['General', 'Market', 'Limit', 'Debit', 'Prepaid', 'Postpaid', 'Linear', 'Cliff', 'Rate'];
export const s = [
	'Pending',
	'Filled',
	'Claimable',
	'Complete',
	'Cancel',
	'Open',
	'Close',
	'Liquidated',
	'Requested',
	'Paid',
	'Shipping',
	'Proceeding',
	'Terminated',
	'Expired',
];

export interface History {
	key: string;
	category: Category;
	option: Option;
	state: State;
	time: number;
	price: number;
	amount: number;
	quantity: number;
	fees: number;
	pay: string;
	item: string;
	owner: string;
	market: string;
}
