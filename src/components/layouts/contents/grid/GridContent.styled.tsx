"use client";

import { Root } from "lib/style";
import { styled, css } from "styled-components";
import * as SlideContent from "components/layouts/contents/slide/SlideContent.styled";

const Responsive = (area?: string) => {
    return css`
        ${area && `grid-area: ${area};`}

        & {
            &[data-active="false"] {
                & > ${SlideContent.default} {
                    opacity: 0;
                    transform: translateX(-15%);
                    pointer-events: none;
                }
            }

            &[data-active="true"] {
                & > ${SlideContent.default} {
                    opacity: 1;
                    pointer-events: inherit;
                }
            }

            &[data-active="true"] ~ [data-active="false"] {
                & > ${SlideContent.default} {
                    transform: translateX(15%);
                }
            }
        }
    `;
};

const Style = styled.div<{
    $area?: string;
    $responsive?: {
        device: "desktop" | "laptop" | "tablet" | "mobile";
        area?: string;
    }[];
}>`
    position: relative;
    width: 100%;
    height: 100%;
    ${({ $area }) => $area && `grid-area: ${$area};`}

    && {
        & > * {
            width: 100%;
            height: 100%;
        }

        & > ${SlideContent.default} {
            opacity: 1;
            transform: translateX(0%);
            pointer-events: inherit;
        }
    }

    ${({ $responsive }) => {
        if ($responsive && $responsive.length > 0) {
            for (let i = 0; i < $responsive.length; i++) {
                switch ($responsive[i]?.device) {
                    case "laptop":
                        return css`
                            @media all and (max-width: ${Root.Device.Laptop}px) {
                                ${Responsive($responsive[i].area)}
                            }
                        `;
                    case "tablet":
                        return css`
                            @media all and (max-width: ${Root.Device.Tablet}px) {
                                ${Responsive($responsive[i].area)}
                            }
                        `;
                    case "mobile":
                        return css`
                            @media all and (max-width: ${Root.Device.Mobile}px) {
                                ${Responsive($responsive[i].area)}
                            }
                        `;
                }
            }
        }
    }}
`;

export const GridArea = css<{
    $area?: string;
    $responsive?: {
        device: "desktop" | "laptop" | "tablet" | "mobile";
        area?: string;
    }[];
}>`
    position: relative;
    width: 100%;
    height: 100%;
    ${({ $area }) => $area && `grid-area: ${$area};`}

    && {
        & > * {
            width: 100%;
            height: 100%;
        }

        & > ${SlideContent.default} {
            opacity: 1;
            transform: translateX(0%);
            pointer-events: inherit;
        }
    }

    ${({ $responsive }) => {
        if ($responsive && $responsive.length > 0) {
            for (let i = 0; i < $responsive.length; i++) {
                switch ($responsive[i]?.device) {
                    case "laptop":
                        return css`
                            @media all and (max-width: ${Root.Device.Laptop}px) {
                                ${Responsive($responsive[i].area)}
                            }
                        `;
                    case "tablet":
                        return css`
                            @media all and (max-width: ${Root.Device.Tablet}px) {
                                ${Responsive($responsive[i].area)}
                            }
                        `;
                    case "mobile":
                        return css`
                            @media all and (max-width: ${Root.Device.Mobile}px) {
                                ${Responsive($responsive[i].area)}
                            }
                        `;
                }
            }
        }
    }}
`;

export default Style;
