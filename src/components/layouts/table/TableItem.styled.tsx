"use client";
import { css, styled } from "styled-components";
import { Root } from "lib/style";

export const Row = styled.div<{ $change?: string }>`
    display: flex;
    flex-direction: row;
    gap: 1em;

    ${({ $change }) => $change && `--change: ${$change};`}

    &>span {
        width: 100%;
        & ~ span {
            margin-left: 0.5em;
        }
    }
`;

export const Cell = styled.div<{ $change?: string }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.167em;

    ${({ $change }) => $change && `--change: ${$change};`}

    &>span {
        width: 100%;
        & ~ span {
            margin-left: 0.5em;
        }
    }
`;

const Style = styled.div<{ $change?: string; $event: boolean }>`
    display: table-row;
    align-items: center;
    gap: 1em;
    font-feature-settings: "tnum" on, "lnum" on;
    cursor: ${({ $event }) => ($event ? "pointer" : "default")};
    pointer-events: ${({ $event }) => ($event ? "inherit" : "none")};
    transition: 0.3s ease;

    ${({ $change }) => $change && `--change: ${$change};`}

    & > * {
        font-size: 1.5em;
        display: table-cell;
        vertical-align: middle;
        padding: calc(var(--unit) * 1) calc(var(--unit) * 0.5);

        &:first-child {
            padding-left: calc(var(--unit) * 1);
        }

        &:last-child {
            padding-right: calc(var(--unit) * 1);
        }
    }

    &:hover {
        background: rgba(${({ $event }) => ($event ? "var(--white)" : "var(--black)")}, var(--o0075));
    }

    &:active {
        ${({ $event }) =>
            $event &&
            css`
                background: rgba(var(--white), var(--o015));
            `};
    }

    &[data-active="true"] {
        background: rgba(var(--white), var(--o015));
        pointer-events: none;
    }

    @media all and (max-width: ${Root.Device.Mobile}px) {
        flex-direction: column;
        padding: 2em;
    }
`;

export default Style;
