"use client";
import { Fragment, memo } from "react";

export interface GridContent {
    format?: any;
    area: string;
    style?: object;
    children?: any;
    props?: any;
    responsive?: {
        device: "desktop" | "laptop" | "tablet" | "mobile";
        area?: string;
    }[];
}

const GridContent = (props: GridContent) => {
    const Child =
        (props?.children?.children?.type !== Fragment &&
            props.children?.children?.$$typeof &&
            props?.children?.children?.type) ||
        (props?.children?.type !== Fragment && props?.children?.$$typeof && props?.children?.type);
    const Content = Child ? (
        <Child
            {...{
                ...(props?.children?.props || props?.children?.children?.props),
            }}>
            {props?.children?.props?.children || props?.children?.children}
        </Child>
    ) : (
        <div
            {...{
                ...(props?.children?.props || props?.children?.children?.props),
            }}>
            {props?.children?.children || props?.children}
        </div>
    );

    const Area =
        (typeof props?.format === "function" &&
            props?.format({
                ...props?.props,
                children: Content?.props?.children || Content,
            })) ||
        (props?.format?.$$typeof && props?.format?.type !== Fragment ? (
            <props.format.type {...props?.props}>{Content?.props?.children || Content}</props.format.type>
        ) : (
            Content
        ));

    return Area;
};

export default memo(GridContent);
