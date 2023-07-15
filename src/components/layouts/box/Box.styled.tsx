"use client";
import { styled, css } from "styled-components";
import { Root } from "lib/style";
import * as Page from "../page/Page.styled";
import * as InnerContent from "../contents/inners/InnerContent.styled";

const Style = styled.div<{ $change?: string; $fit?: boolean }>`
    transition: 0.3s ease;

    ${({ $change }) => $change && `--change: ${$change};`}

    ${Page.default} > & {
        display: flex;
        flex-direction: column;
        background: rgb(var(--dim));
        color: rgba(var(--black));
        width: calc(100% - (var(--unit) * 8));
        ${({ $fit }) => ($fit ? `height: calc(100% - (var(--unit) * 8)); min-height: max-content;` : `height: max-content; min-height: calc(100% - (var(--unit) * 8));`)}

        padding: calc(var(--unit) * 4);
        gap: calc(var(--unit) * 4);

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
            width: calc(100% - (var(--unit) * 16));
            padding: calc(var(--unit) * 4) calc(var(--unit) * 8);
        }

        @media all and (max-width: ${Root.Device.Mobile}px) {
            width: calc(100% - (var(--unit) * 6));
            ${({ $fit }) => ($fit ? `height: calc(100% - (var(--unit) * 6)); min-height: max-content;` : `height: max-content; min-height: calc(100% - (var(--unit) * 6));`)}
            gap: calc(var(--unit) * 3);
            padding: calc(var(--unit) * 3);
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
