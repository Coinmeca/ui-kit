"use client";
import { Root } from "lib/style";
import { css, styled } from "styled-components";

import * as Input from "components/controls/input/Input.styled";
import * as List from "components/layouts/list/List.styled";
import * as ListItem from "components/layouts/list/ListItem.styled";
import * as Table from "components/layouts/table/Table.styled";
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

export const Lower = styled.section<{ $align: "left" | "right" }>`
    background: rgba(var(--black), var(--o06));
    z-index: 11;

    & > section {
        position: absolute;
        transition: 0.3s ease;

        &[data-active="false"] {
            opacity: 0;
            pointer-events: none;
        }

        &[data-active="true"] {
            opacity: 1;
            pointer-events: initial;
        }
    }

    @media all and (max-width: 1919px) {
        background: rgba(var(--black), var(--o09));

        &[data-active="false"] {
            transform: translateX(${({ $align }) => ($align === "left" ? "-100" : "100")}%);
            pointer-events: none;
        }

        &[data-active="true"] {
            transform: translateX(0%);
            pointer-events: initial;
        }
    }
`;

export const SwipeArea = styled.div<{ $area: number }>`
    & {
        position: absolute !important;
        width: ${({ $area }) => $area * 2}em !important;
        left: ${({ $area }) => `-${$area}`}em;
        top: 0;
        transition: 0.3s ease;
        pointer-events: initial;
        z-index: 999;
    }
`;

const Style = styled.aside<{
    $scale: number;
    $width: number;
    $active: boolean;
    $align: "left" | "right";
}>`
    font-size: ${({ $scale }) => $scale}em;
    width: ${({ $width }) => $width}em;
    min-width: ${({ $width }) => $width}em;
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

    && {
        ${Input.default} > * {
            padding: 1em 2em;
        }

        ${List.default} > ${ListItem.default} > * {
            padding-left: 2em;
            padding-right: 2em;
        }

        ${Table.default} > ${TableItem.default} > * {
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

        ${({ $align }) => ($align === "left" ? "left: 0;" : "right: 0;")}

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
