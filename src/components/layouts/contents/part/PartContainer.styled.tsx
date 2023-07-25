"use client";
import { styled } from "styled-components";

export const Part = styled.div<{ $state: boolean | null | undefined }>`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-width: 100%;
    max-width: 100%;
    min-height: 100%;
`;

export const Style = styled.div<{ $state: boolean | null | undefined }>`
    position: relative;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: 100%;

    & > * {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 100%;
        min-width: 100%;
        max-width: 100%;
        max-height: inherit;
        transition: 0.3s ease;
    }
`;

export default Style;
