import { memo } from "react";
import { css, styled } from "styled-components";
import Style, { Test, Test2 } from "./GridContent.styled";

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
    const Content = (style: any) => {
        const Area = () => (
            <>
                {props?.children && typeof props?.children === "function" ? (
                    <>
                        <props.children data-active={props?.children?.props?.active} style={props?.children?.props?.style} children={props?.children?.props?.children} />a
                    </>
                ) : (
                    <>
                        <Style data-active={props?.children?.props?.active} style={props?.children?.props?.style} children={props?.children?.props?.children} />b
                    </>
                )}
            </>
        );

        if (props?.format && typeof props?.format === "function") {
            return (
                <props.format data-active={props?.props?.active} style={style} {...props?.props}>
                    <Area />c
                </props.format>
            );
        }

        return <Area />;
    };

    return <Content style={...Test2(props?.area, props?.responsive)} />;
}

export default memo(GridContent);
