"use client";
import { Root } from "lib/style";
import styled, { css } from "styled-components";

export const Dot = styled.div<{ $active?: boolean; $size: number; $stroke: number | string; $effect?: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ $size }) => $size}em;
    width: 1em;
    height: 1em;
    border: ${({ $stroke }) => (typeof $stroke === "number" ? `${$stroke}em` : $stroke)} solid rgb(var(--theme));
    border-radius: ${({ $size }) => $size}em;
    transition: 0.3s ease;

    & > * {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 0%;
        height: 0%;
        border-radius: ${({ $size }) => $size}em;
        filter: blue(0.3em);

        &:after,
        &:before {
            content: "";
            position: absolute;
            background-color: rgb(var(--theme));
            width: 100%;
            height: 100%;
            border-radius: 100%;
            transform: scale(0);
            filter: blur(1em);
        }
    }

    ${({ $active, $effect }) =>
        $active &&
        css`
            ${!$effect && `background-color: rgb(var(--theme));`}

            & > * {
                width: 100%;
                height: 100%;
                animation: rotate 1 0.3s ease-in both;
                transition: 0.15s ease;
                filter: blue(0em);
                ${$effect && `background-color: rgb(var(--theme));`}

                &:before {
                    animation: shine_horizon 1 0.3s ease both;
                }

                &:after {
                    animation: shine_vertical 1 0.3s ease both;
                }
            }
        `}

    @keyframes shine_horizon {
        0% {
            transform: scale(0);
            filter: blur(1em);
            opacity: 0;
        }
        75% {
            transform: scale(5, 0.5);
            filter: blur(0.75em);
            opacity: 0.8;
        }
        100% {
            transform: scale(1, 1);
            filter: blur(0);
            opacity: 1;
        }
    }

    @keyframes shine_vertical {
        0% {
            transform: scale(0);
            filter: blur(1em);
            opacity: 0;
        }
        75% {
            transform: scale(0.5, 5);
            filter: blur(0.75em);
            opacity: 0.8;
        }
        100% {
            transform: scale(1, 1);
            filter: blur(0);
            opacity: 1;
        }
    }

    @keyframes rotate {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(90deg);
        }
    }
`;

const Style = styled.div<{
    $width?: number | string;
    $scale: number;
    $gap: number | string;
    $padding: number;
    $color: string;
    $error?: boolean;
}>`
    ${({ $color, $error }) => {
        return css`
            --theme: ${$error
                ? "var(--red)"
                : $color === "white"
                ? "var(--black)"
                : $color === "black"
                ? "var(--white)"
                : $color === Root.Color($color)
                ? $color
                : Root.Color($color)};
        `;
    }};

    ${({ $error }) =>
        $error &&
        css`
            animation: shake-horizon 1 0.6s ease;
        `}

    font-size: ${({ $scale }) => $scale}em;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ $gap }) => (typeof $gap === "number" ? `${$gap || 2}em` : $gap)};
    padding: ${({ $padding }) => `${$padding}em`};
    transition: 0.3s ease;

    ${({ $width }) => $width && `max-width: ${typeof $width === "number" ? `${$width}em` : $width};`}

    @keyframes shake-horizon {
        0% {
            transform: translateX(-7.5%);
        }
        6.25% {
            transform: translateX(7.5%);
        }
        12.5% {
            transform: translateX(-3.75%);
        }
        18.75% {
            transform: translateX(3.75%);
        }
        25% {
            transform: translateX(-1.875%);
        }
        31.25% {
            transform: translateX(1.875%);
        }
        37.5% {
            transform: translateX(-0.9375%);
        }
        43.75% {
            transform: translateX(0.9375%);
        }
        50% {
            transform: translateX(-0.46875%);
        }
        56.25% {
            transform: translateX(0.46875%);
        }
        62.5% {
            transform: translateX(-0.234375%);
        }
        68.75% {
            transform: translateX(0.234375%);
        }
        75% {
            transform: translateX(-0.1171875%);
        }
        81.25% {
            transform: translateX(0.1171875%);
        }
        87.5% {
            transform: translateX(-0.05859375%);
        }
        93.75% {
            transform: translateX(0.05859375%);
        }
        100% {
            transform: translateX(0%);
        }
    }
`;

export default Style;
