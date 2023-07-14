import { css, styled } from "styled-components";
import * as Box from "components/layouts/box/Box.styled";

const Style = styled.div<{ $clearable: boolean; $scale: number; $focus: boolean; $error: boolean; $disabled: boolean }>`
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
        width: 100%;

        & > div {
            display: flex;
            align-items: center;

            &:first-child {
                & > div:first-child {
                    gap: 1em;
                }

                & > i {
                    padding: 0.3em;
                    margin-right: 0.3em;

                    svg {
                        fill: rgb(var(--${({ $error }) => ($error ? "red" : "white")}));
                    }
                }
            }

            & > div:nth-child(2),
            & > div:last-child:not(:only-child) > * {
                width: 100%;
            }

            & > div {
                font-size: 1em;
            }

            & > div:last-child:not(:only-child):not(:only-of-type) {
            }

            & > div {
                display: flex;
                align-items: center;
                height: auto;

                &:first-child {
                    width: 100%;
                    min-width: max-content;
                    padding: 1em;
                }

                &:last-child:not(:only-child):not(:only-of-type) {
                    font-size: 1.5em;
                    width: max-content;

                    & > span {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                        height: 100%;
                        min-height: 1.337em;
                        padding: 0.6667em;
                        margin: 0;
                        opacity: 0.45;
                    }
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
                        text-align: left;
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
                }

                & > *:not(input) {
                    margin-top: -1em;
                    margin-bottom: -1em;
                }
            }
        }
    }
`;

export default Style;
