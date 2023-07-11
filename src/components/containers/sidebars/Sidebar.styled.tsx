"use client";
import { css, styled } from "styled-components";
import { Root } from "lib/style";

import * as Input from "components/controls/input/Input.styled";
import * as ListItem from "components/layouts/list/ListItem.style";
import * as TableItem from "components/layouts/table/TableItem.styled";

export const Upper = styled.section`
    z-index: 12;

    & > * {
        background: rgba(var(--black), var(--o09));
    }

    &[data-active="false"] {
        opacity: 0;
        pointer-events: none;
    }

    &[data-active="true"] {
        opacity: 1;
        pointer-events: initial;
    }

    @media all and (max-width: 1919px) {
        /* background: rgba(var(--black), var(--o09)); */
    }
`;

export const Lower = styled.section`
    background: rgba(var(--black), var(--o06));
    z-index: 11;

    @media all and (max-width: 1919px) {
        &[data-active="false"] {
            transform: translateX(100%);
            pointer-events: none;
        }

        &[data-active="true"] {
            transform: translateX(0%);
            pointer-events: initial;
        }
    }
`;

const Style = styled.aside<{ $scale: number; $width: number; $active: boolean }>`
    font-size: calc(var(--unit) * ${({ $scale }) => $scale});
    width: ${({ $width }) => $width}em;
    position: relative;
    display: flex;
    height: 100%;
    z-index: 10;
    transition: 0.3s ease;

    & > * {
        position: absolute;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow: hidden;
        transition: 0.3s ease;

        & > * {
            position: relative;
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
        }
    }

    ${({ $width, $active }) =>
        $active &&
        css`
            min-width: ${$active ? $width : 0}em;
        `};

    && {
        & ${Input.default} {
            padding: 1em 2em;
        }

        ${ListItem.default} {
            padding-left: 2em;
            padding-right: 2em;
        }

        && ${TableItem.default} > * {
            &:first-child {
                padding-left: 2em;
            }

            &:last-child {
                padding-right: 2em;
            }
        }
    }

    @media all and (max-width: 1919px) {
        position: absolute;
        pointer-events: none;
        right: 0;

        & > * {
            /* background: rgba(var(--black), var(--o09)); */
        }
    }

    @media all and (max-width: ${Root.Device.Mobile}px) {
        width: 100vw;
        min-width: initial;
    }
`;

export default Style;
