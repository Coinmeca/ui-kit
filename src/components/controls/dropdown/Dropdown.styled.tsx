import { css, styled } from "styled-components";

export const Style = styled.div<{ $open: boolean; $disabled: boolean }>`
    background: rgba(var(--white), var(--o0));
    position: relative;
    color: rgba(var(--white), var(--o045));
    min-height: 4rem;
    display: flex;
    flex-direction: column;
    transition: 0.3s ease;
    cursor: pointer;

    /* &:hover {
        background: rgba(var(--white), var(--o015));
    }

    &:active {
        background: rgba(var(--white), var(--o0075));
    } */

    ul {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    li {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
        gap: 8px;
        padding: 1rem;
        transition: 0.3s ease;

        & i svg {
            fill: rgba(var(--white), var(--o045));
        }

        &:hover,
        &:active {
            background: rgba(var(--white), var(--o015));
            color: rgba(var(--white), var(--o1));
            & i svg {
                fill: rgba(var(--white), var(--o1));
            }
        }

        &.disabled {
            opacity: 0.15;
            pointer-events: none;
        }
    }

    & > ul:first-child {
        max-height: 100%;

        li {
            & > *:last-child {
                position: absolute;
                right: 1rem;
            }
        }
    }

    & > ul:last-child {
        /* position: absolute;
        top: 100%; */
        width: 100%;
        height: 100%;
        max-height: 0;
        overflow: hidden scroll;
        transition: 0.3s ease;

        background: rgba(var(--white), var(--o0075));

        & i svg {
            fill: rgba(var(--white), var(--o045));
        }
    }

    ${({ $open }) => {
        return (
            $open &&
            css`
                background: rgba(var(--white), var(--o0075));

                & > ul {
                    &:first-child > li {
                        &,
                        &:hover,
                        &:active {
                            color: rgba(var(--white), var(--o03));
                            & i svg {
                                fill: rgba(var(--white), var(--o03));
                            }
                        }
                    }
                    &:last-child {
                        max-height: 50rem;
                    }
                }
            `
        );
    }}

    ${({ $disabled }) =>
        $disabled &&
        css`
            opacity: 0.15;
            cursor: initial;
            pointer-events: none !important;
        `}
`;
