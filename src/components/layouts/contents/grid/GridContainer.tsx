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

const GridStyle = createGlobalStyle<{
    $parent: string;
    $id: number;
    $area?: string;
    $responsive?: {
        device: "desktop" | "laptop" | "tablet" | "mobile";
        area?: string;
    }[];
}>`
    #${({ $parent }) => $parent} > *:nth-child(${({ $id }) => `${$id + 1}`}){
        ${GridArea};  
    }
`;

export default function GridContainer(props: GridContainer) {
    const gap = props?.gap || 4;
    const grid = useId().replaceAll(":", "");

    return (
        <Style $fullsize={props?.fullsize || false}>
            <Grid id={grid} $area={props?.area} $direction={props?.direction} $gap={gap} $width={props?.width} $height={props?.height} $responsive={props?.responsive} style={props?.style}>
                <>
                    {props?.contents && props?.contents?.length > 0
                        ? props?.contents?.map((v: any, k: number) => (
                              <Fragment key={k}>
                                  <GridContent className={k} format={props?.format} {...v} />
                                  <GridStyle {...{ $parent: grid, $id: k, $area: v?.area, $responsive: v?.responsive }} />
                              </Fragment>
                          ))
                        : props?.children && props.children?.length > 0
                        ? props?.children?.map((v: any, k: number) => (
                              <Fragment key={k}>
                                  <Fragment>{v}</Fragment>
                                  <GridStyle {...{ $parent: grid, $id: k, $area: v?.area, $responsive: v?.responsive }} />
                              </Fragment>
                          ))
                        : props?.children}
                </>
            </Grid>
        </Style>
    );
}
