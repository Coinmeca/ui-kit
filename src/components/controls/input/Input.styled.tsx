import { css, styled } from "styled-components";
import * as Box from "components/layouts/box/Box.styled";

export const Side = styled.div<{ $width?: number }>`
    min-width: ${({ $width }) => ($width ? `calc(var(--unit) * ${$width})` : "max-content")};
    display: flex;

    &:first-child {
        margin-left: -1em;
    }

    &:last-child {
        margin-right: -1em;
    }

    & > * {
        width: 100%;
    }

    & > span {
        font-size: 1.5em;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        height: 100%;
        min-height: 1.337em;
        min-width: max-content;
        padding: 0.6667em;
        margin: 0;
        opacity: 0.45;
    }
`;

const Style = styled.div<{ $clearable?: boolean; $scale: number; $focus: boolean; $align: "left" | "center" | "right"; $lock?: boolean; $error: boolean; $disabled?: boolean }>`
    font-size: calc(var(--unit) * ${({ $scale }) => $scale});
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: 0.3s ease;

    background: rgba(var(--${({ $error }) => (!$error ? "white" : "red")}), var(--o01));

    &:hover {
        background: rgba(var(--${({ $error }) => (!$error ? "white" : "red")}), var(--o03));
    }

    &:active {
        /* background: rgba(var(--${({ $error }) => (!$error ? "white" : "red")}), var(--o03)); */
    }

    &[data-active="true"] {
        background: rgba(var(--${({ $error }) => (!$error ? "white" : "red")}), var(--o015));

        /* ${Box.default} {
            background: rgba(var(--${({ $error }) => (!$error ? "white" : "red")}), var(--o01));
        } */
    }

    & > * {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 4em;
        padding: 0 1em;

        & > * {
            display: flex;
            align-items: center;
            width: -webkit-fill-available;
            height: auto;
            gap: 1em;

            & > ${Side} {
                & > i > svg {
                    fill: rgb(var(--${({ $error }) => ($error ? "red" : "white")}));
                }
            }

            & > *:not(${Side}) {
                display: flex;
                align-items: center;
                width: 100%;
            }

            input {
                background: transparent;
                display: flex;
                width: 100%;
                height: 100%;
                font-size: 1.5em;
                font-weight: bold;
                outline: none;

                &::placeholder {
                    text-align: ${({ $align }) => $align};
                    font-weight: normal;
                    color: inherit;
                    opacity: 0.3;
                }

                &[type="number"],
                &[type="date"] {
                    -moz-appearance: textfield;
                }

                &[type="number"]::-webkit-outer-spin-button,
                &[type="number"]::-webkit-inner-spin-button,
                &[type="date"]::-webkit-outer-spin-button,
                &[type="date"]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    display: none;
                    margin: 0;
                }

                &:disabled {
                    pointer-events: none;
                }
            }
        }
    }

    ${({ $lock }) =>
        $lock &&
        css`
            background: rgba(var(--white), var(--o003));
            cursor: pointer;
            pointer-events: none;
            & > * {
                pointer-events: none;
                & > * {
                    pointer-events: none;
                    input {
                        cursor: pointer;
                        pointer-events: none;
                    }
                }
                & > ${Side} {
                    cursor: pointer;
                    pointer-events: none;
                }
            }
        `}

    ${({ $disabled }) =>
        $disabled &&
        css`
            cursor: pointer;
            opacity: var(--o015);
            pointer-events: none;
            & > * {
                pointer-events: none;
                & > * {
                    pointer-events: none;
                    input {
                        cursor: pointer;
                        pointer-events: none;
                    }
                }
                & > ${Side} {
                    cursor: pointer;
                    pointer-events: none;
                }
            }
        `}
`;

export default Style;
