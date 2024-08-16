"use client";
import { Root } from "lib/style";
import { styled } from "styled-components";

const Style = styled.div<{ $scale: number; $color: string; $size: number; $stroke?: number; $fill?: string | boolean }>`
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
            width: -webkit-fill-available;
            height: -webkit-fill-available;
            border-radius: 100%;
            ${({ $stroke, $fill, $color }) =>
        $fill
            ? `background:${typeof $fill === "string"
                ? $fill === Root.Color($fill)
                    ? $fill
                    : `rgb(${Root.Color($fill)})`
                : $color === Root.Color($color)
                    ? $color
                    : `rgb(${Root.Color($color)})`
            };`
            : `border: ${$stroke || 0.25}em solid ${$color && ($color === Root.Color($color) ? $color : `rgb(${Root.Color($color)})`)
            };`}

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
