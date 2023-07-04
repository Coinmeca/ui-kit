import { styled } from "styled-components";
import * as Content from "../contents/Content.styled";
import { Root } from "lib/style";

const Style = styled.div`
    transition:.3s ease;

    ${Content.default} > & {
        color-scheme: inherit;
        background: rgb(var(--dim));
        color: rgba(var(--black));
        height: calc(100vh - (var(--unit) * 8));
        min-height: max-content;
        display: flex;
        flex-direction: column;
        gap: calc(var(--unit) * 4);
        width: auto;
        padding: calc(var(--unit) * 4);

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
            height: calc(100vh - (var(--unit) * 6));
            gap: calc(var(--unit) * 3);
            padding: calc(var(--unit) * 3);
        }
    }
`;

export default Style;
