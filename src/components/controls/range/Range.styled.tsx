import { css, styled } from "styled-components";
import { Root } from "lib/style";
import { memo } from "react";

const Thumb = (color: string, width: string) => css`
    appearance: none;
    background: rgba(${color}, var(--o1));
    width: calc(${width});
    min-width: 4em;
    height: 4em;
    border-radius: 2em;
    transition: 0.15s ease;
    -webkit-backdrop-filter: blur(4em);
    backdrop-filter: blur(4em);

    &:hover {
        background: rgba(${color}, var(--o06));
        transform: scale(1.15);
        cursor: pointer;
    }

    &:active {
        cursor: grabbing;
    }
`;

const Style = styled.div<{ $color: string; $value: number }>`
    ${({ $color, $value }) => {
        const color: string = Root.Color($color);
        const width: string = `${$value}ch + 2em`;
        return css`
            font-size: 1em;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

            & input[type="range"] {
                appearance: none;
                position: relative;
                font-size: 1em;
                width: 100%;
                height: 4em;
                background: none;
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
                    ${Thumb(color, width)}
                }

                &::-moz-range-thumb {
                    ${Thumb(color, width)}
                }

                ::-ms-thumb {
                    ${Thumb(color, width)}
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
                        width: calc(100% - (${$value > 3 ? `${width}` : "4em"}));
                        // margin-left: ${$value > 3 ? `calc((${width}) / -2)` : "-0.5em"};
                        padding: 0 ${$value > 3 ? `calc((${width}) / 2)` : "2em"};

                        & > div {
                            position: relative;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            background: rgba(var(--white), var(--o015));
                            background-image: linear-gradient(rgb(${color}), rgb(${color}));
                            background-repeat: no-repeat;
                            background-position: left;
                            width: 100%;
                            height: 0.25em;
                            will-change: background-size;
                            transition: none;

                            & > div {
                                background: rgba(var(--white), var(--o015));
                                width: 1em;
                                height: 1em;
                                margin-left: -0.5em;
                                border-radius: 1em;
                                -webkit-backdrop-filter: blur(0.25em);
                                backdrop-filter: blur(0.25em);

                                &:hover {
                                    background: rgba(var(--white), var(--o03));
                                }

                                &.zero {
                                    position: absolute;
                                }
                            }

                            .on {
                                background: rgb(${color});
                            }
                        }
                    }

                    &:last-child {
                        position: relative;
                        left: 1em;
                        width: calc(100% - (${width}));
                    }

                    & > span {
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: calc(${width});
                        min-width: 4em;
                        height: 4em;
                        border-radius: 4em;
                        transform: translateX(-1em);
                        z-index: 2;

                        & > span {
                            color: ${$color === "white" ? "rgb(var(--black))" : "white"};
                            min-width: max-content;
                            text-align: center;
                            font-size: 1.25em;
                            font-weight: bold;
                            font-feature-settings: initial;
                            margin-top: -0.125em;
                            will-change: left;
                            transition: none;
                        }

                        &,
                        & > span {
                            -webkit-user-drag: none !important;
                            -webkit-touch-callout: none !important;
                            -webkit-user-select: none !important;
                            -khtml-user-select: none !important;
                            -moz-user-select: none !important;
                            -ms-user-select: none !important;
                            user-select: none !important;
                            pointer-events: none !important;
                        }
                    }
                }
            }
        `;
    }}
`;

export default memo(Style);
