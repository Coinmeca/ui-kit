"use client";
import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Elements } from "components";
import Style, { NoData } from "./Table.styled";
import TableItem from "./TableItem";
import { useSort } from "hooks";
import { type Sorting } from "lib/utils";

export interface Table {
    list?: any;
    sort?: Sorting;
    fallback?: string | ReactNode | JSX.Element | Function;
    style?: object;
}

export default function Table(props: Table) {
    const { sorting } = useSort();
    const fallback = props?.fallback || "There is no data.";

    const list = sorting(props?.list);

    return (
        <Style style={props?.style}>
            <AnimatePresence>
                {list &&
                    (typeof list !== "string" && list?.length > 0 ? (
                        list?.map((data: any, i: number) => (
                            <TableItem
                                key={i}
                                {...(data?.children && data)}
                                as={motion.div}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    ease: "easeInOut",
                                    duration: 0.3,
                                }}
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
