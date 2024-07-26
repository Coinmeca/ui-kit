"use client";
import { styled, css } from "styled-components";
import { Root } from "lib/style";
import * as Page from "components/layouts/page/Page.styled";
import * as SlideContainer from "components/layouts/contents/slide/SlideContainer.styled";
import * as InnerContent from "components/layouts/contents/inner/InnerContent.styled";

const Style = styled.div<{
    $padding: { top: number; left: number; right: number; bottom: number };
    $change?: string;
    $fit?: boolean;
}>`
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
    --change: var(--white);

    scroll-snap-align: start;
    transition: 0.3s ease;

    display: flex;
    flex-direction: column;
    background: rgb(var(--dim));
    color: rgba(var(--black));
    gap: 4em;

    & & {
        background: rgba(var(--white), var(--o0045));
    }

    ${({ $change }) => $change && `--change: ${Root.Color($change)};`}
    ${({ $padding, $fit }) => css`
        padding: ${$padding?.top}em ${$padding?.right}em ${$padding?.bottom}em ${$padding?.left}em;
        width: calc(100% - ${$padding?.left + $padding?.right}em);
        ${$fit
            ? `height: calc(100% - ${$padding?.top + $padding?.bottom}em); min-height: max-content;`
            : `height: max-content; min-height: calc(100% - ${$padding?.top + $padding?.bottom}em);`}
    `}

    ${Page.default} > &,
    ${Page.default} > ${SlideContainer.default} > * > & {
        @media all and (min-width: ${Root.Device.Desktop}px) {
            ${({ $padding, $fit }) => css`
                padding: ${$padding?.top}em ${$padding?.right * 2}em ${$padding?.bottom}em ${$padding?.left * 2}em;
                width: calc(100% - ${($padding?.left + $padding?.right) * 2}em);
                ${$fit
                    ? `height: calc(100% - ${$padding?.top + $padding?.bottom}em); min-height: max-content;`
                    : `height: max-content; min-height: calc(100% - ${$padding?.top + $padding?.bottom}em);`}
            `}
        }

        @media all and (max-width: ${Root.Device.Mobile}px) {
            gap: 2em;

            ${({ $padding, $fit }) => css`
                padding: ${$padding?.top / 2}em ${$padding?.right / 2}em ${$padding?.bottom / 2}em ${$padding?.left / 2}em;
                width: calc(100% - ${($padding?.left + $padding?.right) / 2}em);
                ${$fit
                    ? `height: calc(100% - ${($padding?.top + $padding?.bottom) / 2}em); min-height: max-content;`
                    : `height: max-content; min-height: calc(100% - ${($padding?.top + $padding?.bottom) / 2}em);`}
            `}
        }
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
