import { Root } from "lib/style";
import { css, styled } from "styled-components";

export const Row = styled.div<{ $gap: number; $change?: string; $fit?: boolean; }>`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: ${({ $gap }) => $gap}em;

    ${({$fit}) => $fit && 'max-width: max-content;'}
    ${({ $change }) => $change && `--change: ${$change === Root.Color($change) ? $change : Root.Color($change)};`}
`;

export const Col = styled.div<{ $gap: number; $change?: string; $fit?:boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    gap: ${({ $gap }) => $gap}em;
    
    ${({$fit}) => $fit && 'max-width: max-content;'}
    ${({ $change }) => $change && `--change: ${$change === Root.Color($change) ? $change : Root.Color($change)};`}
`;

const Style = styled.div<{
    $active?: boolean;
    $gap?: number;
    $change?: string;
    $event: boolean;
}>`
    display: flex;
    /* align-items: center; */
    font-size: 0.6666em;
    padding: 1em;
    border-spacing: 1em;
    font-feature-settings: "tnum" on, "lnum" on;
    cursor: ${({ $event }) => ($event ? "pointer" : "default")};
    pointer-events: ${({ $event }) => ($event ? "inherit" : "none")};
    scroll-snap-align: start;
    transition: 0.3s ease;

    ${({ $change }) => $change && `--change: ${$change};`}
    ${({ $active }) => $active && `background: rgba(var(--white),var(--o01));`}
    ${({ $gap }) => `gap: ${$gap || 1}em;`}

    && > * {
        font-size: 1.5em;
        /* display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%; */
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

    &:last-child {
        scroll-snap-align: end;
    }

    @media all and (max-width: ${Root.Device.Mobile}px) {
        flex-direction: column;
        /* padding: 2em; */
    }
`;

export default Style;
