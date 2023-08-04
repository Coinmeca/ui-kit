"use client";
import { motion } from "framer-motion";
import Style from "./InnerContent.styled";

export interface InnerContent {
    style?: object;
    children?: any;
    scroll?: boolean;
}

export default function InnerContent(props: InnerContent) {
    const scroll = props?.scroll || false;
    return (
        <Style
            $scroll={scroll}
            style={props?.style}
            key="content"
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.15 }}
        >
            {props?.children}
        </Style>
    );
}
