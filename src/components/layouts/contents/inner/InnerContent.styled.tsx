"use client";
import { css, styled } from "styled-components";

const Style = styled.div<{
    $padding: { top: number; left: number; right: number; bottom: number };
    $scroll?: boolean;
}>`
    position: relative;
    display: flex;
    flex-direction: column;
    width: -webkit-fill-available;
    ${({ $scroll }) => ($scroll === false ? "overflow: hidden;" : "overflow: hidden auto;")}

    ${({ $padding }) => css`
        padding: ${$padding?.top}em ${$padding?.right}em ${$padding?.bottom}em ${$padding?.left}em;
        height: calc(100% - ${$padding?.top + $padding?.bottom}em);
    `}
`;

export default Style;
