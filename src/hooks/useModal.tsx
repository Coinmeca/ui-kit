"use client";
import { Modals } from "containers";
import { useState, useCallback } from "react";

export interface Modal {
    active?: boolean;
    title?: string;
    message?: any;
    children?: any;
    content?: any;
    buttonArea?: any;
    width?: number | { min?: number; max?: number };
    close?: boolean;
    onClose?: Function;
}

export default function useModal() {
    const [modal, setModal] = useState<Modal | undefined>(undefined);

    const container = <Modals.Default />;

    return {
        modal,
        set: useCallback((modal: Modal) => {
            setModal(modal);
            return container;
        }, []),
        close: useCallback(() => setModal(undefined), []),
    } as const;
}
