import { css, styled } from "styled-components";

const Style = styled.div<{ $clearable: boolean; $scale: number; $focus: boolean; $error: boolean; $disabled: boolean }>`
    font-size: ${({ $scale }) => $scale * 0.6667}em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 4em;
    user-select: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
    transition: 0.3s ease;

    ${({ $focus, $error }) => {
        return !$focus ? css`
            background: rgba(var(--${!$error ? "white" : "red"}), var(--o0075));
            
            &:hover{
                background: rgba(var(--${!$error ? "white" : "red"}), var(--o01));
            }

            &:active{
                background: rgba(var(--${!$error ? "white" : "red"}), var(--o015));
            }
        ` : css`
            background: rgba(var(--${!$error ? "white" : "red"}), var(--o01));
        `
    }}

    & > div {
        display: flex;
        align-items: center;

        &:first-child{
            & > div:first-child{
                gap: 1em;
            }

            & > i {
                padding: 0.3em;
                margin-right: 0.3em;
            }

            & svg{
                fill: rgb(var(--${({ $error }) => ($error ? "red" : "white")}));
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
            font-size: 1.5em;
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
                width: max-content;
            }

            input {
                background: transparent;
                display: flex;
                font-size: 1.5em;
                width: 100%;
                height: 100%;
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
`;

export default Style;
