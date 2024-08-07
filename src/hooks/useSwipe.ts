'use client';
import { DragElastic, Transition, Variants, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useMobile from './useMobile';

export interface SwipePosition {
    x?: number;
    opacity?: number;
    zIndex?: number;
}

export interface SwipeConfig {
    type?: keyof typeof motion;
    vertical?: boolean;
    length?: number;
    index?: number;
    slide?: boolean;
    loop?: boolean;
    elastic?: DragElastic | Function;
    out?: number;
    threshold?: number;
    variants?: Variants | Function;
    transition?: Transition;
    onSwipe?: Function;
    onDrag?: Function;
}

export type Swipe = boolean | SwipeConfig | undefined;

interface SwipeOutput {
    as: any;
    custom: number;
    index: number;
    direction: number;
    elastic: DragElastic;
    out: number;
    threshold: number;
    variants: (i?: number) => Variants | undefined;
    animate: string;
    transition: Transition;
    drag: boolean | 'x' | 'y' | undefined;
    dragElastic: DragElastic;
    dragConstraints: { top?: number; bottom?: number; left?: number; right?: number };
    onDrag: (e: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number }; delta: { x: number; y: number }; velocity: { x: number; y: number } }) => void;
    onDragEnd: (e: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number }; delta: { x: number; y: number }; velocity: { x: number; y: number } }) => void;
}

export interface SwipeProps {
    as?: any;
    custom?: number;
    index?: number;
    direction?: number;
    elastic?: DragElastic;
    out?: number;
    threshold?: number;
    variants?: Variants | ((i?: number) => Variants | undefined);
    animate?: string;
    transition?: Transition;
    drag?: boolean | 'x' | 'y' | undefined;
    dragElastic?: DragElastic;
    dragConstraints?: { top?: number; bottom?: number; left?: number; right?: number };
    onDrag?: (e: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number }; delta: { x: number; y: number }; velocity: { x: number; y: number } }) => void;
    onDragEnd?: (e: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number }; delta: { x: number; y: number }; velocity: { x: number; y: number } }) => void;
}

export default function useSwipe(config?: Swipe): SwipeOutput | undefined {
    const c = typeof config === 'object' && config;
    const i = (c && typeof config?.index === 'number') && config?.index;
    const l = (c && typeof config?.length === 'number') && (config?.length > 0 ? config?.length - 1 : config?.length);
    const as = useMemo(() => motion[(c && config?.type) || 'div'], [config, c]);

    const { isMobile } = useMobile();
    const [index, setIndex] = useState<number>((c && config?.index) || 0);
    const [direction, setDirection] = useState<number>(0);

    const vertical = c && config?.vertical;
    const sensitivity = (c && typeof config?.elastic === 'number') ? config.elastic : isMobile ? 1 : 0.15;
    const loopElastic = (c && config?.loop) ? sensitivity : 0
    const elastic = c &&
        (typeof config?.elastic === 'object'
            ? config?.elastic
            : typeof config?.elastic === 'function' ? config?.elastic()
                : (i && l)
                    ? (vertical
                        ? i === 0
                            ? { top: loopElastic, bottom: sensitivity }
                            : i > 0
                                ? sensitivity
                                : i === l
                                    ? { top: sensitivity, bottom: loopElastic }
                                    : 0
                        : i === 0
                            ? { left: loopElastic, right: sensitivity }
                            : i > 0
                                ? sensitivity
                                : i === l
                                    ? { left: sensitivity, right: loopElastic }
                                    : 0
                    )
                    : sensitivity);

    const out = (c && typeof config?.out === 'number') ? config?.out : 15;
    const threshold = (c && typeof config?.threshold === 'number') ? config?.threshold : 32;

    const variants = useCallback(
        (i?: number): Variants | undefined => {
            return (c && l)
                ? {
                    swipe:
                        ((typeof config?.variants === 'function' || typeof config?.variants === 'object') &&
                            (typeof config?.variants === 'function'
                                ? config?.variants(i || direction)
                                : config?.variants)) ||
                        ((direction: number) => ({
                            [config?.vertical ? 'y' : 'x']: i === index ? 0 : direction > 0 ? `-${out}%` : `${out}%`,
                        })),
                }
                : undefined;
        },
        [config, c, l, index, out, direction],
    );

    const props = useMemo(() => ({
        as,
        animate: 'swipe',
        index,
        elastic,
        out,
        threshold,
        direction,
        custom: direction,
        variants,
        transition: (c && config?.transition) || { type: 'easeInOut', duration: 0.0001 },
        drag: (vertical ? 'y' : 'x') as boolean | 'x' | 'y' | undefined,
        dragConstraints: { top: 0, bottom: 0, left: 0, right: 0 },
        dragElastic: elastic,
        dragPropagation: true,
        dragDirectionLock: true,
        onDirectionLock: (axis: any) => axis === (vertical ? 'y' : 'x'),
        onDrag: (
            e: MouseEvent | TouchEvent | PointerEvent,
            info: {
                offset: { x: number; y: number };
                delta: { x: number; y: number };
                velocity: { x: number; y: number };
            },
        ) => {
            if (Math.abs(info.delta[vertical ? 'y' : 'x']) > threshold) e?.stopImmediatePropagation();
            if (c && typeof config?.onDrag === 'function') config?.onDrag(e, info);
        },
        onDragEnd: (
            e: MouseEvent | TouchEvent | PointerEvent,
            info: {
                offset: { x: number; y: number };
                delta: { x: number; y: number };
                velocity: { x: number; y: number };
            },
        ) => {
            if (config) {
                const position = vertical
                    ? swiping(info.offset.y, info.velocity.y)
                    : swiping(info.offset.x, info.velocity.x);
                if (position < -threshold) handleSwipe(e, 1);
                else if (position > threshold) handleSwipe(e, -1);
            }
        },
    }), [config]);

    const swiping = (offset: number, velocity: number) => Math.abs(offset) * velocity;

    const handleSwipe = (e: MouseEvent | TouchEvent | PointerEvent, move: number) => {
        if (c) {
            if (l && l > 0) {
                const i = index + move;
                const n = c && config?.loop ? (i < 0 ? l : i > l ? 0 : i) : i < 0 ? 0 : i > l ? l : i;
                setIndex(n);
                setDirection(move);
                if (typeof config?.onSwipe === 'function') config?.onSwipe(e, n);
            } else if (typeof config?.onSwipe === 'function') config?.onSwipe(e, move);
        }
    };

    useEffect(() => {
        if (typeof config === 'object' && typeof config?.index === 'number') {
            let i = config.index;
            let l = config?.length || 0;
            if (l && l > 0) {
                l -= 1;
                i = typeof config === 'object' && config?.loop
                    ? i < 0 ? l : i > l ? 0 : i
                    : i < 0 ? 0 : i > l ? l : i;
            }
            setIndex(i);
            if (i !== index) setDirection(i > index ? 1 : -1);
        }
    }, [config]);

    return config ? props : undefined;
}
