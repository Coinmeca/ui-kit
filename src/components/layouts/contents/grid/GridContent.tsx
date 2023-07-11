"use client";
import { isValidElement, memo } from "react";
import { isFunctionTypeNode } from "typescript";
import Style from "./GridContent.styled";

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

function GridContent(props: GridContent) {
    const Content =
        props?.format && typeof props?.format === "function" ? (
            typeof props?.children !== "object" && isFunctionTypeNode(props?.children) ? (
                <props.format {...props?.props}>{props?.children}</props.format>
            ) : (
                "props.format(props?.children)"
            )
        ) : typeof props?.children === "function" ? (
            <props.children {...{ ...props?.children?.children?.props, ...props?.children?.props }}>{props?.children?.children}</props.children>
        ) : (
            <div {...props?.children?.props}>{typeof props?.children !== "object" && props?.children}</div>
        );

    return (
        <Style $area={props?.area} $responsive={props?.responsive} data-active={props?.children?.props?.active} {...props?.props}>
            {Content}
        </Style>
    );
}

export default memo(GridContent);
