import { css, styled } from "styled-components";

export const Style = styled.div<{ $open: boolean; $max: number; $fit: boolean; $disabled: boolean }>`
    font-size: 0.6667em;
    background: rgba(var(--white), var(--o0));
    position: relative;
    color: rgba(var(--white), var(--o045));
    width: ${({ $fit }) => ($fit ? "max-content" : "100%")};
    min-height: 4em;
    display: flex;
    flex-direction: column;
    transition: 0.3s ease;
    cursor: pointer;
    overflow: visible;

    /* &:hover {
        background: rgba(var(--white), var(--o015));
    }

    &:active {
        background: rgba(var(--white), var(--o0075));
    } */

    & > ul {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        &:first-child {
            max-height: 100%;

            li {
                & > *:last-child {
                    position: absolute;
                    right: 0.8em;
                }
            }
        }

        &:last-child {
            position: absolute;
            top: 100%;
            width: 100%;
            height: auto;
            max-height: 0;
            overflow: hidden scroll;
            transition: 0.3s ease;

            background: rgba(var(--white), var(--o0075));

            & i svg {
                fill: rgba(var(--white), var(--o045));
            }

            & ::-webkit-scrollbar {
                width: 0.5em;
            }

            & ::-webkit-scrollbar-track {
                -webkit-box-shadow: inset 0 0 0 rgba(var(--black), var(--o045));
            }

            & ::-webkit-scrollbar-thumb {
                -webkit-box-shadow: inset 0 0 0.2em rgba(var(--white), var(--o045));
            }
        }

        & > li {
            position: relative;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: start;
            min-width: max-content;
            gap: 1em;
            padding: 1em;
            padding-right: 4em;
            transition: 0.3s ease;

            & > span {
                font-size: 1.5em;
            }

            & > img {
                min-width: 1.667em;
                height: 1.667em;
                vertical-align: middle;
                border-radius: 2em;
                margin-top: -0.1em;
                /* margin-left: -0.275em; */
                margin-top: -0.1em;
                margin-bottom: -0.1em;
            }

            & i {
                font-size: 1.5em;
                svg {
                    fill: rgba(var(--white), var(--o045));
                }
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
    }

    ${({ $open, $max }) => {
        return (
            $open &&
            css`
                background: rgba(var(--white), var(--o0075));

                & > ul {
                    &:first-child > li {
                        &,
                        &:hover,
                        &:active {
                            background: transparent;
                            color: rgba(var(--white), var(--o03));
                            & i svg {
                                fill: rgba(var(--white), var(--o03));
                            }
                        }
                    }
                    &:last-child {
                        max-height: ${$max}em;
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
