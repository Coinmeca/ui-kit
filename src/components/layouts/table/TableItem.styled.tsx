import { css, styled } from "styled-components";
import { Root } from "lib/style";

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1em;

    & > span ~ span {
        margin-left: 0.5em;
    }
`;

export const Cell = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.167em;

    & > span ~ span {
        margin-left: 0.5em;
    }
`;

const Style = styled.div<{ $event: boolean }>`
    display: table-row;
    align-items: center;
    gap: 1em;
    cursor: ${({ $event }) => ($event ? "pointer" : "default")};
    pointer-events: ${({ $event }) => ($event ? "initial" : "none")};
    transition: 0.3s ease;

    & > * {
        font-size: 1.5em;
        display: table-cell;
        vertical-align:middle;
        padding: calc(var(--unit) * 1) calc(var(--unit) * 0.5);
        
        &:first-child{
            padding-left: calc(var(--unit) * 1);
        }
        
        &:last-child{
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

    @media all and (max-width: ${Root.Device.Mobile}px) {
        flex-direction: column;
        padding: 2em;
    }
`;

export default Style;
