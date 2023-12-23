"use client";
import { styled } from "styled-components";
import { Root } from "lib/style";

export const Logo = styled.a`
    max-width: max-content;
    @media all and (min-width: ${Root.Device.Desktop}px) {
        margin-left: calc(var(--unit) * 4);
    }

    @media all and (max-width: ${Root.Device.Tablet}px) {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
`;

export const Menu = styled.a``;

export const Style = styled.section`
    background: black;
    scroll-snap-align: end;
    padding: 4em;
`;

export default Style;
