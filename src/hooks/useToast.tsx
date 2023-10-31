'use client';
import {useEffect, useState} from 'react';

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

export default function useToast(list?: Notify[]) {
	const [toasts, setToasts] = useState<Notify[]>([]);
	const [notis, setNotis] = useState<Notify[]>([]);

	// useEffect(() => {
	//     list && setNotis(list);
	// }, [list]);

	function AddToast(obj: Notify) {
		if (!obj) return;
		// if (!obj.id) obj.id = shortid.generate();
		if (!obj.id) obj.id = toasts.length;
		if (!obj.date) obj.date = Date.now();

		setToasts([...toasts, obj]);
		if (obj.remain) setNotis([...notis, obj]);
		console.log(obj);
	}

	function AddNotify(obj: Notify) {
		if (!obj) return;
		// if (!obj.id) obj.id = shortid.generate();
		if (!obj.id) obj.id = toasts.length;
		if (!obj.date) obj.date = Date.now();
		setNotis([...notis, obj]);
	}

	function RemoveToast(id?: number | string) {
		if (typeof id === 'undefined') return;
		setToasts(toasts.filter((toast) => toast.id !== id));
	}

	function RemoveNotify(id?: number | string) {
		if (typeof id === 'undefined') return;
		setNotis(notis.filter((noti) => noti.id !== id));
	}

	return {
		toasts,
		notis,
		setToasts,
		setNotis,
		AddToast,
		RemoveToast,
		AddNotify,
		RemoveNotify
	};
}
