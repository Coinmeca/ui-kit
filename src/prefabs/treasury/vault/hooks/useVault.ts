"use client";
import type { Order } from "types";
import { useState } from "react";

export interface Condition {
    mode?: boolean;
    ratio?: number;
    require?: number;
    locked?: number;
    weight?: number;
    need?: number;
    fee?: number;
}

export default function useVault(initial: Order, condition: Condition, available?: number) {
    const [order, setOrder] = useState<Order>({
        price: initial?.price || 0,
        amount: initial?.amount || 0,
        quantity: initial?.quantity || 0,
        fees: initial?.fees || 0,
        total: initial?.total || 0,
    });

    const mode = typeof condition?.mode === 'boolean' ? condition?.mode : true;
    const ratio = condition?.ratio || 0;
    const require = condition?.require || 0;
    const locked = condition?.locked || 0;
    const weight = condition?.weight || 0;
    const need = condition?.need || 0;
    const fee = condition?.fee || 0.01;

    const getAmount = (amount: number, price?: number): number => {
        const p = price || order?.price;
        const max = available && p !== 0 && (mode ? available : available * p);
        return max && max < amount ? max : amount;
    };

    const maxAmount = (): number | undefined => {
        return available;
    };

    const maxQuantity = (price?: number): number | undefined => {
        const p = price || order?.price;
        return (available && p !== 0 && (mode ? available / p : available * p)) || undefined;
    };

    const base = (base: string) => {
        setOrder((state: Order) => {
            return { ...state, base: base };
        });
    };

    const quote = (quote: string) => {
        setOrder((state: Order) => {
            return { ...state, base: quote };
        });
    };

    const price = (price: number) => {
        if (price === 0) {
            setOrder((state: Order) => {
                return {
                    ...state,
                    price: 0,
                    amount: 0,
                    quantity: 0,
                    fees: 0,
                    total: 0,
                };
            });
        }
        amount(order?.amount || 0, price);
    };

    const amount = (amount: number, price?: number) => {
        let o: any;
        setOrder((state: Order) => {
            const p = price || state?.price;

            if (amount === 0 || p === 0) {
                return {
                    ...state,
                    price: p,
                    amount: 0,
                    quantity: 0,
                    fees: 0,
                    total: 0,
                };
            }

            const a = getAmount(amount, p);
            const g = locked + need;
            const q =
                require >= locked || weight == 0
                    ? mode
                        ? amount * p
                        : amount * ratio
                    : g > 0
                        ? mode
                            ? (weight * amount * g) / (locked + amount) ** 2
                            : ((locked - (locked * amount) / (weight + amount)) * ((locked * amount) / (weight + amount))) / (locked + need)
                        : 0;
            const f = q > 0 ? fees(q) : 0;

            o = {
                ...state,
                price: p,
                amount: a,
                quantity: mode ? q : locked < q ? locked : q,
                fees: f,
                total: q - f,
            };
            console.log('o', o)
            return o;
        });
        return o;
    };

    const fees = (quantity: number) => (quantity === 0 ? 0 : quantity * fee);

    const reset = (price?: number) =>
        setOrder((order) => ({
            ...order,
            price: price || order?.price,
            amount: 0,
            quantity: 0,
            fees: 0,
            total: 0,
        }));

    return {
        order,
        base,
        quote,
        price,
        amount,
        reset,
        maxAmount,
        maxQuantity,
    };
}
