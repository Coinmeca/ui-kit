import { Root } from "lib/style";
import { styled, css } from "styled-components";

const Layout = (
    area?: string,
    direction?: "row" | "col",
    gap?: number | { row?: number; col?: number },
    width?: number | string | { min?: number | string; max?: number | string },
    height?: number | string | { min?: number | string; max?: number | string },
) => css`
    ${area &&
    `width:100%; height:100%; grid-template-areas: ${area}; ${
        typeof width === "string" && `grid-template-columns: ${width};`
    } ${typeof height === "string" && `grid-template-rows: ${height};`} overflow:hidden;`}

    ${direction === "row"
        ? `
        ${
            typeof width === "number"
                ? `grid-template-columns: ${width}em;`
                : typeof width === "object" &&
                  (width?.min || width?.max) &&
                  `grid-template-columns: repeat(auto-fill, minmax(${
                      typeof width?.min === "number" ? `${width.min}em` : width?.min ? `${width?.min}` : "1fr"
                  }, ${typeof width?.max === "number" ? `${width.max}em` : width.max ? `${width.max}` : "1fr"}));`
        }
        ${typeof height === "number" && `grid-auto-rows: ${height}em;`}
    `
        : direction === "col" &&
          `
        ${
            typeof height === "number"
                ? `grid-template-rows: ${height}em;`
                : typeof height === "object" &&
                  (height?.min || height?.max) &&
                  `grid-template-rows: repeat(auto-fill, minmax(${
                      typeof height?.min === "number" ? `${height.min}em` : height.min ? `${height.min}` : "1fr"
                  }, ${typeof height?.max === "number" ? `${height.max}em` : height.max ? `${height.max}` : "1fr"}));`
        }
        ${typeof width === "number" && `grid-auto-columns: ${width}em;`}
        `};

    ${typeof gap === "number"
        ? `gap: ${gap}em;`
        : `${typeof gap?.row === "number" ? `grid-row-gap: ${gap?.row}em;` : ""}${
              typeof gap?.col === "number" ? `grid-column-gap: ${gap?.col}em;` : ""
          }`}
`;

export const Grid = styled.div<{
    $area?: string;
    $direction?: "row" | "col";
    $gap: number | { row?: number; col?: number };
    $width?: number | string | { min?: number | string; max?: number | string };
    $height?: number | string | { min?: number | string; max?: number | string };
    $responsive?: {
        device: "desktop" | "laptop" | "tablet" | "mobile";
        area?: string;
        direction?: "row" | "col";
        gap?: number | { row?: number; col?: number };
        width?: number | string | { min?: number | string; max?: number | string };
        height?: number | string | { min?: number | string; max?: number | string };
    }[];
}>`
    position: relative;
    display: grid;
    transition: 0.3s ease;

    & > * {
        scroll-snap-align: start;

        &:last-child {
            scroll-snap-align: end;
        }
    }

    ${({ $area, $direction, $gap, $width, $height }) => Layout($area, $direction, $gap, $width, $height)}

    ${({ $responsive }) => {
        if ($responsive && $responsive.length > 0) {
            for (let i = 0; i < $responsive.length; i++) {
                switch ($responsive[i]?.device) {
                    case "laptop":
                        return css`
                            @media all and (max-width: ${Root.Device.Laptop}px) {
                                ${Layout(
                                    $responsive[i]?.area,
                                    $responsive[i]?.direction,
                                    $responsive[i]?.gap,
                                    $responsive[i]?.width,
                                    $responsive[i]?.height,
                                )}
                            }
                        `;
                    case "tablet":
                        return css`
                            @media all and (max-width: ${Root.Device.Tablet}px) {
                                ${Layout(
                                    $responsive[i]?.area,
                                    $responsive[i]?.direction,
                                    $responsive[i]?.gap,
                                    $responsive[i]?.width,
                                    $responsive[i]?.height,
                                )}
                            }
                        `;
                    case "mobile":
                        return css`
                            @media all and (max-width: ${Root.Device.Mobile}px) {
                                ${Layout(
                                    $responsive[i]?.area,
                                    $responsive[i]?.direction,
                                    $responsive[i]?.gap,
                                    $responsive[i]?.width,
                                    $responsive[i]?.height,
                                )}
                            }
                        `;
                }
            }
        }
    }}
`;

const Style = styled.div<{ $scroll: boolean; $fullsize: boolean }>`
    ${({ $fullsize }) =>
        $fullsize &&
        `
        width: 100%;
        height: 100%;

        & > * {
            width: 100%;
            height: 100%;
        }
    `}

    ${({ $scroll }) =>
        $scroll &&
        css`
            overflow: auto;
        `};

    scroll-snap-type: y mandatory;
    -webkit-overflow-scrolling: touch;
`;

export default Style;
