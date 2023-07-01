import { styled } from "styled-components";

const Style = styled.div<{ $event: boolean }>`
    display: table-row;
    font-size: 0.6666em;
    padding: 1em;
    border-spacing: 1em;
    cursor: ${({ $event }) => ($event ? "pointer" : "default")};
    pointer-events: ${({ $event }) => ($event ? "initial" : "none")};
    transition: 0.3s ease;

    & > * {
        font-size: 1.5em;
    }

    &:hover {
        background: rgba(${({ $event }) => ($event ? "var(--white)" : "var(--black)")}, var(--o015));
    }
`;

export default Style;
