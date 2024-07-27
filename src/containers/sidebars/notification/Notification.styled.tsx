"use client";
import { styled } from "styled-components";
import * as InnerContent from "components/layouts/contents/inner/InnerContent.styled";
import { Root } from "lib/style";

const Style = styled.section`
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    overflow: hidden auto;
    scroll-snap-type: y mandatory;
    -webkit-overflow-scrolling: touch;

    ${InnerContent.default} {
        padding: 3em;
        gap: 2em;
        height: max-content;
    }

    @media all and (max-width: ${Root.Device.Mobile}px) {
        & {
            ${InnerContent.default} {
                padding: 2em;
                gap: 1em;
                height: max-content;
            }
        }
    }
`;

export default Style;
