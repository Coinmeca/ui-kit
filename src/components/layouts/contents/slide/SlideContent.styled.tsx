"use client";
import { css, styled } from "styled-components";

export const Style = styled.div<{ $offset: number; $vertical: boolean; $unit: "%" | "vw" | "vh" | "em" | "rem" }>`
    position: relative;
    /* display: flex; */
    /* flex-direction: column; */
    width: 100%;
    height: -webkit-fill-available;
    /* min-height: max-content; */
    overflow: hidden auto;
    scroll-snap-type: y mandatory;
    -webkit-overflow-scrolling: touch;
    transition: 0.3s ease;
    opacity: 1;

    ${({ $vertical, $offset, $unit }) => {
        const direction = $vertical ? "translateY" : "translateX";
        return css`
            &[data-active="false"] {
                transform: ${direction}(-${$offset}${$unit});
            }
            &[data-active="true"] ~ &[data-active="false"] {
                transform: ${direction}(${$offset}${$unit});
            }
        `;
    }}

    &[data-active="false"] {
        transform: translate;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        pointer-events: none;
        -webkit-user-drag: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    &[data-active="true"] {
        transform: translateX(0);
        pointer-events: inherit;
    }
`;

export default Style;
