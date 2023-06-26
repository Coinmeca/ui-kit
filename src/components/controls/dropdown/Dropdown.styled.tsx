import { css, styled } from "styled-components";

export const Style = styled.div<{ $open: boolean; $max: number; $fit: boolean; $disabled: boolean }>`
    font-size: 0.6667em;
    position: relative;
    background: rgba(var(--white), var(--o0));
    color: rgba(var(--white), var(--o045));
    width: ${({ $fit }) => ($fit ? "max-content" : "auto")};
    height: 4em;
    display: flex;
    flex-direction: column;
    transition: 0.3s ease;
    cursor: pointer;
    /* overflow: visible; */
    backdrop-filter: var(--blur);

    & > ul {
        display: flex;
        flex-direction: column;
        /* width: ${({ $fit }) => ($fit ? "max-content" : "100%")}; */
        height: 100%;

        &:first-child {
            max-height: 100%;

            li {
                height: 4em;
                max-height: 100%;
                overflow: hidden;

                & > *:last-child {
                    position: absolute;
                    right: 0.8em;
                    transition: 0.3s ease;
                }
            }
        }

        &:last-child {
            /* position: absolute;
            top: 100%;
            height: auto */
            /* margin-top: 0.2em; */
            height: 0;
            min-height: 0;
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
            width: calc(100% - 5em);
            min-width: max-content;
            gap: 1em;
            padding: 1em;
            padding-right: 4em;
            transition: 0.3s ease;

            & > span {
                font-size: 1.5em;
            }

            & > img {
                min-width: 2.5em;
                height: 2.5em;
                vertical-align: middle;
                border-radius: 2em;
                /* margin-left: -0.275em; */
                /* margin-top: -0.1em;
                margin-bottom: -0.1em; */
                margin-top: -0.25em;
                margin-bottom: -0.25em;
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
                        & > *:last-child {
                            transform: rotate(180deg);
                        }
                    }
                    &:last-child {
                        background: rgba(var(--white), var(--o015));
                        min-height: ${$max}em;
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
