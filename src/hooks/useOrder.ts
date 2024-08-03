"use client";
import { useState } from "react";
import type { Order } from "types";

export default function useOrder(initial: Order, mode: boolean, fee: number, available?: number) {
    const [order, setOrder] = useState<Order>({
        pay: initial?.pay || { address: "", name: "", symbol: "", decimals: 0 },
        price: initial?.price || 0,
        amount: initial?.amount || 0,
        quantity: initial?.quantity || 0,
        fees: initial?.fees || 0,
        total: initial?.total || 0,
    });

    const getAmount = (amount: number, price?: number): number => {
        const p = price || order?.price;
        const max = available ? p > 0 && (mode ? available : available * p) : p > 0 && (mode ? amount : amount * p);
        return max && max < amount ? max : amount;
    };

    const getQuantity = (quantity: number, price?: number): number => {
        const p = price || order?.price;
        const max = maxQuantity(p);
        return max && max < quantity ? max : quantity;
    };

    const maxAmount = (): number | undefined => {
        return available || order?.amount;
    };

    const maxQuantity = (price?: number): number | undefined => {
        const p = price || order?.price;
        return available && available > 0 && p > 0 ? (mode ? available / p : available * p) : undefined;
    };

    const price = (price: number) => {
        if (price === 0) {
            setOrder({
                ...order,
                price: 0,
                amount: 0,
                quantity: 0,
                fees: 0,
                total: 0,
            });
        }
        mode ? amount(order?.amount || 0, price) : quantity(order?.quantity || 0, price);
    };

    const amount = (amount: number, price?: number) => {
        let o: Order;
        const p = price || order?.price;

        if (amount === 0 || p === 0) {
            o = {
                ...order,
                price: p,
                amount: 0,
                quantity: 0,
                fees: 0,
                total: 0,
            };
            setOrder(o);
            return o;
        }

        const a = getAmount(amount, p);
        const q = mode ? a / p : a * p;
        const f = fees(q);

        o = {
            ...order,
            price: p,
            amount: a,
            quantity: q,
            fees: f,
            total: q - f,
        };
        setOrder(o);
        return o;
    };

    const quantity = (quantity: number, price?: number) => {
        let o: Order;
        const p = price || order?.price;

        if (quantity === 0 || p === 0) {
            o = {
                ...order,
                price: p,
                amount: 0,
                quantity: 0,
                fees: 0,
                total: 0,
            };
            setOrder(o);
            return o;
        }

        const q = getQuantity(quantity, p);
        const a = mode ? q * p : q / p;
        const f = fees(q);

        o = {
            ...order,
            price: p,
            amount: a,
            quantity: q,
            fees: f,
            total: q - f,
        };
        setOrder(o);
        return o;
    };

    const reset = (price?: number) =>
        setOrder({
            ...order,
            price: price || order?.price,
            amount: 0,
            quantity: 0,
            fees: 0,
            total: 0,
        });

    const fees = (quantity: number) => (quantity === 0 ? 0 : quantity * fee);

    return {
        order,
        price,
        amount,
        quantity,
        reset,
        maxAmount,
        maxQuantity
    };
}
