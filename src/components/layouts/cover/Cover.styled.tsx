"use client";
import { styled } from "styled-components";

const Style = styled.div<{ $height: number; $fullsize?: boolean }>`
    width: 100%;
    height: ${({ $fullsize, $height }) => ($fullsize ? "100%" : `${$height}px`)};
    overflow: hidden;
`;

export default Style;
