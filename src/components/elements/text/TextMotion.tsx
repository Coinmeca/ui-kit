"use client";

import { AnimatePresence, AnimationProps, Transition } from "motion/react";
import Text, { type Text as Props } from "./Text";
import { Row } from "../../layouts";

export interface TextMotion extends AnimationProps {
    mode?: "popLayout" | "sync" | "wait" | undefined;
    gap?: number;
    transition?: Transition;
    layoutId?: string;
    layout?: boolean | "position" | "size" | "preserve-aspect";
    fit?: boolean;
    fix?: boolean;
}

export default function TextMotion(props: Props & { children?: string | number | (string | number)[] }) {
    const letters = props?.children
        ? Array.isArray(props?.children)
            ? props?.children
            : props?.children === ""
            ? []
            : props?.children?.toString()?.split("")
        : [];

    return (
        <AnimatePresence mode={props?.motion?.mode || "sync"}>
            <Row
                gap={props?.motion?.gap || 0}
                layout="size"
                fit={typeof props?.motion?.fit === "boolean" ? props?.motion?.fit : true}
                fix={typeof props?.motion?.fix === "boolean" ? props?.motion?.fix : true}>
                {letters?.length &&
                    letters?.map((letter: string, i: number) => (
                        <Text
                            key={i}
                            {...props}
                            motion={{
                                ...props?.motion,
                                layoutId: `${i}`,
                                layout: props?.motion?.layout || "position",
                            }}>
                            {letter === " " ? "\u00A0" : letter}
                        </Text>
                    ))}
            </Row>
        </AnimatePresence>
    );
}
