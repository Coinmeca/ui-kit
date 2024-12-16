"use client";
import { motion } from "motion/react";
import Style from "./InnerContent.styled";

export interface InnerContent {
    children?: any;
    padding?: number | any[];
    style?: object;
    scroll?: boolean;
}

export default function InnerContent(props: InnerContent) {
    const initial = 0;
    const init = (padding?: number | string): number | undefined => {
        switch (typeof padding) {
            case "string":
                return initial;
            case "number":
                return padding;
            default:
                return undefined;
        }
    };

    const padding =
        typeof props?.padding === "number"
            ? {
                  top: props?.padding,
                  right: props?.padding,
                  bottom: props?.padding,
                  left: props?.padding,
              }
            : {
                  top: (props?.padding && typeof props?.padding[0] !== "string" && props?.padding[0]) || initial,
                  right:
                      (props?.padding && (props?.padding?.length > 1 ? init(props?.padding[1]) : init(props?.padding[0]))) ||
                      initial,
                  bottom:
                      (props?.padding && (props?.padding?.length > 2 ? init(props?.padding[2]) : init(props?.padding[0]))) ||
                      initial,
                  left:
                      (props?.padding &&
                          (props?.padding?.length > 3
                              ? init(props?.padding[3])
                              : props?.padding?.length > 1
                              ? init(props?.padding[1])
                              : init(props?.padding[0]))) ||
                      initial,
              };

    return (
        <Style
            $scroll={props?.scroll}
            $padding={padding}
            style={props?.style}
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.15 }}>
            {props?.children}
        </Style>
    );
}
