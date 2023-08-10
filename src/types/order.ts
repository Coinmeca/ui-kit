export interface Order {
    base?: string;
    quote?: string;
    price: number;
    amount?: number;
    quantity?: number;
    fees?: number;
    total?: number;
}