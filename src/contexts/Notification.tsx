"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export interface Notify {
    type?: "toast" | "notify";
    id?: number | string;
    title?: string;
    date?: number | string | Date;
    img?: string;
    style?: object;
    message?: any | JSX.Element;
    timer?: number;
    importance?: boolean;
    remain?: boolean;
}

export interface NotificationContext {
    notis: Notify[];
    toasts: Notify[];
    count: number;
    read: boolean;
    addNotify: (obj: Notify) => void;
    addToast: (obj: Notify) => void;
    removeNotify: (id?: number | string) => void;
    removeToast: (id?: number | string) => void;
    resetCount: () => void;
    setNotis: (notis: Notify[]) => void;
    setToasts: Dispatch<SetStateAction<Notify[]>>;
    setRead: Dispatch<SetStateAction<boolean>>;
}

export const NotificationContext = createContext<NotificationContext>({} as NotificationContext);

export default function Notification({ children }: { children?: any }) {
    const [notis, setNotiList] = useState<Notify[]>([]);
    const [toasts, setToasts] = useState<Notify[]>([]);
    const [nonce, setNonce] = useState<number>(0);
    const [read, setRead] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);

    function setNotis(notis: Notify[]) {
        setNotiList(notis);
        setNonce(notis.length);
    }

    function addToast(obj: Notify) {
        if (!obj) return;
        if (!obj?.type) obj.type = obj?.remain ? "notify" : "toast";
        if (!obj?.id) {
            const n = nonce + 1;
            obj.id = `${Date.now()}` + `${n}`;
            setNonce(n);
        }
        if (!obj?.date) obj.date = Date.now();

        setToasts([...toasts, obj]);
        if (obj?.remain) {
            setCount(count + 1);
            setNotiList([...notis, obj]);
        }
    }

    function addNotify(obj: Notify) {
        if (!obj) return;
        if (!obj?.type) obj.type = "notify";
        if (!obj.id) {
            const n = nonce + 1;
            obj.id = `${Date.now()}` + `${n}`;
            setNonce(n);
        }
        if (!obj.date) obj.date = Date.now();
        setCount(count + 1);
        setNotiList([...notis, obj]);
    }

    function removeToast(id?: number | string) {
        if (!id) return;
        setTimeout(() => setToasts((states: Notify[]) => states.filter((n: Notify) => n?.id !== id)), 300);
    }

    function removeNotify(id?: number | string) {
        if (!id) return;
        let c = count;
        notis.map((n: Notify, i: number) => {
            if (n?.id === id && i >= notis.length - c) c -= 1;
        });
        setCount(c);
        setTimeout(() => setNotiList((states: Notify[]) => states.filter((n: Notify) => n?.id !== id)), 300);
    }

    function resetCount() {
        setCount(0);
    }

    return (
        <NotificationContext.Provider
            value={{ notis, toasts, count, read, addNotify, addToast, removeNotify, removeToast, resetCount, setNotis, setToasts, setRead }}
        >
            {children}
        </NotificationContext.Provider>
    );
}
