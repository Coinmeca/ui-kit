'use client';
import React, { useState, useEffect } from "react";
import BG from "components/layouts/bg/BG";
import type { BG as Background } from "components/layouts/bg/BG";
import { Style } from "./Slide.styled";

export interface SlideContent {
    children?: any;
    onClick?: Function;
    background?: Background;
}

export interface Slide {
    slides: SlideContent[];
    slideNo?: number;
    align?: "left" | "center" | "right";
    nav?: "top" | "bottom";
    padding?: number;
    timer?: number;
    scale?: number;
    style?: object;
    event?: Function;
}

export default function Slide(props: Slide) {
    const [slideNo, setSlideNo] = useState(props?.slideNo || 0);
    const timer = props?.timer || 1000;
    const padding = props?.padding || 4;
    const scale = props?.scale || 1;

    useEffect(() => {
        if (timer > 0) {
            let index = 0;
            const change = setInterval(() => {
                if (index === props?.slides.length - 1) index = 0; else index++;
                if (typeof props?.event === "function") props?.event(index);
                setSlideNo(index);
            }, timer);
            return () => clearInterval(change);
        }
    }, [props?.slides, props?.event, timer]);

    return (
        <Style style={props?.style} $scale={scale} $padding={padding} $nav={props?.nav}>
            {props?.slides && props?.slides?.length > 0 && (
                <>
                    <div>
                        {props?.slides?.map((slide: any, i: number) => (
                            <div key={i} data-active={slideNo === i} onClick={(e: any) => slide?.onClick && slide?.onClick(e)}>
                                {slide?.background && <BG {...slide?.background} />}
                                <div data-row={props?.align}>{slide.children}</div>
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
        </Style>
    );
}
