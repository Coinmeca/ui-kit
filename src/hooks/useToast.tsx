"use client";
import { useState } from "react";

export interface Notification {
    id?: number | string;
    title?: string;
    date?: number | Date;
    img?: string;
    message?: string;
    remain?: boolean;
}

export default function useToast() {
    const [toasts, setToasts] = useState<Notification[]>([]);
    const [notis, setNotis] = useState<Notification[]>([]);

    function AddToast(obj: Notification) {
        if (!obj) return;
        // if (!obj.id) obj.id = shortid.generate();
        if (!obj.id) obj.id = toasts.length;
        if (!obj.date) obj.date = Date.now();

        setToasts([...toasts, obj]);
        if (obj.remain) setNotis([...notis, obj]);
    }

    function AddNotify(obj: Notification) {
        if (!obj) return;
        // if (!obj.id) obj.id = shortid.generate();
        if (!obj.id) obj.id = toasts.length;
        if (!obj.date) obj.date = Date.now();
        setNotis([...notis, obj]);
    }

    function RemoveToast(id: string | number | undefined) {
        if (typeof id === "undefined") return;
        setToasts(toasts.filter((toast) => toast.id !== id));
    }

    function RemoveNotify(id: string | number) {
        setNotis(notis.filter((noti) => noti.id !== id));
    }

    return { toasts, notis, AddToast, RemoveToast, AddNotify, RemoveNotify };
}
