"use client";
import { styled } from "styled-components";
import * as InnerContent from "components/layouts/contents/inner/InnerContent.styled";
import { Root } from "lib/style";

const Style = styled.section<{ $width: number; $align: "left" | "right" }>`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: ${({ $align }) => ($align === "left" ? "row" : "row-reverse")};
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    overflow: hidden auto;
    scroll-snap-type: y mandatory;
    -webkit-overflow-scrolling: touch;
    pointer-events: none;
    z-index: 10;

    ${InnerContent.default} {
        max-width: ${({ $width }) => `calc(${$width}em - 6em)`};
        padding: 3em;
        gap: 2em;
        height: max-content;
    }

    @media all and (max-width: ${Root.Device.Mobile}px) {
        & {
            ${InnerContent.default} {
                max-width: ${({ $width }) => `calc(${$width} - 4em)`};
                padding: 2em;
                gap: 1em;
                height: max-content;
            }
        }
    }
`;

export default Style;
