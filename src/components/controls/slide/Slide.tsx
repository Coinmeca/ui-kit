"use client";
import { useState, useEffect, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BG from "components/layouts/bg/BG";
import { type BG as Background } from "components/layouts/bg/BG";
import { Style } from "./Slide.styled";

export interface SlideContent {
    active?: boolean;
    children?: any;
    style?: CSSProperties;
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
    style?: CSSProperties;
    event?: Function;
}

export default function Slide(props: Slide) {
    const [slideNo, setSlideNo] = useState(props?.slideNo || 0);
    const timer = typeof props?.timer !== "number" ? 0 : props?.timer;
    const padding = props?.padding || 4;
    const scale = props?.scale || 1;
    const vertical = props?.align?.vertical || "center";
    const horizon = props?.align?.horizon || "center";

    useEffect(() => {
        if (typeof props?.slideNo === "number") setSlideNo(props?.slideNo);
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
            data-align={props?.align?.horizon}
        >
            <AnimatePresence>
                {props?.slides && props?.slides?.length > 0 && (
                    <>
                        <div>
                            {props?.slides?.map((slide: any, i: number) => (
                                <div key={i} data-active={slide?.active || slideNo === i} onClick={(e: any) => slide?.onClick && slide?.onClick(e)}>
                                    {slide?.background && <BG {...slide?.background} />}
                                    <motion.div
                                        data-row={props?.align?.horizon}
                                        style={slide?.style}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ ease: "easeInOut", duration: 0.3 }}
                                        layout
                                    >
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
}
