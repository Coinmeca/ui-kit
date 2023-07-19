"use client";
import { useState, useCallback } from "react";

export default function useModal() {
    const [active, setActive] = useState<boolean>(false);

    return {
        active,
        set: useCallback((active: boolean) => setActive(active), []),
        open: useCallback(() => setActive(true), []),
        close: useCallback(() => setActive(false), []),
        toggle: useCallback(() => setActive((state: boolean) => !state), []),
    } as const;
}
