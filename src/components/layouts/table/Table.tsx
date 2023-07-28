"use client";
import { ReactNode } from "react";
import { Elements } from "components";
import { AnimatePresence, motion } from "framer-motion";
import Style, { NoData } from "./Table.styled";
import TableItem from "./TableItem";

export interface Table {
    list?: any[];
    fallback?: string | ReactNode | JSX.Element | Function;
    style?: object;
}

export default function Table(props: Table) {
    const fallback = props?.fallback || "There is no data.";

    return (
        <Style style={props?.style}>
            <AnimatePresence mode="popLayout">
                {props?.list &&
                    (typeof props?.list !== "string" && props?.list?.length > 0 ? (
                        props?.list?.map((data: any, i: number) => (
                            <TableItem
                                key={i}
                                {...(data?.children && data)}
                                as={motion.div}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ ease: "easeInOut", duration: 0.3 }}
                                layout
                            >
                                {data?.children ? data?.children : data}
                            </TableItem>
                        ))
                    ) : (
                        <NoData
                            key="fallback"
                            as={motion.div}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
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
                    ))}
            </AnimatePresence>
        </Style>
    );
}
