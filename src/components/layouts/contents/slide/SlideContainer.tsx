"use client";
import { AnimatePresence, motion } from "motion/react";
import { useSwipe } from "hooks";
import { Swipe } from "hooks/useSwipe";
import Style from "./SlideContainer.styled";
import SlideContent, { type SlideContent as Content } from "./SlideContent";

export interface SlideContainer {
    contents?: Content[];
    vertical?: boolean;
    offset?: number;
    unit?: "%" | "vw" | "vh" | "em" | "rem";
    style?: object;
    swipe?: Swipe;
}

export default function SlideContainer(props: SlideContainer) {
    const vertical = props?.vertical || false;
    const offset = typeof props?.offset === "number" ? props?.offset : 15;
    const unit = typeof props?.unit === "string" ? props?.unit : "%";
    const swipe = useSwipe(
        props?.swipe && { ...(typeof props?.swipe === "object" && props?.swipe), length: props?.contents?.length },
    );

    return (
        <Style as={motion.div} $vertical={vertical} style={props?.style}>
            {props?.contents && props?.contents?.length > 0 ? (
                // <AnimatePresence initial={false} custom={swipe?.direction}>
                props?.contents.map((content, i) => (
                    <SlideContent
                        key={i}
                        vertical={vertical}
                        offset={offset}
                        unit={unit}
                        active={swipe ? swipe?.index === i : content.active}
                        swipe={swipe && { ...swipe, variants: swipe?.variants(i) }}
                        style={content?.style}>
                        {content.children}
                    </SlideContent>
                ))
            ) : (
                /* </AnimatePresence> */
                <SlideContent>There is no content.</SlideContent>
            )}
        </Style>
    );
}
