"use client";
import { styled, css } from "styled-components";
import { Root } from "lib/style";

const gap = css`
    gap: var(--gap);

    & > & {
        gap: calc(var(--gap) / 2);

        & > & {
            gap: calc(var(--gap) / 4);

            & > & {
                gap: calc(var(--gap) / 8);

                & > & {
                    gap: calc(var(--gap) / 16);

                    & > & {
                        gap: calc(var(--gap) / 32);

                        & > & {
                            gap: calc(var(--gap) / 64);
                        }
                    }
                }
            }
        }
    }
`;
const Style = styled.div<{
    $gap: number;
    $change?: string;
    $responsive?: "desktop" | "laptop" | "tablet" | "mobile";
    $reverse?: boolean;
    $fill: boolean;
    $fit: boolean;
    $fix?: boolean;
}>`
    --gap: ${({ $gap }) => ($gap === 0 ? 0 : $gap || 4)}em;

    ${({ $change }) => $change && `--change: ${Root.Color($change)};`}

    display: flex;
    flex-flow: ${({ $fix, $reverse }) => ($fix ? "row" : $reverse ? "row-reverse wrap" : "row wrap")};
    ${({ $fit, $fill }) => ($fit ? "width: max-content" : $fill ? "width: -webkit-fill-available" : "")};
    ${({ $fill }) => ($fill ? "height:100%" : "height: max-content;")};
    min-width: ${({ $fit }) => ($fit ? "max-content" : "initial")};
    max-width: ${({ $fit }) => ($fit ? "max-content" : "initial")};

    & > * {
        ${({ $fit }) => !$fit && "flex: 1;"}
    }

    gap: calc(var(--gap));

    & > & {
        gap: calc(var(--gap) / 2);

        & > & {
            gap: calc(var(--gap) / 4);

            & > & {
                gap: calc(var(--gap) / 8);

                & > & {
                    gap: calc(var(--gap) / 16);

                    & > & {
                        gap: calc(var(--gap) / 32);
                    }
                }
            }
        }
    }

    ${({ $responsive, $reverse, $fix }) => {
        switch ($responsive) {
            case "laptop":
                return css`
                    @media all and (max-width: ${Root.Device.Laptop}px) {
                        flex-flow: ${$reverse
                            ? $fix
                                ? "column-reverse"
                                : "column-reverse wrap"
                            : $fix
                            ? "column"
                            : "column wrap"};
                        ${gap}
                    }
                `;
            case "tablet":
                return css`
                    @media all and (max-width: ${Root.Device.Tablet}px) {
                        flex-flow: ${$reverse
                            ? $fix
                                ? "column-reverse"
                                : "column-reverse wrap"
                            : $fix
                            ? "column"
                            : "column wrap"};
                        ${gap}
                    }
                `;
            case "mobile":
                return css`
                    @media all and (max-width: ${Root.Device.Mobile}px) {
                        flex-flow: ${$reverse
                            ? $fix
                                ? "column-reverse"
                                : "column-reverse wrap"
                            : $fix
                            ? "column"
                            : "column wrap"};
                        ${gap}
                    }
                `;
        }
    }}

    @media all and(max-width: ${Root.Device.Mobile}px) {
        ${gap}
    }
`;

export default Style;
