'use client';

import { useLayoutEffect, useState } from 'react';

export default function useScrollPosition(target: any) {
    const [scrollPosition, setScrollPosition] = useState(0);

    useLayoutEffect(() => {
        if (target) {
            if (typeof target === 'number') setScrollPosition(target);
            else {
                const update = () => setScrollPosition(target.current?.scrollTop);
                if (target?.current) {
                    target?.current.addEventListener('scroll', update, { passive: true });
                    return () => target?.current?.removeEventListener('scroll', update);
                }
            }
        }
    }, [target]);

    const scrollPercent = () => {
        const height = target?.current?.scrollHeight - target?.current?.offsetHeight;
        return scrollPosition && height ? (scrollPosition * 100) / height : 0;
    };

    return {
        scrollPercent: scrollPercent(),
        scrollPosition,
        setScrollPosition: (position: number) => {
            if (target && position) {
                target.current?.scrollTo({
                    top: position,
                    behavior: 'smooth',
                });
                setScrollPosition(position);
            }
        },
    };
}
