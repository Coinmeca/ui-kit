"use client";
import { css, styled } from "styled-components";
import * as Button from "components/controls/button/Button.styled";
import * as InnerContent from "components/layouts/contents/inner/InnerContent.styled";
import * as Box from "components/layouts/box/Box.styled";
import { Root } from "lib/style";

export const ButtonArea = styled.div<{ $gap?: number }>`
    display: flex;
    flex-direction: row;
    width: -webkit-fill-available;
    gap: ${({ $gap }) => `${$gap || 2}em`};
    /* margin: 2em -2em -2em; */
    margin-top: -2em;

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

const Style = styled.div<{ $width: { min: number; max: number }; $active: boolean; $fullsize?: boolean }>`
    font-size: var(--unit);
    position: ${({ $active }) => ($active ? "relative" : "absolute")};
    display: flex;
    background: rgb(var(--dim));
    min-width: ${({ $width }) => $width?.min}em;
    max-width: ${({ $width }) => $width?.max}em;
    max-height: -webkit-fill-available;
    margin: ${({ $fullsize }) => ($fullsize ? 0 : 4)}em;
    transform: ${({ $active }) => ($active ? "scale(1,1)" : "scale(0.9, 0.9)")};
    opacity: ${({ $active }) => ($active ? "1" : "0")};
    pointer-events: ${({ $active }) => ($active ? "inherit" : "none")};
    overflow: hidden;
    transition: 0.3s ease;

    ${({ $fullsize }) =>
        $fullsize &&
        css`
            min-width: -webkit-fill-available;
            min-height: -webkit-fill-available;
        `}

    & > * {
        display: flex;
        width: -webkit-fill-available;
        max-height: -webkit-fill-available;
        transition: 0.3s cubic-bezier(0.33, 0, 0, 1);

        & > * {
            display: flex;
            flex-direction: column;
            width: -webkit-fill-available;
            height: -webkit-fill-available;
            gap: 4em;
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
    }

    & > ${Box.default} {
        background: rgba(var(--white), var(--o0045));
    }
    --change: var(--white);

    @media (prefers-color-scheme: light) {
        --white: 0, 0, 0;
        --black: 255, 255, 255;
        color: black;

        & {
            ::-webkit-scrollbar {
                width: 4px;
            }

            ::-webkit-scrollbar-track {
                box-shadow: inset 0 0 0 rgba(var(--black), var(--o03));
            }

            ::-webkit-scrollbar-thumb {
                box-shadow: inset 0 0 2rem rgba(var(--white), var(--o03));
            }
        }
    }

    @media (prefers-color-scheme: dark) {
        --white: 255, 255, 255;
        --black: 0, 0, 0;
        color: white;
    }

    @media all and (max-width: 640px) {
        ${({ $fullsize }) =>
            !$fullsize &&
            css`
                min-width: calc(100% - 4em);
                max-width: calc(100% - 4em);
                margin: 2em;
            `}

        & > * > * {
            padding: 3em;
        }

        & > * > ${ButtonArea} {
            padding: 2em;
        }

        /* & *:last-child > ${Button.default} {
            margin-bottom: -1em;
        } */
    }
`;
export default Style;
