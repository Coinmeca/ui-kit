import { styled } from "styled-components";

export const Style = styled.div`
    background: rgb(var(--dim));
    color: rgba(var(--black));
    height: calc(100% - 8rem);
    min-height: calC(100vh - 8rem);
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
`;
