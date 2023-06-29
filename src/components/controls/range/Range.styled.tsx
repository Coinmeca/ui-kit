import { css, styled } from "styled-components";
import { Root } from "lib/style";

const Thumb = (color: string) => css`
    background: ${Root.Color(color)};
    width: 4em;
    height: 4em;
    border-radius: 2em;
    transition: 0.3s ease;
    -webkit-appearance: none;

    &:hover {
        transform: scale(1.15);
    }
`;

const Style = styled.div<{ $color: string }>`
    font-size: 0.6667em;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    input[type="range"] {
        position: relative;
        font-size: 1em;
        width: 100%;
        height: 4em;
        background: none;
        -webkit-appearance: none;
        z-index: 1;

        &:hover {
            cursor: e-resize;
        }

        &:active {
            cursor: grabbing;
        }

        &:focus {
            outline: none;
        }

        &::-webkit-slider-thumb {
            background: ${({ $color }) => Root.Color($color)};
            width: 4em;
            height: 4em;
            border-radius: 2em;
            transition: 0.15s ease;
            -webkit-appearance: none;

            &:hover {
                transform: scale(1.125);
            }
        }
    }

    & > div:last-child {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;

        & > div {
            position: absolute;
            height: 100%;

            &:first-child {
                display: flex;
                align-items: center;
                justify-content: center;
                width: calc(100% - 3em);
                margin-left: -0.5em;
                padding: 0 2em;

                & > div {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: rgba(var(--white), var(--o015));
                    background-image: linear-gradient(rgb(${({ $color }) => Root.Color($color)}), rgb(${({ $color }) => Root.Color($color)}));
                    width: 100%;
                    height: 0.25em;

                    & > div {
                        background: rgba(var(--white), var(--o015));
                        width: 1em;
                        height: 1em;
                        border-radius: 1em;
                        backdrop-filter: blur(1em);

                        &:hover {
                            background: rgba(var(--white), var(--o03));
                        }
                        &:active {
                        }
                    }

                    .on {
                        background: rgb(${({ $color }) => Root.Color($color)});
                    }
                }
            }

            &:last-child {
                position: relative;
                left: 1em;
                width: calc(100% - 4rem);
            }

            & > span {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 4em;
                height: 4em;
                border-radius: 4em;
                transform: translateX(-1em);
                z-index: 2;

                & > span {
                    color: white;
                    position: absolute;
                    font-size: 1.25em;
                    font-feature-settings: initial;
                    margin-top: -0.125em;
                }
            }
        }
    }
`;

export default Style;
