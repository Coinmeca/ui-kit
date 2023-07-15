"use client";
import { styled } from "styled-components";

const Style = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    overflow: hidden auto;
    transition: 0.3s ease;
    opacity: 1;

    &[data-active="false"] {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transform: translateX(-15%);
        pointer-events: none;
        -webkit-user-drag: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    &[data-active="true"] ~ &[data-active="false"] {
        transform: translateX(15%);
    }

    &[data-active="true"] {
        transform: translateX(0);
        pointer-events: inherit;
    }
`;

export default Style;
