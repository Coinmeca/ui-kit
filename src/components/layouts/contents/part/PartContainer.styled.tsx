"use client";
import { styled } from "styled-components";

export const Part = styled.div<{ $state: boolean | null }>`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 100%;
    min-height: 100%;
    height: 100%;
`;

export const Style = styled.div<{ $state: boolean | null }>`
    position: relative;
    width: 100%;
    height: 100%;

    & > * {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        height: 100%;
        max-height: inherit;
        transition: 0.3s ease;
    }
`;

export default Style;
