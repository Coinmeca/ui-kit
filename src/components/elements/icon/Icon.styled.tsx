"use client";
import { Root } from "lib/style";
import { styled } from "styled-components";

export const Count = styled.span<{ $color: string }>`
    background: rgb(${({ $color }) => Root.Color($color)});
    color: black;
    text-align: center;
    position: absolute;
    top: -0.5em;
    right: -0.5em;
    font-size: 0.5em;
    padding: 0 0.25em;
    min-width: 0.75em;
    border-radius: 1em;
`;

const Style = styled.i<{ $color?: string; $scale?: number }>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: initial;
    font-size: ${({ $scale }) => ($scale || 1) * 2.5}em;
    width: 1em;
    height: 1em;
    aspect-ratio: 1/1;

    & svg {
        width: 100%;
        height: 100%;
        fill: ${({ $color }) => $color};
        transition: 0.3s ease;
    }
`;

export default Style;
