"use client";
import { styled, css } from "styled-components";
import { Root } from "lib/style";
import * as Page from "components/layouts/page/Page.styled";
import * as SlideContainer from "components/layouts/contents/slide/SlideContainer.styled";
import * as InnerContent from "components/layouts/contents/inner/InnerContent.styled";

const Style = styled.div<{ $change?: string; $fit?: boolean }>`
    transition: 0.3s ease;

    ${({ $change }) => $change && `--change: ${$change};`}

    ${Page.default} > &,
    ${Page.default} > ${SlideContainer.default} > * > & {
        display: flex;
        flex-direction: column;
        background: rgb(var(--dim));
        color: rgba(var(--black));
        width: -webkit-fill-available;
        ${({ $fit }) => ($fit ? `height: calc(100% - 8em); min-height: max-content;` : `height: max-content; min-height: calc(100% - 8em);`)}

        padding: 4em;
        gap: 4em;

        @media (prefers-color-scheme: light) {
            --white: 0, 0, 0;
            --black: 255, 255, 255;
            color: black;
        }

        @media (prefers-color-scheme: dark) {
            --white: 255, 255, 255;
            --black: 0, 0, 0;
            color: white;
        }

        @media all and (min-width: ${Root.Device.Desktop}px) {
            padding: 4em 8em;
        }

        @media all and (max-width: ${Root.Device.Mobile}px) {
            ${({ $fit }) =>
                $fit ? `height: -webkit-fill-available; min-height: max-content;` : `height:  -webkit-fill-available; min-height: calc(100% - 4em);`}
            gap: 2em;
            padding: 2em;
        }
    }

    & > & {
        background-color: rgba(var(--black), var(--o01));
    }

    @media (prefers-color-scheme: light) {
        ::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 0 rgba(var(--black), var(--o03));
        }

        ::-webkit-scrollbar-thumb {
            -webkit-box-shadow: inset 0 0 2rem rgba(var(--white), var(--o03));
        }
    }

    @media (prefers-color-scheme: dark) {
        ::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 0 rgba(var(--black), var(--o03));
        }

        ::-webkit-scrollbar-thumb {
            -webkit-box-shadow: inset 0 0 2rem rgba(var(--white), var(--o03));
        }
    }

    ${({ $fit }) =>
        !$fit &&
        css`
            & > ${InnerContent.default} > * {
                /* flex: 1; */
            }
        `}
`;

export default Style;
