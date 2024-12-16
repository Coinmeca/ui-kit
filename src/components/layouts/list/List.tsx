"use client";
import { AnimatePresence, motion } from "motion/react";
import type { JSX, ReactNode } from "react";
import { Elements } from "components";
import Style, { NoData } from "./List.styled";
import ListItem, { ListItem as ListItemType } from "./ListItem";

export interface List {
    list?: any;
    formatter?: Function;
    fallback?: string | ReactNode | JSX.Element;
    fill?: boolean;
    style?: object;
}

export default function List(props: List) {
    const fallback = props?.fallback || "There is no data.";
    const fill = props?.fill || false;
    const list = typeof props?.formatter === "function" ? props?.formatter(props?.list) : props?.list;

    return (
        <>
            {props?.list && typeof props?.list !== "string" && props?.list?.length > 0 ? (
                <Style $fill={fill} style={props?.style}>
                    <AnimatePresence mode="popLayout">
                        <>
                            {list?.map((data: ListItemType, i: number) => (
                                <ListItem
                                    key={data?.index || i}
                                    {...(data?.children && data)}
                                    motion={
                                        data?.motion && {
                                            ...(typeof data?.motion === "object" && data?.motion),
                                            layoutId: `${i}`,
                                        }
                                    }>
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
                    layout>
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
