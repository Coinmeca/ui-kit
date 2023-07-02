import { css, styled } from "styled-components";
import { Root } from "lib/style";

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 1em;

    & > span ~ span {
        margin-left: 0.5em;
    }
`;

export const Col = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.167em;

    & > span ~ span {
        margin-left: 0.5em;
    }
`;

const Style = styled.div<{ $event: boolean }>`
    display: flex;
    align-items: center;
    font-size: 0.6666em;
    padding: 1em;
    gap: 1em;
    border-spacing: 1em;
    cursor: ${({ $event }) => ($event ? "pointer" : "default")};
    pointer-events: ${({ $event }) => ($event ? "initial" : "none")};
    transition: 0.3s ease;

    & > * {
        font-size: 1.5em;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
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

    @media all and (max-width: ${Root.Device.Mobile}px) {
        & {
            flex-direction: column;
        }
    }
`;

export default Style;
