"use client";
import { css, styled } from "styled-components";

const Style = styled.main<{ $active?: boolean; $scroll?: boolean; $snap?: boolean }>`
    ${({ $active }) => $active === false && "transform: translateX(-100%);"}
    ${({ $scroll }) =>
        $scroll &&
        css`
            overflow: hidden auto;
            -webkit-overflow-scrolling: touch;
        `}
    ${({ $snap }) => $snap && "scroll-snap-type: y mandatory;"} 

    transition: 0.3s ease;
`;

export default Style;
