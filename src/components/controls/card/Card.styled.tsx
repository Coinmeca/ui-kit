import { css, styled } from "styled-components";

const Style = styled.button<{ $scale: number; $padding: number; $gap: number; $event: boolean }>`
    font-size: ${({ $scale }) => $scale}em;
    padding: ${({ $padding }) => $padding}em;
    background: transparent;
    position: relative;
    transition: 0.3s ease;
    opacity: 1;

    ${({ $event }) => $event && `cursor: pointer`};

    & > * {
        display: flex;
        flex-direction: column;
        ${({ $gap }) => $gap && `gap: ${$gap}em`}
    }

    ${({ $event }) =>
        $event &&
        css`
            &:hover {
                background: rgba(var(--white), var(--o0075));
            }

            &:active {
                background: rgba(var(--white), var(--o015));
                & > * {
                    transform: scale(0.96, 0.96);
                    transition: 0.15s ease;
                }
            }
        `}
`;

export default Style;
