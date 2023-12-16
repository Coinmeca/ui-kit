"use client";
import { Dispatch, SetStateAction, createContext, use, useCallback, useEffect, useState } from "react";

export interface Notify {
    type?: "toast" | "noti";
    id?: number | string;
    title?: string;
    date?: number | string | Date;
    img?: string;
    message?: string;
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
    setNotis: (notis: Notify[]) => void;
    setToasts: Dispatch<SetStateAction<Notify[]>>;
    setRead: Dispatch<SetStateAction<boolean>>;
}

export const Notification = createContext<NotificationContext>({} as NotificationContext);

export function NotificationCenter({ children }: { children?: any }) {
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
        console.log(1);
        if (!obj) return;
        if (!obj?.type) obj.type = obj?.remain ? "noti" : "toast";
        if (!obj?.id) {
            const n = nonce + 1;
            obj.id = `${Date.now()}` + `${n}`;
            setNonce(n);
        }
        if (!obj?.date) obj.date = Date.now();

        setToasts([...toasts, obj]);
        if (obj?.remain) {
            if (!read) setCount(count + 1);
            setNotiList([...notis, obj]);
        }
    }

    function addNotify(obj: Notify) {
        if (!obj) return;
        if (!obj?.type) obj.type = "noti";
        if (!obj.id) {
            const n = nonce + 1;
            obj.id = `${Date.now()}` + `${n}`;
            setNonce(n);
        }
        if (!obj.date) obj.date = Date.now();

        if (!read) setCount(count + 1);
        setNotiList([...notis, obj]);
    }

    function removeToast(id?: number | string) {
        if (!id) return;
        setTimeout(() => {}, 300);
        setToasts(toasts.filter((n: Notify) => n?.id !== id));
    }

    function removeNotify(id?: number | string) {
        if (!id) return;
        setTimeout(() => {}, 300);
        setNotiList(notis.filter((n: Notify) => n?.id !== id));
    }

    useEffect(() => {
        if (read) setCount(0);
    }, [read]);

    return (
        <Notification.Provider value={{ notis, toasts, count, read, addNotify, addToast, removeNotify, removeToast, setNotis, setToasts, setRead }}>
            {children}
        </Notification.Provider>
    );
}

export default NotificationCenter;
