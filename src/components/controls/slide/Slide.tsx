"use client";
import { AnimatePresence, motion } from "motion/react";
import { memo, useEffect, useState } from "react";
import BG, { type BG as Background } from "components/layouts/bg/BG";
import { useSwipe } from "hooks";
import { Swipe } from "hooks/useSwipe";
import { Style } from "./Slide.styled";

export interface PositionEvent {
    x?: number;
    opacity?: number;
    zIndex?: number;
}

export interface SlideContent {
    active?: boolean;
    children?: any;
    style?: object;
    onClick?: Function;
    background?: Background;
}

export interface Slide {
    slides: SlideContent[];
    slideNo?: number;
    align?: {
        vertical?: "top" | "center" | "bottom";
        horizon?: "left" | "center" | "right";
    };
    nav?: "top" | "bottom";
    padding?: number;
    timer?: number;
    scale?: number;
    style?: object;
    event?: Function;
    swipe?: Swipe;
}

const Slide = (props: Slide) => {
    const [slideNo, setSlideNo] = useState<number>(props?.slideNo || 0);
    const swipe = useSwipe(
        props?.swipe && {
            ...(typeof props?.swipe === "object" && props?.swipe),
            index: slideNo,
            length: props?.slides?.length,
            onSwipe: (e: any, i: number) => setSlideNo(i),
        },
    );

    const timer = typeof props?.timer !== "number" ? 0 : props?.timer;
    const padding = props?.padding || 4;
    const scale = props?.scale || 1;
    const vertical = props?.align?.vertical || "center";
    const horizon = props?.align?.horizon || "center";

    useEffect(() => {
        if (typeof props?.slideNo === "number" && props?.slideNo !== slideNo) setSlideNo(props?.slideNo);
    }, [props?.slideNo]);

    useEffect(() => {
        if (timer > 0) {
            let index = 0;
            const change = setInterval(() => {
                if (index === props?.slides.length - 1) index = 0;
                else index++;
                if (typeof props?.event === "function") props?.event(index);
                setSlideNo(index);
            }, timer);
            return () => clearInterval(change);
        }
    }, [props?.slides, props?.event, timer]);

    return (
        <Style
            style={props?.style}
            $scale={scale}
            $timer={timer}
            $padding={padding}
            $nav={props?.nav}
            $vertical={vertical}
            $horizon={horizon}
            data-align={props?.align?.horizon}>
            <AnimatePresence initial={false} custom={swipe?.direction}>
                {props?.slides && props?.slides?.length > 0 && (
                    <>
                        <div>
                            {props?.slides?.map((slide: any, i: number) => (
                                <div
                                    key={i}
                                    data-active={slide?.active || slideNo === i}
                                    onClick={(e: any) => slide?.onClick && slide?.onClick(e)}>
                                    {slide?.background && <BG {...slide?.background} />}
                                    <motion.div
                                        {...swipe}
                                        data-row={props?.align?.horizon}
                                        style={slide?.style}
                                        variants={undefined}>
                                        {/* <motion.div {...swipe} data-row={props?.align?.horizon} style={slide?.style} variants={undefined}> */}
                                        {slide.children}
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                        <div>
                            {props?.slides.map((_, i) => (
                                <div
                                    key={i}
                                    data-active={slideNo === i}
                                    onClick={() => {
                                        setSlideNo(i);
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </AnimatePresence>
        </Style>
    );
};

export default memo(Slide);
