"use client";
import { AnimationProps, motion, Transition } from "motion/react";
import Style, { Col, Row } from "./ListItem.styled";
import { useMemo } from "react";

export interface ListItem {
    index?: number | string;
    children?: any;
    gap?: number;
    style?: object;
    align?: "left" | "center" | "right";
    change?: string;
    onClick?: Function;
    motion:
        | boolean
        | (AnimationProps & {
              mode?: "popLayout" | "sync" | "wait" | undefined;
              transition?: Transition;
              layoutId?: string;
              layout?: boolean | "position" | "size" | "preserve-aspect";
              fit?: boolean;
              fix?: boolean;
          });
}

export default function ListItem(props: ListItem) {
    const ListRow = (data: any) => {
        return (
            data &&
            (typeof data !== "string" && data?.length > 0 ? (
                data?.map((v: any, k: number) => (
                    <Row
                        key={k}
                        title={v?.title}
                        $gap={typeof v?.gap === "undefined" ? 1 : v?.gap}
                        $change={v?.change}
                        $fit={v?.fit}
                        data-row={v?.align}
                        style={v?.style}
                        onClick={v?.onClick}>
                        {ListCol(v?.children || v)}
                    </Row>
                ))
            ) : typeof data === "string" ? (
                <span>{data}</span>
            ) : (
                data
            ))
        );
    };

    const ListCol = (data: any) => {
        return (
            data &&
            (typeof data !== "string" && data?.length > 0 ? (
                data?.map((v: any, k: number) => (
                    <Col
                        key={k}
                        title={v?.title}
                        $gap={typeof v?.gap === "undefined" ? 1 : v?.gap}
                        $change={v?.change}
                        $fit={v?.fit}
                        data-col={v?.align}
                        style={v?.style}
                        onClick={v?.onClick}>
                        {ListRow(v?.children || v)}
                    </Col>
                ))
            ) : typeof data === "string" ? (
                <span>{data}</span>
            ) : (
                data
            ))
        );
    };

    const handleClick = (e: any) => {
        if (typeof props?.onClick === "function") props?.onClick(props, e);
    };

    const m = useMemo(
        () => (typeof props?.motion === "object" ? props?.motion : !!props?.motion ? {} : undefined),
        [props?.motion],
    );

    return (
        <Style
            {...m}
            as={m ? motion.div : undefined}
            layoutId={m && `${m?.layoutId || crypto.randomUUID()}`}
            initial={m?.initial || (m && { scale: 0.9, opacity: 0 })}
            animate={m?.animate || (m && { scale: 1, opacity: 1 })}
            exit={m?.exit || (m && { scale: 0.9, opacity: 0 })}
            transition={
                m?.transition ||
                (!!motion && {
                    ease: "easeInOut",
                    duration: 0.15,
                })
            }
            layout={m?.layout || (m && "position")}
            $change={props?.change}
            $gap={typeof props?.gap === "undefined" ? 1 : props?.gap}
            $event={typeof props?.onClick === "function" ? true : false}
            style={props?.style}
            onClick={(e: any) => handleClick(e)}>
            {ListCol(props?.children)}
        </Style>
    );
}
