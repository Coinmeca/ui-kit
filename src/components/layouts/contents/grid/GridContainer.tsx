"use client";
import { Fragment } from "react";
import Style, { Grid } from "./GridContainer.styled";
import GridContent from "./GridContent";
import type { GridContent as Content } from "./GridContent";

export interface GridContainer {
    format?: any;
    contents?: Content[];
    children?: any;
    area?: string;
    direction?: "row" | "col";
    gap?: number | { row?: number; col?: number };
    width?: number | string | { min?: number; max?: number };
    height?: number | string | { min?: number; max?: number };
    responsive?: {
        device: "desktop" | "laptop" | "tablet" | "mobile";
        area?: string;
        direction?: "row" | "col";
        gap?: number | { row?: number; col?: number };
        width?: number | string | { min?: number; max?: number };
        height?: number | string | { min?: number; max?: number };
    }[];
    style?: object;
    fullsize?: boolean;
}

export default function GridContainer(props: GridContainer) {
    const gap = props?.gap || 4;

    return (
        <Style $fullsize={props?.fullsize || false}>
            <Grid $area={props?.area} $direction={props?.direction} $gap={gap} $width={props?.width} $height={props?.height} $responsive={props?.responsive} style={props?.style}>
                {props?.contents && props?.contents?.length > 0
                    ? props?.contents?.map((v: any, k: number) => <GridContent key={k} format={props?.format} {...v} />)
                    : props?.children && props.children?.length > 0
                    ? props?.children?.map((v: any, k: number) => <Fragment key={k}>{v}</Fragment>)
                    : props?.children}
            </Grid>
        </Style>
    );
}
