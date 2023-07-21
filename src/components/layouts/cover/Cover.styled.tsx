"use client";
import { styled } from "styled-components";

const Style = styled.div<{ $height: number; $fullsize?: boolean }>`
    font-size: 1em;
    width: 100%;
    height: ${({ $fullsize, $height }) => ($fullsize ? "100%" : `${$height}em`)};
    overflow: hidden;
`;

export default Style;
