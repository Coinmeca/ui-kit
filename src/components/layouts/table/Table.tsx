"use client";
import { Elements } from "components";
import { AnimatePresence, motion } from "motion/react";
import { JSX, ReactNode } from "react";
import Style, { NoData } from "./Table.styled";
import TableItem from "./TableItem";

export interface Table {
    list?: any;
    formatter?: Function;
    fallback?: string | ReactNode | JSX.Element;
    style?: object;
    fix?: boolean;
}

export default function Table(props: Table) {
    const fallback = props?.fallback || "There is no data.";

    return (
        <>
            {props?.list && typeof props?.list !== "string" && props?.list?.length > 0 ? (
                <AnimatePresence>
                    <Style $fix={props?.fix || false} style={props?.style}>
                        {(typeof props?.formatter === "function" ? props?.formatter(props?.list) : props?.list)?.map(
                            (data: any, i: number) => (
                                <TableItem
                                    key={data?.index || i}
                                    {...(data?.children && data)}
                                    as={motion.div}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        ease: "easeInOut",
                                        duration: 0.3,
                                    }}
                                    layout>
                                    {data?.children ? data?.children : data}
                                </TableItem>
                            ),
                        )}
                    </Style>
                </AnimatePresence>
            ) : (
                <NoData
                    key="fallback"
                    as={motion.div}
                    style={{ width: "100%", height: "100%", ...props?.style }}
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1, opacity: 0 }}
                    transition={{ ease: "easeInOut", duration: 0.3 }}>
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
