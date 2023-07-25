"use client";
import { styled } from "styled-components";
import * as Button from "components/controls/button/Button.styled";
import * as InnerContent from "components/layouts/contents/inner/InnerContent.styled";
import { Root } from "lib/style";

export const ButtonArea = styled.div`
    display: flex;
    flex-direction: row;
    width: -webkit-fill-available;
    gap: 4em;
    margin: 2em -2em -2em;

    & > * {
        flex: 1;
    }

    @media all and (max-width: ${Root.Device.Mobile}px) {
        gap: 2em;
    }
`;

export const Close = styled.div`
    position: absolute;
    top: 0;
    right: 0;

    & > ${Button.default} {
        padding: 1em 1.5em;
    }
`;

const Style = styled.div<{ $width: { min: number; max: number }; $active: boolean }>`
    font-size: var(--unit);
    position: ${({ $active }) => ($active ? "relative" : "absolute")};
    display: flex;
    background: rgb(var(--dim));
    min-width: ${({ $width }) => $width?.min}em;
    max-width: ${({ $width }) => $width?.max}em;
    max-height: -webkit-fill-available;
    margin: 4em;
    transform: ${({ $active }) => ($active ? "scale(1,1)" : "scale(0.9, 0.9)")};
    opacity: ${({ $active }) => ($active ? "1" : "0")};
    pointer-events: ${({ $active }) => ($active ? "inherit" : "none")};
    overflow: hidden;
    transition: 0.3s ease;

    & > * {
        display: flex;
        flex-direction: column;
        width: -webkit-fill-available;
        gap: 2em;
        padding: 4em;
        transition: 0.3s ease;
    }

    & > * > ${InnerContent.default} {
        /* margin-top: 2em; */
        // font-size: 1.5em;
        align-items: center;
        text-align: center;
        transition: 0.3s ease;
    }

    @media all and (max-width: ${Root.Device.Mobile}px) {
        min-width: calc(100% - 4em);
        max-width: calc(100% - 4em);
        margin: 2em;

        & > * {
            padding: 4em 2em 2em;
        }

        & > ${ButtonArea} {
            padding: 2em;
        }
    }
`;
export default Style;
