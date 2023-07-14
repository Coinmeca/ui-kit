"use client";
import { styled } from "styled-components";

export const Tick = styled.div`
    font-size: calc(var(--unit) * 1);
    display: table;
    border-collapse: collapse;
    font-feature-settings: "tnum" on, "lnum" on;

    & > * {
        display: table-row;
        width: 100%;

        & > * {
            display: flex;
            padding: 0.5em;

            & > * {
                display: table-cell;
                text-align: right;
                vertical-align: middle;
                font-weight: bolder;

                & > span {
                    font-size: 1.375em;
                }

                &:nth-child(1) {
                    width: 100%;
                    padding: 0.5em 1em;
                    background-position: right;
                    background-repeat: no-repeat;
                    text-align: right;
                    color: rgb(var(--white));

                    & > span {
                        opacity: 0.6;
                    }
                }

                &:nth-child(2) {
                    min-width: 15%;
                    padding: 0.5em 1em;
                    padding-right: 2em;
                    & > span {
                    }
                }
            }
        }
    }
`;

const Style = styled.div`
    font-size: calc(var(--unit) * 1);
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
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

        &:nth-child(1) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.3), rgba(var(--red), 0.3));
        }
        &:nth-child(2) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.29), rgba(var(--red), 0.29));
        }
        &:nth-child(3) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.28), rgba(var(--red), 0.28));
        }
        &:nth-child(4) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.27), rgba(var(--red), 0.27));
        }
        &:nth-child(5) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.26), rgba(var(--red), 0.26));
        }
        &:nth-child(6) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.25), rgba(var(--red), 0.25));
        }
        &:nth-child(7) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.24), rgba(var(--red), 0.24));
        }
        &:nth-child(8) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.23), rgba(var(--red), 0.23));
        }
        &:nth-child(9) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.21), rgba(var(--red), 0.21));
        }
        &:nth-child(10) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.2), rgba(var(--red), 0.2));
        }
        &:nth-child(11) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.19), rgba(var(--red), 0.19));
        }
        &:nth-child(12) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.18), rgba(var(--red), 0.18));
        }
        &:nth-child(13) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.17), rgba(var(--red), 0.17));
        }
        &:nth-child(14) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.16), rgba(var(--red), 0.16));
        }
        &:nth-child(15) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.15), rgba(var(--red), 0.15));
        }
        &:nth-child(16) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.14), rgba(var(--red), 0.14));
        }
        &:nth-child(17) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.13), rgba(var(--red), 0.13));
        }
        &:nth-child(18) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.12), rgba(var(--red), 0.12));
        }
        &:nth-child(19) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.11), rgba(var(--red), 0.11));
        }
        &:nth-child(20) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.1), rgba(var(--red), 0.1));
        }
        &:nth-child(21) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.09), rgba(var(--red), 0.09));
        }
        &:nth-child(23) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.08), rgba(var(--red), 0.08));
        }
        &:nth-child(24) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.07), rgba(var(--red), 0.07));
        }
        &:nth-child(25 + n) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--red), 0.06), rgba(var(--red), 0.06));
        }
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

        &:nth-child(1) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.3), rgba(var(--green), 0.3));
        }
        &:nth-child(2) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.29), rgba(var(--green), 0.29));
        }
        &:nth-child(3) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.28), rgba(var(--green), 0.28));
        }
        &:nth-child(4) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.27), rgba(var(--green), 0.27));
        }
        &:nth-child(5) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.26), rgba(var(--green), 0.26));
        }
        &:nth-child(6) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.25), rgba(var(--green), 0.25));
        }
        &:nth-child(7) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.24), rgba(var(--green), 0.24));
        }
        &:nth-child(8) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.23), rgba(var(--green), 0.23));
        }
        &:nth-child(9) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.21), rgba(var(--green), 0.21));
        }
        &:nth-child(10) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.2), rgba(var(--green), 0.2));
        }
        &:nth-child(11) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.19), rgba(var(--green), 0.19));
        }
        &:nth-child(12) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.18), rgba(var(--green), 0.18));
        }
        &:nth-child(13) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.17), rgba(var(--green), 0.17));
        }
        &:nth-child(14) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.16), rgba(var(--green), 0.16));
        }
        &:nth-child(15) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.15), rgba(var(--green), 0.15));
        }
        &:nth-child(16) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.14), rgba(var(--green), 0.14));
        }
        &:nth-child(17) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.13), rgba(var(--green), 0.13));
        }
        &:nth-child(18) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.12), rgba(var(--green), 0.12));
        }
        &:nth-child(19) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.11), rgba(var(--green), 0.11));
        }
        &:nth-child(20) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.1), rgba(var(--green), 0.1));
        }
        &:nth-child(21) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.09), rgba(var(--green), 0.09));
        }
        &:nth-child(23) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.08), rgba(var(--green), 0.08));
        }
        &:nth-child(24) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.07), rgba(var(--green), 0.07));
        }
        &:nth-child(25 + n) > * > * > *:first-child {
            background-image: linear-gradient(rgba(var(--green), 0.06), rgba(var(--green), 0.06));
        }
    }
`;

export default Style;
