import { styled } from "styled-components";
import * as Content from "../contents/Content.styled";

const Style = styled.div`
    ${Content.default} > & {
        background: rgb(var(--dim));
        color: rgba(var(--black));
        height: calc(100vh - 8rem);
        min-height: max-content;
        display: flex;
        flex-direction: column;
        gap: 4rem;
        width: auto;
        padding: 4rem;
        color: black;

        --white: 0, 0, 0;
        --black: 255, 255, 255;

        @media (prefers-color-scheme: dark) {
            color: white;
            --white: 255, 255, 255;
            --black: 0, 0, 0;
        }
    }
`;

export default Style;
