"use client";
import { styled } from "styled-components";
import { Root } from "lib/style";
import * as Row from "components/layouts/row/Row.styled";

export const Logo = styled.a`
    max-width: max-content;
`;

export const Style = styled.section`
    scroll-snap-align: end;
    position: relative;
    flex-direction: row;
    background: black;
    min-height: max-content !important;
    color: white;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding: 4em;
    padding-bottom: 8em;
    overflow: hidden;

    &:after {
        content: "";
        --range: 32em;
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        height: calc(150% + var(--range));
        box-shadow: inset 0px 0px var(--range) rgba(255, 255, 255, 0.15);
        pointer-events: none;
    }

    @media all and (max-width: ${Root.Device.Tablet}px) {
        & {
            padding-bottom: 8em;

            ${Row.default} {
                ${Row.default} {
                    ${Row.default} {
                        width: initial !important;
                        max-width: initial !important;
                        flex-basis: 33.333%;
                    }
                }
            }
        }
    }
`;

export default Style;
