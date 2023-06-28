import { css, styled } from "styled-components";

export const Style = styled.div<{ $open: boolean; $max: number; $fit: boolean; $scale: number; $disabled: boolean }>`
    font-size: ${({ $scale }) => $scale * 0.6667}em;
    background: rgba(var(--white), var(--o0));
    color: rgba(var(--white), var(--o045));
    width: ${({ $fit }) => ($fit ? "max-content" : "auto")};
    height: 4em;
    transition: 0.3s ease;
    cursor: pointer;
    user-select: none;
    -webkit-user-drag: none;
    transition: 0.3s ease;
    backdrop-filter: var(--blur);

    & > ul {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;

        &:first-child {
            max-height: 100%;

            li {
                height: 100%;
                max-height: 100%;
                overflow: hidden;

                & > *:last-child:not(span) {
                    position: absolute;
                    right: 0.8em;
                    transition: 0.3s ease;
                }
            }
        }

        &:last-child {
            height: auto;
            max-height: 0;
            overflow: hidden scroll;
            transition: 0.3s ease;
            z-index: 10;

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
                        & > *:last-child:not(span) {
                            transform: rotate(180deg);
                        }
                    }
                    &:last-child {
                        background: rgba(var(--white), var(--o015));
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
