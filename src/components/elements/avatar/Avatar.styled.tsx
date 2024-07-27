"use client";
import { styled } from "styled-components";
import { Root } from "lib/style";

const Style = styled.div<{ $scale: number; $color: string; $size: number }>`
    font-size: ${({ $scale }) => $scale}em;
    display: flex !important;
    align-items: center;
    gap: 1em;

    & > div {
        position: relative;
        min-width: ${({ $size }) => $size}em;
        min-height: ${({ $size }) => $size}em;
        max-width: ${({ $size }) => $size}em;
        max-height: ${({ $size }) => $size}em;
        border-radius: 100%;
        aspect-ratio: 1 / 1;
        overflow: hidden;

        & > span {
            display: flex;
            align-items: center;
            justify-content: center;
            height: calc(100% - 0.5em);
            border: 0.25em solid ${({ $color }) => $color && ($color === Root.Color($color) ? $color : `rgb(${Root.Color($color)})`)};
            border-radius: 100%;

            & > span {
                font-size: 1.5em;
                font-weight: bolder;
                font-feature-settings: initial;
                color: ${({ $color }) => $color && ($color === Root.Color($color) ? $color : `rgb(${Root.Color($color)})`)};
            }
        }

        & > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 1;
        }
    }

    & > span {
        font-size: 1.5em;
        font-weight: bold;
        font-feature-settings: initial;
    }
`;

export default Style;
