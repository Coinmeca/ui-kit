import { Root } from "lib/style";
import { css, styled } from "styled-components";

export const Style = styled.div<{
    $scale: number;
    $timer: number;
    $padding: number;
    $nav?: "top" | "bottom";
    $vertical: "top" | "center" | "bottom";
    $horizon: "left" | "center" | "right";
}>`
    font-size: ${({ $scale }) => $scale}em;
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;

    & > * {
        &:first-child {
            & > * {
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                justify-content: center;
                align-items: ${({ $vertical }) => ($vertical === "top" ? "flex-start" : $vertical === "bottom" ? "flex-end" : "center")};
                width: -webkit-fill-available;
                height: -webkit-fill-available;
                padding: ${({ $padding }) => `${$padding}em`};
                ${({ $nav, $padding }) => $nav && `padding-${$nav}: ${$padding * 2}em`};
                text-align: center;
                transition: 0.3s ease;
                overflow: hidden;

                & > * {
                    width: 100%;
                    &:last-child {
                        transition: 0.15s 0.05s ease;
                        opacity: 0;

                        & > * {
                            & > *:nth-child(1) {
                                transition: 0.15s 0.075s ease;
                                opacity: 0;
                            }
                            & > *:nth-child(2) {
                                transition: 0.15s 0.1s ease;
                                opacity: 0;
                            }
                            & > *:nth-child(2) {
                                transition: 0.15s 0.15s ease;
                                opacity: 0;
                            }
                        }
                    }
                }

                &[data-active="false"] {
                    opacity: 0;
                    transform: translateX(-15%);
                    pointer-events: none;

                    & > *:last-child {
                        transform: translateX(-5%);
                        & > * {
                            & > *:nth-child(1),
                            & > *:nth-child(2),
                            & > *:nth-child(3) {
                                transform: translateX(-2.5%);
                            }
                        }
                    }
                }

                &[data-active="true"] ~ [data-active="false"] {
                    transform: translateX(15%);

                    & > *:last-child {
                        transform: translateX(5%);
                        & > * {
                            & > *:nth-child(1),
                            & > *:nth-child(2),
                            & > *:nth-child(3) {
                                transform: translateX(2.5%);
                            }
                        }
                    }
                }

                &[data-active="true"] {
                    transform: translateX(0);
                    pointer-events: initial;
                    opacity: 1;

                    & > *:last-child {
                        transform: translateX(0%);
                        opacity: 1;

                        & > * {
                            & > *:nth-child(1),
                            & > *:nth-child(2),
                            & > *:nth-child(3) {
                                transform: translateX(0%);
                                opacity: inherit;
                            }
                        }
                    }
                }

                @media all and (min-width: ${Root.Device.Desktop}px) {
                    padding: ${({ $padding }) => `${$padding}em ${$padding * 2}em`};
                    ${({ $nav, $padding }) => $nav && `padding-${$nav}: ${$padding}em`};
                }

                @media all and (max-width: ${Root.Device.Tablet}px) {
                    ${({ $nav, $padding }) => $nav && `padding-${$nav}: ${$padding / 2}em`};
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
                    ${$nav && `${$nav}: 0;`}
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

    @media all and (max-width: ${Root.Device.Tablet}px) {
        & > * {
            &:first-child {
                & > * {
                    padding: ${({ $padding }) => `${$padding * 0.875}em`};
                }
            }
        }
    }

    @media all and (max-width: ${Root.Device.Mobile}px) {
        & > * {
            &:first-child {
                & > * {
                    padding: ${({ $padding }) => `${$padding * 0.75}em`};
                }
            }
        }
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
