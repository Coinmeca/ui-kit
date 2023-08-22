"use client";
import { Fragment, useEffect, useState } from "react";
import Style, { Grid } from "./GridContainer.styled";
import GridContent from "./GridContent";
import { GridArea as Area } from "./GridContent.styled";
import { createGlobalStyle } from "styled-components";
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
    const gap = props?.gap || 0;
    const [grid, setGrid] = useState<string | undefined>();

    useEffect(() => {
        setGrid(Math.random().toString(16).substring(2));
    }, []);

    return (
        <Style $fullsize={props?.fullsize || false}>
            {grid && (
                <Grid
                    data-area={grid}
                    $area={props?.area}
                    $direction={props?.direction}
                    $gap={gap}
                    $width={props?.width}
                    $height={props?.height}
                    $responsive={props?.responsive}
                    style={props?.style}
                >
                    {props?.contents && props?.contents?.length > 0
                        ? props?.contents?.map((v: any, k: number) => (
                              <Fragment key={k}>
                                  <GridContent format={props?.format} {...v} />
                                  <GridArea
                                      {...{
                                          $parent: grid,
                                          $id: k,
                                          $area: v?.area,
                                          $responsive: v?.responsive,
                                      }}
                                  />
                              </Fragment>
                          ))
                        : props?.children && props.children?.length > 0
                        ? props?.children?.map((v: any, k: number) => (
                              <Fragment key={k}>
                                  <Fragment>{v}</Fragment>
                                  <GridArea
                                      {...{
                                          $parent: grid,
                                          $id: k,
                                          $area: v?.area,
                                          $responsive: v?.responsive,
                                      }}
                                  />
                              </Fragment>
                          ))
                        : props?.children}
                </Grid>
            )}
        </Style>
    );
}

const GridArea = createGlobalStyle<{
    $parent: string;
    $id: number;
    $area?: string;
    $responsive?: {
        device: "desktop" | "laptop" | "tablet" | "mobile";
        area?: string;
    }[];
}>`
    [data-area="${({ $parent }) => $parent}"] > *:nth-child(${({ $id }) =>
        `${$id + 1}`}){
        ${Area};  
    }
`;
