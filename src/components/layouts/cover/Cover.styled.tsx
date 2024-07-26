"use client";
import { Root } from "lib/style";
import { styled } from "styled-components";

const Style = styled.div<{ $height: number; $fullsize?: boolean }>`
    position: relative;
    font-size: 1em;
    width: 100%;
    height: ${({ $fullsize, $height }) => ($fullsize ? "100%" : `${$height}em`)};
    min-height: ${({ $fullsize, $height }) => ($fullsize ? "100%" : `${$height}em`)};
    max-height: ${({ $fullsize, $height }) => ($fullsize ? "100%" : `${$height}em`)};
    overflow: hidden;

    @media all and (max-width: ${Root.Device.Mobile}px) {
        ${({ $fullsize, $height }) => !$fullsize && `height: ${$height * 0.75}em`};
        ${({ $fullsize, $height }) => !$fullsize && `min-height: ${$height * 0.75}em`};
        ${({ $fullsize, $height }) => !$fullsize && `max-height: ${$height * 0.75}em`};
    }
`;

export default Style;
