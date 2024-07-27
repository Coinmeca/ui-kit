'use client';
import { css, styled } from 'styled-components';

const Style = styled.button<{
    $scale: number;
    $padding: number;
    $gap: number;
    $hover: boolean;
    $event: boolean;
}>`
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

    ${({ $hover, $event }) =>
        ($hover || $event) &&
        css`
            &:hover {
                background: rgba(var(--white), var(--o0075)) !important;
            }
        `}

    ${({ $event }) =>
        $event &&
        css`
            &:active {
                background: rgba(var(--white), var(--o015)) !important;
                & > * {
                    transform: scale(0.96, 0.96);
                    transition: 0.15s ease;
                }
            }
            cursor: pointer;
        `}
`;

export default Style;
