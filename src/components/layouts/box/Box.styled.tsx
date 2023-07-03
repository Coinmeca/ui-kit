import { styled } from "styled-components";
import * as Content from "../contents/Content.styled";
import { Root } from "lib/style";

const Style = styled.div`
    ${Content.default} > & {
        color-scheme: inherit;
        background: rgb(var(--dim));
        color: rgba(var(--black));
        height: calc(100vh - 8rem);
        min-height: max-content;
        display: flex;
        flex-direction: column;
        gap: 4rem;
        width: auto;
        padding: 4rem;

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

        @media all and (max-width: ${Root.Device.Mobile}px) {
            height: calc(100vh - 4rem);
            padding: 2rem;
        }
    }
`;

export default Style;
