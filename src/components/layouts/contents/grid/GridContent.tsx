"use client";
import { isValidElement, memo } from "react";
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

export default function GridContent(props: GridContent) {
    const Content = (props: any) => (isValidElement(props?.format) && props?.format) || (isValidElement(props?.children) && props?.children) || <div />;

    return (
        <Style $area={props?.area} $responsive={props?.responsive} data-active={props?.children?.props?.active}>
            <Content {...(props?.props || props?.children?.props || props)}>
                {(isValidElement(props?.props?.children) && props?.props?.children) || (isValidElement(props?.children?.children) && props?.children?.children) || (isValidElement(props?.children) && props?.children)}
            </Content>
        </Style>
    );
}
