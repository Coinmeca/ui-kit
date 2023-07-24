"use client";
import { styled } from "styled-components";

const Style = styled.div<{ $width: number; $height: number }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4em 0;
    width: 100%;
    height: 100%;

    & > img {
        width: ${({ $width }) => $width}em;
        height: ${({ $height }) => $height}em;
        margin: 4em 0;
    }
`;

export default Style;
