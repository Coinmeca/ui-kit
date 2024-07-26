"use client";
import { Root } from "lib/style";
import styled from "styled-components";

const Style = styled.div<{ $color: string; $padding: number }>`
    font-size: 1em;
    position: absolute;
    display: flex;
    flex-direction: column;
    padding: ${({ $padding }) => $padding}em;
    background: rgba(${({ $color }) => Root.Color($color)}, var(--o015));
    -webkit-backdrop-filter: var(--blur);
    backdrop-filter: var(--blur);
    transition: 0.15s ease;

    @media (prefers-color-scheme: light) {
        --white: 0, 0, 0;
        --black: 255, 255, 255;
        color: black;
    }

    @media (prefers-color-scheme: dark) {
        --white: 255, 255, 255;
        --black: 0, 0, 0;
        color: white;
    }
`;

export default Style;
