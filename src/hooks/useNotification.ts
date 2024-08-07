"use client";
import { create } from 'zustand';
import { Swipe } from './useSwipe';
import produce from 'immer';

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
    setNotiList: (notis: Notify[]) => void;
    setToasts: (toasts: Notify[]) => void;
    setNonce: (nonce: number) => void;
    setRead: (read: boolean) => void;
    setCount: (count: number) => void;
    addNotify: (obj: Notify) => void;
    addToast: (obj: Notify) => void;
    removeNotify: (id: number | string) => void;
    removeToast: (id: number | string) => void;
    resetCount: () => void;
    saveNotis: (key: string) => void;
    loadNotis: (key: string) => Notify[];
}

const useNotificationStore = create<NotificationStore>((set, get) => ({
    notis: [],
    toasts: [],
    nonce: 0,
    read: false,
    count: 0,
    setNotiList: (notis: Notify[]) => set((state) => ({ notis })),
    setToasts: (toasts: Notify[]) => set((state) => ({ toasts })),
    setNonce: (nonce: number) => set((state) => ({ nonce })),
    setRead: (read: boolean) => set((state) => ({ read })),
    setCount: (count: number) => set((state) => ({ count })),

    addNotify: (obj: Notify) => set(produce((state: NotificationStore) => {
        if (!obj.type) obj.type = "notify";
        if (!obj.id) {
            state.nonce += 1;
            obj.id = `${Date.now()}${state.nonce}`;
        }
        if (!obj.date) obj.date = Date.now();
        state.notis.push(obj);
        state.count += 1;
    })),

    addToast: (obj: Notify) => set(produce((state: NotificationStore) => {
        if (!obj.type) obj.type = obj.remain ? "notify" : "toast";
        if (!obj.id) {
            state.nonce += 1;
            obj.id = `${Date.now()}${state.nonce}`;
        }
        if (!obj.date) obj.date = Date.now();
        state.toasts.push(obj);
        if (obj.remain) {
            state.notis.push(obj);
            state.count += 1;
        }
    })),

    removeNotify: (id: number | string) => setTimeout(() => set(produce((state: NotificationStore) => {
        state.notis = state.notis.filter(n => n.id !== id);
        state.count = state.notis.length;
    })), 300),

    removeToast: (id: number | string) => setTimeout(() => set(produce((state: NotificationStore) => {
        state.toasts = state.toasts.filter(n => n.id !== id);
    })), 300),

    resetCount: () => set(() => ({ count: 0 })),

    saveNotis: (key: string) => {
        const { notis, count } = get(); // Use get to access current state
        if (key && key !== "") {
            const list = JSON.stringify(notis);
            localStorage.setItem(`${key}.noti.list`, list);
            localStorage.setItem(`${key}.noti.count`, count.toString());
        }
    },

    loadNotis: (key: string) => {
        if (key && key !== "") {
            const list = JSON.parse(localStorage.getItem(`${key}.noti.list`) || "[]");
            const count = parseInt(localStorage.getItem(`${key}.noti.count`) || "0");
            set((state) => ({
                ...state,
                notis: list,
                count: count > 0 && !isNaN(count) ? count : state.count
            }));
            return list;
        }
        return [];
    }

}));

export default function useNotification() {
    return useNotificationStore();
}
