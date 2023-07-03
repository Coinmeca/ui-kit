import { css, styled } from "styled-components";

const Style = styled.div<{ $scale: number; $active: boolean; $fit: boolean; $disabled: boolean }>`
    font-size: calc(var(--unit) * ${({ $scale }) => $scale});
    font-weight: bold;
    width: ${({ $fit }) => ($fit ? "max-content" : "auto")};
    cursor: pointer;
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: 0.3s ease;

    & > * {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-width: max-content;
        min-height: 3em;
        gap: 0.5em;
        padding: 0.5em;

        & > span {
            font-size: 1.5em;
        }
    }

    color: rgba(var(--white), var(--o045));
    & i svg {
        fill: rgba(var(--white), var(--o045));
    }

    &:hover {
        color: rgba(var(--white), var(--o1));
        & i svg {
            fill: rgba(var(--white), var(--o1));
        }
    }

    &:active {
        background: rgba(var(--white), var(--o015));
    }

    ${({ $active }) => {
        return (
            $active &&
            css`
                background: transparent;
                cursor: initial;
                pointer-events: none !important;
                color: rgb(var(--white));
                & i svg {
                    fill: rgb(var(--white));
                }
            `
        );
    }}

    ${({ $disabled }) => {
        return (
            $disabled &&
            css`
                opacity: 0.15;
                cursor: initial;
                pointer-events: none !important;
            `
        );
    }}
`;

export default Style;
