"use client";
import { ReactNode } from "react";
import { Elements } from "components";
import { AnimatePresence, motion } from "framer-motion";
import Style, { NoData } from "./List.styled";
import ListItem from "./ListItem";

export interface List {
    list?: any;
    formatter?: Function;
    fallback?: string | ReactNode | JSX.Element | Function;
    fill?: boolean;
    style?: CSSPropertyRule;
}

export default function List(props: List) {
    const fallback = props?.fallback || "There is no data.";
    const fill = props?.fill || false;

    return (
        <>
            {props?.list && typeof props?.list !== "string" && props?.list?.length > 0 ? (
                <Style $fill={fill} style={props?.style}>
                    <AnimatePresence>
                        <>
                            {(typeof props?.formatter === "function" ? props?.formatter(props?.list) : props?.list)?.map((data: any, i: number) => (
                                <ListItem
                                    key={i}
                                    {...(data?.children && data)}
                                    as={motion.div}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    transition={{
                                        ease: "easeInOut",
                                        duration: 0.3,
                                    }}
                                    layout
                                >
                                    {data?.children ? data?.children : data}
                                </ListItem>
                            ))}
                        </>
                    </AnimatePresence>
                </Style>
            ) : (
                <NoData
                    key="fallback"
                    as={motion.div}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ ease: "easeInOut", duration: 0.3 }}
                    layout
                >
                    {typeof fallback === "string" ? (
                        <Elements.Text type={"desc"} opacity={0.6}>
                            {fallback}
                        </Elements.Text>
                    ) : (
                        <>{fallback}</>
                    )}
                </NoData>
            )}
        </>
    );
}
