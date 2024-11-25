"use client";

import { styled, css } from "styled-components";
import { Root } from "lib/style";
import * as Icon from "components/elements/icon/Icon.styled";
import * as Box from "components/layouts/box/Box.styled";

const Style = styled.button<{
    $type?: "glass" | "line" | "solid";
    $align?: "left" | "center" | "right";
    $color: string;
    $scale: number;
    $fit?: boolean;
    $hide: boolean;
    $disabled?: boolean;
}>`
    ${({ $color }) => {
        return css`
            --theme: ${$color === "white"
                ? "var(--black)"
                : $color === "black"
                ? "var(--white)"
                : $color === Root.Color($color)
                ? $color
                : Root.Color($color)};
        `;
    }};

    position: relative;
    font-size: ${({ $scale }) => $scale}em;
    font-weight: bold;
    ${({ $fit }) => $fit && "max-width: max-content"};
    min-width: max-content;
    padding: 0.5em 1em;
    cursor: pointer;
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: 0.3s ease;

    & > * {
        display: flex;
        align-items: center;
        justify-content: ${({ $align }) => ($align === "left" ? "flex-start" : $align === "right" ? "flex-end" : "center")};
        width: 100%;
        min-width: 2em;
        min-height: 3em;
        gap: 1em;

        & > ${Icon.default} {
            &:only-child {
                margin-left: -0.1em;
                margin-right: -0.1em;
            }
        }

        & > span {
            font-size: 1.5em;
            transition: none;
        }
    }

    ${({ $type, $color }) => {
        switch ($type) {
            case "glass":
                const glass: string = $color === "black" ? "var(--white)" : "var(--theme)";
                return css`
                    background: rgba(${glass}, var(--o015));
                    color: rgb(${glass});
                    & ${Icon.default} svg {
                        fill: rgb(${glass});
                    }
                    &:hover {
                        background: rgba(${glass}, var(--o03));
                    }
                    &:active {
                        background: rgba(${glass}, var(--o06));
                    }
                `;
            case "line":
                const line: string = $color === "black" ? "var(--white)" : "var(--black)";
                return css`
                    background: transparent;
                    border: 1px solid;
                    border-color: rgb(var(--theme));
                    color: rgb(var(--theme));
                    & ${Icon.default} svg {
                        fill: rgb(var(--theme));
                    }
                    &:hover {
                        background: rgba(var(--theme), var(--o1));
                        color: ${$color === "black" ? "rgb(var(--black))" : "rgb(var(--white))"};
                        & ${Icon.default} svg {
                            fill: ${$color === "black" ? "rgb(var(--black))" : "rgb(var(--white))"};
                        }
                    }
                    &:active {
                        background: rgba(var(--theme), var(--o06));
                        border-color: rgba(var(--theme), var(--o06));
                    }
                    .box &:active {
                        color: rgb(var(--dim));
                    }
                `;
            case "solid":
                const solid: string = $color === "black" ? "var(--white)" : "var(--black)";
                const box_solid: string = $color === "white" ? "var(--white)" : "var(--black)";
                return css`
                    background: rgb(var(--theme), var(--o1));
                    color: rgba(${solid});
                    & ${Icon.default} svg {
                        fill: rgb(${solid});
                    }

                    &:hover {
                        background: rgba(var(--theme), var(--o075));
                    }
                    &:active {
                        background: rgba(var(--theme), var(--o045));
                    }

                    ${Box.default} & {
                        color: rgba(${box_solid});
                        & ${Icon.default} svg {
                            fill: rgb(${box_solid});
                        }
                    }
                `;
            default:
                return css`
                    background: transparent;
                    color: rgba(var(--theme), var(--o045));
                    & ${Icon.default} svg {
                        fill: rgba(var(--theme), var(--o045));
                    }
                    &:hover {
                        color: rgba(var(--theme), var(--o1));
                        & ${Icon.default} svg {
                            fill: rgba(var(--theme), var(--o1));
                        }
                    }
                    &:active {
                        background: rgba(var(--theme), var(--o015));
                    }
                `;
        }
    }}

    ${({ $disabled }) => {
        return (
            $disabled &&
            css`
                opacity: 0.15;
                cursor: initial;
                pointer-events: none !important;
            `
        );
    }}

    ${({ $hide }) => {
        return (
            $hide &&
            css`
                display: none;
                max-width: 0;
                max-height: 0;
                opacity: 0;
                cursor: initial;
                pointer-events: none !important;
            `
        );
    }}
`;

export default Style;
