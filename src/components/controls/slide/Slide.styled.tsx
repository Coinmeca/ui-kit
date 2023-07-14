import { Root } from "lib/style";
import { css, styled } from "styled-components";

export const Style = styled.div<{ $scale: number; $timer: number; $padding: number; $nav: "top" | "bottom" | undefined; $vertical: "top" | "center" | "bottom"; $horizon: "left" | "center" | "right" }>`
    font-size: calc(var(--unit) * ${({ $scale }) => $scale});
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;

    & > * {
        &:first-child {
            & > * {
                font-size: 1.5em;
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                justify-content: center;
                align-items: ${({ $vertical }) => ($vertical === "top" ? "flex-start" : $vertical === "bottom" ? "flex-end" : "center")};
                width: calc(100% - (${({ $padding }) => `${$padding - $padding * 0.66667}em`} * 4));
                height: calc(100% - (${({ $nav, $padding }) => `${$padding - $padding * 0.66667}em * ${$nav ? 6 : 4}`}));
                padding: ${({ $padding }) => `${$padding * 0.66667}em`};
                ${({ $nav, $padding }) => $nav && `padding-${$nav}: ${$padding * 2 * 0.66667}em`};
                text-align: center;
                transition: 0.3s ease;
                overflow: hidden;

                & > * {
                    width: 100%;
                    &:last-child {
                        transition: 0.3s 0.15s ease;
                        opacity: 0;
                    }
                }

                &[data-active="false"] {
                    opacity: 0;
                    transform: translateX(-15%);
                    pointer-events: none;

                    & > *:last-child {
                        transform: translateX(-15%);
                    }
                }

                &[data-active="true"] ~ * {
                    transform: translateX(15%);

                    & > *:last-child {
                        transform: translateX(15%);
                    }
                }

                &[data-active="true"] {
                    transform: translateX(0);
                    pointer-events: initial;
                    opacity: 1;

                    & > *:last-child {
                        transform: translateX(0%);
                        opacity: 1;
                    }
                }

                @media all and (min-width: ${Root.Device.Desktop}px) {
                    width: calc(100% - (${({ $padding }) => `${$padding - $padding * 0.66667}em`} * 8));
                    padding: ${({ $padding }) => `${$padding * 2 * 0.66667}em`};
                    ${({ $nav, $padding }) => $nav && `padding-${$nav}: ${$padding * 2 * 0.66667}em`};
                }

                @media all and (max-width: ${Root.Device.Tablet}px) {
                    height: calc(100% - (${({ $nav, $padding }) => `${$padding - $padding * 0.66667}em * ${$nav ? 5 : 4}`}));
                    ${({ $nav, $padding }) => $nav && `padding-${$nav}: ${$padding * 1.5 * 0.66667}em`};
                }
            }
        }

        ${({ $nav, $horizon, $timer, $padding }) =>
            $nav &&
            css`
                &:last-child:not(:only-child) {
                    position: absolute;
                    display: flex;
                    height: auto;
                    ${$nav && `${$nav}: : 0;`}
                    ${$horizon !== "center" && `${$horizon}: 0;`}
                    padding: ${$padding}em;
                    gap: 1em;
                    text-align: center;

                    @media all and (min-width: ${Root.Device.Desktop}px) {
                        padding: ${$padding}em ${$padding * 2}em;
                    }

                    & > * {
                        background: rgba(var(--white), var(--o045));
                        display: inline-block;
                        width: 0.5em;
                        height: 0.5em;
                        vertical-align: top;
                        cursor: pointer;
                        transition: 0.3s ease;

                        & ~ & {
                            margin-left: 1em;
                        }

                        &[data-active="true"] {
                            width: 8em;
                            background-image: linear-gradient(rgb(var(--white)), rgb(var(--white)));
                            background-size: 100% 100%;
                            background-position: left;
                            background-repeat: no-repeat;
                            animation: slide both 1 ${$timer / 1000}s ease;
                        }
                    }
                }
            `}
    }

    @keyframes slide {
        0% {
            background-size: 0% 100%;
        }
        100% {
            background-size: 100% 100%;
        }
    }
`;
