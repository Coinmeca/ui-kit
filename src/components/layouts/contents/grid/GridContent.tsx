import { Fragment, memo, ReactNode } from "react";
import { createGlobalStyle, css, styled } from "styled-components";
import Style, { Test, Test2, Test3 } from "./GridContent.styled";

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
    const Child = props?.children?.type !== Fragment && ((props?.children?.$$typeof && props.children) || (props.children?.children?.$$type && props.children.children));
    const Content = Child ? (
        <Child.type $area={props?.area} $responsive={props?.responsive} data-active={props?.props?.active}>
            {props?.children?.children || props?.children}
        </Child.type>
    ) : (
        <div data-active={props?.props?.active}>{props?.children?.children || props?.children}</div>
    );

    const Format =
        (typeof props?.format === "function" &&
            props?.format({
                ...props?.props,
                children: Content?.props?.children || Content,
            })) ||
        (props?.format?.$$typeof && (props?.format?.type !== Fragment ? <props.format.type children={Content?.props?.children || Content} {...props?.props} /> : Content));

    if (Format) return <>{Format}</>;
    return <>{Content}</>;
}

export default memo(GridContent);
