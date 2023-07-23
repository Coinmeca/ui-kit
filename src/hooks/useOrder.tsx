"use client";
import { useState, useCallback } from "react";

export interface Order {
    base?: string;
    quote?: string;
    price: number;
    amount: number;
    quantity?: number;
    fees?: number;
    total?: number;
}

export default function useOrder(intial: Order, available: number, fee: number, mode: boolean) {
    const [order, setOrder] = useState<Order>(intial);

    const base = (base: string) => {
        setOrder((state: Order) => { return { ...state, base: base } });
    }

    const quote = (quote: string) => {
        setOrder((state: Order) => { return { ...state, base: quote } });
    }

    const price = (price: number) => {
        const quantity = (amount: number) => mode ? (amount / price) : (amount * price);
        setOrder((state: Order) => { return { ...state, price: price, quantity: quantity(state?.amount), fees: fees(quantity(state?.amount)), total: quantity(state?.amount) - fees(quantity(state?.amount)) } });
    }

    const amount = (amount: number) => {
        const a = amount > available ? available : amount;
        const quantity = (price: number) => mode ? (a / price) : (a * price);
        setOrder((state: Order) => { return { ...state, amount: a, quantity: quantity(state?.price), fees: fees(quantity(state?.price)), total: quantity(state?.price) - fees(quantity(state?.price)) } });
        return a;
    }

    const quantity = (quantity: number) => {
        setOrder((state: Order) => {
            const max = mode ? (available / state?.price) : (available * state?.price);
            const q = quantity > max ? max : quantity;
            return { ...state, amount: mode ? (q * state?.price) : (q / state?.price), quantity: q, fees: fees(q), total: q - fees(q) }
        });
    }

    const fees = (quantity: number) => quantity * fee;

    return { order, base, quote, price, amount, quantity }
}
