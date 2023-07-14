"use client";
import { Root } from "lib/style";
import { css, styled } from "styled-components";

const Balance = (color: string) => css`
    &:nth-child(1) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.3), rgba(${Root.Color(color)}, 0.3));
    }
    &:nth-child(2) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.29), rgba(${Root.Color(color)}, 0.29));
    }
    &:nth-child(3) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.28), rgba(${Root.Color(color)}, 0.28));
    }
    &:nth-child(4) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.27), rgba(${Root.Color(color)}, 0.27));
    }
    &:nth-child(5) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.26), rgba(${Root.Color(color)}, 0.26));
    }
    &:nth-child(6) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.25), rgba(${Root.Color(color)}, 0.25));
    }
    &:nth-child(7) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.24), rgba(${Root.Color(color)}, 0.24));
    }
    &:nth-child(8) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.23), rgba(${Root.Color(color)}, 0.23));
    }
    &:nth-child(9) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.21), rgba(${Root.Color(color)}, 0.21));
    }
    &:nth-child(10) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.2), rgba(${Root.Color(color)}, 0.2));
    }
    &:nth-child(11) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.19), rgba(${Root.Color(color)}, 0.19));
    }
    &:nth-child(12) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.18), rgba(${Root.Color(color)}, 0.18));
    }
    &:nth-child(13) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.17), rgba(${Root.Color(color)}, 0.17));
    }
    &:nth-child(14) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.16), rgba(${Root.Color(color)}, 0.16));
    }
    &:nth-child(15) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.15), rgba(${Root.Color(color)}, 0.15));
    }
    &:nth-child(16) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.14), rgba(${Root.Color(color)}, 0.14));
    }
    &:nth-child(17) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.13), rgba(${Root.Color(color)}, 0.13));
    }
    &:nth-child(18) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.12), rgba(${Root.Color(color)}, 0.12));
    }
    &:nth-child(19) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.11), rgba(${Root.Color(color)}, 0.11));
    }
    &:nth-child(20) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.1), rgba(${Root.Color(color)}, 0.1));
    }
    &:nth-child(21) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.09), rgba(${Root.Color(color)}, 0.09));
    }
    &:nth-child(23) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.08), rgba(${Root.Color(color)}, 0.08));
    }
    &:nth-child(24) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.07), rgba(${Root.Color(color)}, 0.07));
    }
    &:nth-child(25 + n) > * > * > *:nth-child(2) {
        background-image: linear-gradient(rgba(${Root.Color(color)}, 0.06), rgba(${Root.Color(color)}, 0.06));
    }
`;

export const Tick = styled.div`
    font-size: calc(var(--unit) * 1);
    display: table;
    border-collapse: collapse;
    font-feature-settings: "tnum" on, "lnum" on;
    cursor: pointer;
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    & > * {
        display: table-row;
        width: 100%;

        & > * {
            display: flex;
            padding: 0.5em;
            transition: 0.3s ease;

            & > * {
                display: table-cell;
                text-align: right;
                vertical-align: middle;
                font-weight: bolder;

                & > span {
                    font-size: 1.375em;
                }

                &:nth-child(1) {
                    min-width: 15%;
                    padding: 0.5em 1em;
                    padding-right: 2em;
                    text-align: right;
                    color: rgb(var(--white));

                    & > span {
                        opacity: 0.6;
                    }
                }

                &:nth-child(2) {
                    background-position: right;
                    background-repeat: no-repeat;
                    width: 100%;
                    padding: 0.5em 2em;
                    transition: 0.3s ease;
                }
            }
        }
    }

    &:hover {
        & > * > *:first-child {
            background: rgba(var(--white), var(--o005));
        }
    }
`;

const Style = styled.div<{ $responsive?: "desktop" | "laptop" | "tablet" | "mobile" }>`
    font-size: calc(var(--unit) * 1);
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;

    ${({ $responsive }) => {
        switch ($responsive) {
            case "laptop":
                return css`
                    @media all and (max-width: ${Root.Device.Laptop}px) {
                        ${Responsive};
                    }
                `;
            case "tablet":
                return css`
                    @media all and (max-width: ${Root.Device.Tablet}px) {
                        ${Responsive};
                    }
                `;
            case "mobile":
                return css`
                    @media all and (max-width: ${Root.Device.Mobile}px) {
                        ${Responsive};
                    }
                `;
        }
    }}
`;

export const Asks = styled.div`
    font-size: calc(var(--unit) * 1);
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
    height: 100%;
    overflow: auto;
    transition: 0.3s ease;

    & > ${Tick} {
        color: rgb(var(--red));
        ${Balance("red")}
    }
`;

export const Bids = styled.div`
    font-size: calc(var(--unit) * 1);
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: auto;
    transition: 0.3s ease;

    & > ${Tick} {
        color: rgb(var(--green));
        ${Balance("green")}
    }
`;

const Responsive = css`
    flex-direction: row-reverse;

    ${Asks},${Bids} {
        &::-webkit-scrollbar {
            display: none;
        }

        ${Tick} {
            & > * > * {
                flex-direction: column-reverse;

                & > * {
                    padding: 0.2em;
                }
            }
        }
    }

    ${Asks} {
        ${Tick} {
            & > * > * > * {
                text-align: left;
                &:nth-child(2) {
                    background-position: left;
                }
            }
        }
    }
`;

export default Style;
