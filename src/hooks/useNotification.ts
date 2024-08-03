"use client";
import { create } from 'zustand';
import { Swipe } from './useSwipe';

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
    swipe?: Swipe;
}

interface NotificationStore {
    notis: Notify[];
    toasts: Notify[];
    nonce: number;
    read: boolean;
    count: number;
}

interface NotificationStoreAction {
    setNotiList: (notis: Notify[]) => void;
    setToasts: (toasts: Notify[]) => void;
    setNonce: (nonce: number) => void;
    setRead: (read: boolean) => void;
    setCount: (count: number) => void;
}

const useNotificationStore = create<NotificationStore & NotificationStoreAction>((set) => ({
    notis: [],
    toasts: [],
    nonce: 0,
    read: false,
    count: 0,
    setNotiList: (notis: Notify[]) => set((state) => ({ ...state, notis })),
    setToasts: (toasts: Notify[]) => set((state) => ({ ...state, toasts })),
    setNonce: (nonce: number) => set((state) => ({ ...state, nonce })),
    setRead: (read: boolean) => set((state) => ({ ...state, read })),
    setCount: (count: number) => set((state) => ({ ...state, count })),
}));

export default function useNotification() {
    const { notis, toasts, nonce, read, count, setNotiList, setToasts, setNonce, setRead, setCount } = useNotificationStore();

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
        setTimeout(() => setToasts(toasts?.filter((n: Notify) => n?.id !== id)), 300);
    }

    function removeNotify(id?: number | string) {
        if (!id) return;
        let c = count;
        notis.map((n: Notify, i: number) => {
            if (n?.id === id && i >= notis.length - c) c -= 1;
        });
        setCount(c);
        setTimeout(() => setNotiList(notis?.filter((n: Notify) => n?.id !== id)), 300);
    }

    function resetCount() {
        setCount(0);
    }

    function saveNotis(key?: string) {
        if (key && key !== "") {
            const list = JSON.stringify(notis);
            localStorage.setItem(`${key}.noti.list`, list);
            localStorage.setItem(`${key}.noti.count`, count?.toString());
        }
    }

    function loadNotis(key?: string) {
        let list: Notify[] = [];
        if (key && key !== "") {
            list = JSON.parse(localStorage.getItem(`${key}.noti.list`) || "[]");
            const count = parseInt(localStorage.getItem(`${key}.noti.count`) || "0");
            if (list?.length > 0) setNotis(list);
            if (count > 0 && !isNaN(count)) setCount(count);
        }
        return list;
    }

    return {
        notis,
        toasts,
        count,
        read,
        addNotify,
        addToast,
        removeNotify,
        removeToast,
        resetCount,
        setNotis,
        setToasts,
        setRead,
        saveNotis,
        loadNotis,
    }
}