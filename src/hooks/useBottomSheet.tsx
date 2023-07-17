import { useState, useCallback } from "react";

export default function useBottomSheet(state: boolean, children?: any) {
    const [active, setActive] = useState<boolean>(state);

    return {
        active,
        set: useCallback((active: boolean) => setActive(active), []),
        open: useCallback(() => setActive(true), []),
        close: useCallback(() => setActive(false), []),
        toggle: useCallback(() => setActive((state: boolean) => !state), []),
    } as const;
}
