"use client";
import { Fragment, useId } from "react";
import { createGlobalStyle } from "styled-components";
import Style, { Grid } from "./GridContainer.styled";
import type { GridContent as Content } from "./GridContent";
import GridContent from "./GridContent";
import { GridArea } from "./GridContent.styled";

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
            <Grid $area={props?.area} $contents={(props?.contents && props?.contents?.length > 0) && props?.contents?.map((c: Content) => c.area) || []} $direction={props?.direction} $gap={gap} $width={props?.width} $height={props?.height} $responsive={props?.responsive} style={props?.style}>
                <>
                    {props?.contents && props?.contents?.length > 0
                        ? props?.contents?.map((v: any, k: number) => (
                            <Fragment key={k}>
                                <GridContent className={k} format={props?.format} {...v} />
                            </Fragment>
                        ))
                        : props?.children && props.children?.length > 0
                            ? props?.children?.map((v: any, k: number) => (
                                <Fragment key={k}>
                                    <Fragment>{v}</Fragment>
                                </Fragment>
                            ))
                            : props?.children}
                </>
            </Grid>
        </Style>
    );
}
