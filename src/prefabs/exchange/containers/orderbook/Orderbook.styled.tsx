"use client";
import { Root } from "lib/style";
import { css, styled } from "styled-components";

const Balance = (color: string) => css`
    &:nth-child(1) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.3),
            rgba(${Root.Color(color)}, 0.3)
        );
    }
    &:nth-child(2) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.29),
            rgba(${Root.Color(color)}, 0.29)
        );
    }
    &:nth-child(3) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.28),
            rgba(${Root.Color(color)}, 0.28)
        );
    }
    &:nth-child(4) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.27),
            rgba(${Root.Color(color)}, 0.27)
        );
    }
    &:nth-child(5) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.26),
            rgba(${Root.Color(color)}, 0.26)
        );
    }
    &:nth-child(6) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.25),
            rgba(${Root.Color(color)}, 0.25)
        );
    }
    &:nth-child(7) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.24),
            rgba(${Root.Color(color)}, 0.24)
        );
    }
    &:nth-child(8) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.23),
            rgba(${Root.Color(color)}, 0.23)
        );
    }
    &:nth-child(9) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.21),
            rgba(${Root.Color(color)}, 0.21)
        );
    }
    &:nth-child(10) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.2),
            rgba(${Root.Color(color)}, 0.2)
        );
    }
    &:nth-child(11) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.19),
            rgba(${Root.Color(color)}, 0.19)
        );
    }
    &:nth-child(12) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.18),
            rgba(${Root.Color(color)}, 0.18)
        );
    }
    &:nth-child(13) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.17),
            rgba(${Root.Color(color)}, 0.17)
        );
    }
    &:nth-child(14) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.16),
            rgba(${Root.Color(color)}, 0.16)
        );
    }
    &:nth-child(15) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.15),
            rgba(${Root.Color(color)}, 0.15)
        );
    }
    &:nth-child(16) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.14),
            rgba(${Root.Color(color)}, 0.14)
        );
    }
    &:nth-child(17) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.13),
            rgba(${Root.Color(color)}, 0.13)
        );
    }
    &:nth-child(18) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.12),
            rgba(${Root.Color(color)}, 0.12)
        );
    }
    &:nth-child(19) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.11),
            rgba(${Root.Color(color)}, 0.11)
        );
    }
    &:nth-child(20) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.1),
            rgba(${Root.Color(color)}, 0.1)
        );
    }
    &:nth-child(21) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.09),
            rgba(${Root.Color(color)}, 0.09)
        );
    }
    &:nth-child(23) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.08),
            rgba(${Root.Color(color)}, 0.08)
        );
    }
    &:nth-child(24) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.07),
            rgba(${Root.Color(color)}, 0.07)
        );
    }
    &:nth-child(25 + n) > * > * > *:nth-child(2) {
        background-image: linear-gradient(
            rgba(${Root.Color(color)}, 0.06),
            rgba(${Root.Color(color)}, 0.06)
        );
    }
`;

export const Tick = styled.div`
    font-size: 1em;
    position: relative;
    display: table;
    border-collapse: collapse;
    font-feature-settings:
        "tnum" on,
        "lnum" on;
    scroll-snap-align: start;
    cursor: pointer;
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:last-child {
        scroll-snap-align: end;
    }

    & > * {
        display: table-row;
        width: 100%;

        & > * {
            display: flex;
            padding: 0.5em;
            // transition: 0.3s ease;

            & > * {
                display: table-cell;
                text-align: right;
                vertical-align: middle;

                & > span {
                    font-size: 1.375em;
                }

                &:nth-child(1) {
                    position: relative;
                    min-width: 15%;
                    padding: 0.5em 1em;
                    padding-right: 2em;
                    text-align: right;
                    color: rgb(var(--white));

                    & > span {
                        position: absolute;
                        opacity: 0.6;
                    }
                }

                &:nth-child(2) {
                    font-feature-settings: initial;
                    background-position: right;
                    background-repeat: no-repeat;
                    width: -webkit-fill-available;
                    padding: 0.5em 2em;
                    transition: 0.3s ease;

                    &:nth-child(2) {
                        & > span {
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }

    &:hover {
        & > * > *:first-child {
            background: rgba(var(--white), var(--o0045));
        }
    }
`;

export const Ticks = (color: string, show: boolean) => css`
    font-size: 1em;
    display: flex;
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow: hidden auto;
    scroll-snap-type: y mandatory;
    -webkit-overflow-scrolling: touch;
    transition: 0.3s ease;

    ${!show && `max-height: 0;`}

    & > ${Tick} {
        color: rgb(var(--${color}));
        ${Balance(color)}

        & > * > * > * {
            &:nth-child(1) {
                & > span {
                    left: 0.5em;
                }
            }
        }
    }
`;

export const Asks = styled.div<{ $show: boolean }>`
    flex-direction: column-reverse;
    ${({ $show }) => Ticks("red", $show)}
`;

export const Bids = styled.div<{ $show: boolean }>`
    flex-direction: column;
    ${({ $show }) => Ticks("green", $show)}
`;

const Responsive = (vertical?: boolean) => css`
    flex-direction: row-reverse;

    ${Asks},${Bids} {
        flex-direction: column-reverse;
        &::-webkit-scrollbar {
            /* display: none; */
        }

        & > ${Tick} {
            & > * > * {
                & > * {
                    padding: ${vertical ? "0.2em 0.5em" : "0.5em"};
                    & > * {
                        ${vertical && "position: relative;"}
                        ${vertical &&
                        "left:initial!important; right:initial!important;"}
                    }
                }
            }
        }

        & > *:not(${Tick}):only-child {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }
    }

    ${Asks} {
        direction: rtl;

        ${Tick} {
            direction: ltr;
            & > * > * {
                flex-direction: ${vertical ? "column-reverse" : "row-reverse"};

                & > * {
                    text-align: left;

                    &:nth-child(1) {
                        ${!vertical && "text-align: right;"}

                        &>span {
                            ${!vertical
                                ? "left:initial; right: 0.5em;"
                                : "left:0.5em;"}
                        }
                    }

                    &:nth-child(2) {
                        background-position: left;
                    }
                }
            }
        }
    }

    ${Bids} {
        ${Tick} {
            & > * > * {
                direction: ltr;
                flex-direction: ${vertical ? "column-reverse" : "row"};

                & > * {
                    &:nth-child(1) {
                        ${!vertical && "text-align: left;"}

                        &>span {
                            ${!vertical
                                ? "left:0.5em;"
                                : "left:initial; right:0.5em;"}
                        }
                    }
                }
            }
        }
    }
`;
const Style = styled.div<{
    $responsive?: {
        device: "desktop" | "laptop" | "tablet" | "mobile";
        vertical?: boolean;
    };
    $guidance: boolean;
}>`
    font-size: 1em;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;

    ${({ $guidance }) =>
        $guidance &&
        css`
            ${Asks},${Bids} {
                &:hover {
                    ${Tick} {
                        background: rgba(var(--white), var(--o0045));

                        &:hover {
                            background: rgba(var(--white), var(--o01));
                        }

                        &:hover ~ * {
                            background: transparent;
                        }
                    }
                }
            }
        `}

    ${({ $responsive }) => {
        const device = $responsive?.device;
        const vertical = $responsive?.vertical;

        switch (device) {
            case "laptop":
                return css`
                    @media all and (max-width: ${Root.Device.Laptop}px) {
                        ${Responsive(vertical)};
                    }
                `;
            case "tablet":
                return css`
                    @media all and (max-width: ${Root.Device.Tablet}px) {
                        ${Responsive(vertical)};
                    }
                `;
            case "mobile":
                return css`
                    @media all and (max-width: ${Root.Device.Mobile}px) {
                        ${Responsive(vertical)};
                    }
                `;
        }
    }}
`;

export default Style;
