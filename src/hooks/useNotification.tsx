"use client";
import { useCallback, useEffect, useState } from "react";

export interface Notify {
    id?: number | string;
    title?: string;
    date?: number | string | Date;
    img?: string;
    message?: string;
    timer?: number;
    importance?: boolean;
    remain?: boolean;
}

export default function useNotification(list?: Notify[]) {
    const [toasts, setToasts] = useState<Notify[]>([]);
    const [notis, setNotis] = useState<Notify[]>([]);

    function addToast(obj: Notify) {
        if (!obj) return;
        // if (!obj.id) obj.id = shortid.generate();
        if (!obj.id) obj.id = toasts.length;
        if (!obj.date) obj.date = Date.now();

        setToasts((state: Notify[]) => [...state, obj]);
        if (obj.remain) setNotis((state: Notify[]) => [...state, obj]);
        console.log(obj);
    }

    function addNotify(obj: Notify) {
        if (!obj) return;
        // if (!obj.id) obj.id = shortid.generate();
        if (!obj.id) obj.id = toasts.length;
        if (!obj.date) obj.date = Date.now();
        setNotis((state: Notify[]) => [...state, obj]);
        console.log(obj);
    }

    function removeToast(id?: number | string) {
        if (typeof id === "undefined") return;
        setToasts([...toasts].filter((toast) => toast.id !== id));
    }

    function removeNotify(id?: number | string) {
        if (typeof id === "undefined") return;
        setNotis([...notis].filter((noti) => noti.id !== id));
    }

    return {
        toasts,
        notis,
        setToasts,
        setNotis,
        addToast,
        removeToast,
        addNotify,
        removeNotify,
    };
}
