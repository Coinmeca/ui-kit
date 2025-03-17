"use client";
import { css, styled } from "styled-components";

export const AddOn = styled.span<{
    $top?: number | string;
    $left?: number | string;
    $right?: number | string;
    $bottom?: number | string;
    $fix?: boolean;
}>`
    position: absolute;
    ${({ $top }) => $top && (typeof $top === "number" ? `top: ${$top}em;` : `top: ${$top};`)}
    ${({ $left }) => $left && (typeof $left === "number" ? `left: ${$left}em;` : `left: ${$left};`)}
    ${({ $right }) => $right && (typeof $right === "number" ? `right: ${$right}em;` : `right: ${$right};`)}
    ${({ $bottom }) => $bottom && (typeof $bottom === "number" ? `bottom: ${$bottom}em;` : `bottom: ${$bottom};`)}
    transition:.3s ease;
    z-index: 1;

    ${({ $fix }) =>
        !$fix &&
        css`
            opacity: 0;
            pointer-events: none;
        `}

    *:hover > & {
        opacity: 1;
        pointer-events: initial;
    }
`;

const Style = styled.button<{
    $scale: number;
    $padding: number;
    $gap: number;
    $hover: boolean;
    $event: boolean;
}>`
    position: relative;
    display: flex;
    flex-direction: column;
    background: transparent;
    font-size: ${({ $scale }) => $scale}em;

    & > div {
        display: flex;
        flex-direction: column;
        transition: 0.3s ease;
        padding: ${({ $padding }) => $padding}em;

        ${({ $gap }) => $gap && `gap: ${$gap}em;`}

        ${({ $event }) => $event && `cursor: pointer`};
    }

    ${({ $hover, $event }) =>
        ($hover || $event) &&
        css`
            &:hover > div {
                background: rgba(var(--white), var(--o0075)) !important;
            }
        `}

    ${({ $event }) =>
        $event &&
        css`
            & > div:active {
                background: rgba(var(--white), var(--o015)) !important;
                transform: scale(0.96, 0.96);
                transition: 0.15s ease;
            }
        `}
`;

export default Style;
