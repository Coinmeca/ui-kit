import { css, styled } from "styled-components";
import { Root } from "lib/style";

export const Row = styled.div<{ $change?: string }>`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 1em;

    ${({ $change }) => $change && `--change: ${$change};`}

    & > span ~ span {
        margin-left: 0.5em;
    }
`;

export const Col = styled.div<{ $change?: string }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    gap: 1em;

    ${({ $change }) => $change && `--change: ${$change};`}

    & > span ~ span {
        margin-left: 0.5em;
    }
`;

const Style = styled.div<{ $active?: boolean; $change?: string; $event: boolean }>`
    display: flex;
    align-items: center;
    font-size: 0.6666em;
    padding: 1em;
    gap: 1em;
    border-spacing: 1em;
    font-feature-settings: "tnum" on, "lnum" on;
    cursor: ${({ $event }) => ($event ? "pointer" : "default")};
    pointer-events: ${({ $event }) => ($event ? "inherit" : "none")};
    transition: 0.3s ease;

    ${({ $change }) => $change && `--change: ${$change};`}
    ${({ $active }) => $active && `background: rgba(var(--white),var(--o01));`}

    & > * {
        font-size: 1.5em;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
    }

    &:hover {
        background: rgba(var(--white), var(--o0075));
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
        /* padding: 2em; */
    }
`;

export default Style;
