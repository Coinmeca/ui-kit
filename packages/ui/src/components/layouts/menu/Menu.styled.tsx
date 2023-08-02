"use client";
import { Root } from "lib/style";
import { styled } from "styled-components";

export const Row = styled.div<{ $scale: number; $fix?: boolean }>`
    font-size: ${({ $scale }) => $scale}em;
    display: flex;
    width: 100%;
    overflow-x: scroll;
    overflow-style: none;
    ${({ $fix }) => !$fix && "overflow-x: scroll;"}

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Style = styled.div<{ $scale: number }>`
    font-size: ${({ $scale }) => $scale}em;
    display: flex;
    flex-direction: column;

    ${Row} + ${Row}:last-child:not(:only-child) {
        max-width: max-content;
        justify-content: flex-end;
    }
`;

export default Style;
