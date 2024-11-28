'use client';

import { useState, RefObject, useLayoutEffect } from 'react';
import { throttle } from 'lib/utils';

// Utility function to find all scrollable parents
function getScrollableParents(element: HTMLElement | null | undefined): HTMLElement[] {
    const scrollableParents: HTMLElement[] = [];
    let parent: HTMLElement | null | undefined = element?.parentElement;

    while (parent) {
        const overflowY = window.getComputedStyle(parent).overflowY;
        if (overflowY === 'scroll' || overflowY === 'auto') {
            scrollableParents.push(parent);
        }
        parent = parent.parentElement;
    }

    return scrollableParents;
}


export default function usePositionTracker(ref: RefObject<HTMLElement>, throttleTime = 0.1): DOMRect {
    const [position, setPosition] = useState<DOMRect>(ref?.current?.getBoundingClientRect() || {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        toJSON: () => undefined,
    });

    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;

        const scrollableParents = getScrollableParents(element);
        const update = throttle(() => setPosition(element.getBoundingClientRect()), throttleTime);

        scrollableParents.forEach((parent) => parent.addEventListener('scroll', update));
        window.addEventListener('load', update);
        window.addEventListener('resize', update);
        window.addEventListener('scroll', update);
        window.addEventListener('focus', update);
        window.addEventListener('blur', update);
        window.addEventListener('beforeunload', update);
        window.addEventListener('orientationchange', update);
        document.addEventListener('visibilitychange', update);

        update();

        return () => {
            scrollableParents.forEach((parent) => parent.removeEventListener('scroll', update));
            window.removeEventListener('load', update);
            window.removeEventListener('resize', update);
            window.removeEventListener('scroll', update);
            window.removeEventListener('focus', update);
            window.removeEventListener('blur', update);
            window.removeEventListener('beforeunload', update);
            window.removeEventListener('orientationchange', update);
            document.removeEventListener('visibilitychange', update);
        };
    }, [ref, throttleTime]);

    return position;
}
