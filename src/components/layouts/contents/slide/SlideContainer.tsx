"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useSwipe } from "hooks";
import { Swipe } from "hooks/useSwipe";
import Style from "./SlideContainer.styled";
import SlideContent, { type SlideContent as Content } from "./SlideContent";

export interface SlideContainer {
    contents?: Content[];
    style?: object;
    swipe?: Swipe;
}

export default function SlideContainer(props: SlideContainer) {
    const swipe = useSwipe(props?.swipe && { ...(typeof props?.swipe === "object" && props?.swipe), length: props?.contents?.length });

    return (
        <Style as={motion.div} style={props?.style}>
            {props?.contents && props?.contents?.length > 0 ? (
                // <AnimatePresence initial={false} custom={swipe?.direction}>
                props?.contents.map((content, i) => (
                    <SlideContent
                        key={i}
                        active={swipe ? swipe?.index === i : content.active}
                        swipe={swipe && { ...swipe, variants: swipe?.variants(i) }}
                        style={content?.style}
                    >
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
