"use client";
import { styled } from "styled-components";
import { Root } from "lib/style";
import * as Row from "components/layouts/row/Row.styled";
import * as Tab from "components/controls/tab/Tab.styled";
import * as Button from "components/controls/button/Button.styled";
import * as Avatar from "components/elements/avatar/Avatar.styled";
import * as Dropdown from "components/controls/dropdown/Dropdown.styled";

export const Logo = styled.a`
    max-width: max-content;
    @media all and (min-width: ${Root.Device.Desktop}px) {
        margin-left: calc(var(--unit) * 4);
    }

    @media all and (max-width: ${Root.Device.Tablet}px) {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
    }
`;

export const Nav = styled.nav<{ $scale: number; $color: string }>`
    font-size: calc(var(--unit) * ${({ $scale }) => $scale});
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: max-content;
    padding: 0 2em;

    & > a {
        color: rgb(${({ $color }) => Root.Color($color)});
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        font-size: 1.5em;
        font-weight: bold;
        text-decoration: none;
        transition: 0.3s ease;
    }

    &:hover {
        & > * {
            color: white;
        }
    }

    &:after {
        content: "";
        font-size: calc(var(--unit) * ${({ $scale }) => $scale});
        background-image: linear-gradient(90deg, transparent, white, transparent);
        position: absolute;
        bottom: 0;
        width: 0;
        height: 0.25em;
        transition: 0.3s ease;
    }

    &[data-active="true"] {
        pointer-events: none;

        & > a {
            color: white;
        }

        &:after {
            width: 250%;
        }
    }

    @media all and (max-width: ${Root.Device.Laptop}px) {
        & > a {
            font-size: 1.25em;
        }
    }

    @media all and (max-width: ${Root.Device.Tablet}px) {
        &:after {
            display: none;
        }
    }
`;

export const MenuButton = styled.div`
    font-size: calc(var(--unit) * 1);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: absolute;
    top: 1em;
    left: 1em;
    width: 3em;
    height: 3em;
    padding: 0.5em;
    opacity: 0;

    @media all and (max-width: ${Root.Device.Tablet}px) {
        & > * {
            background: white;
            width: 100%;
            height: 0.2em;
        }
    }
`;

export const Menu = styled.div`
    display: flex;
    height: 100%;
    transition: 0.3s ease;

    & ${Nav} {
        height: 100%;
    }

    @media all and (max-width: ${Root.Device.Tablet}px) {
        background: rgba(0, 0, 0, 0.9);
        position: fixed;
        top: 6em;
        left: 0;
        flex-direction: column;
        width: calc(100% - (4em * 2));
        height: calc(100% - (4em * 2) - 6em);
        padding: 4em;
        z-index: 100;
        transition: 0.3s ease;

        & > * {
            max-width: initial;
            align-items: flex-start;
        }

        & ${Nav} {
            font-size: 2em;
            padding: 1.5em 3em;
            height: max-content;
        }

        &[data-active="true"] {
            max-height: 100vh;
            opacity: 1;
            pointer-events: inherit;
        }

        &[data-active="false"] {
            max-height: 0;
        }
    }
`;

export const Side = styled.div<{ $scale: number; $width: number }>`
    font-size: calc(var(--unit) * ${({ $scale }) => $scale});
    max-width: ${({ $width }) => $width}em;
    transition: 0.3s ease;
    z-index: 20;

    & > ${Row.default} {
        padding: 0 2em;
        justify-content: space-between;
    }

    @media all and (max-width: ${Root.Device.Tablet}px) {
        position: fixed;
        display: flex;
        top: 6em;
        left: 0;
        max-width: initial;
        width: calc(100% - (4em * 2));
        height: calc(100% - (4em * 2) - 6em);
        background: rgba(0, 0, 0, 0.9);
        z-index: 100;
        padding: 4em;
        opacity: 0;

        &[data-active="false"] {
            opacity: 0;
            pointer-events: none;
        }

        &&& > ${Row.default} {
            width: 100%;
            flex-flow: column-reverse;
            height: max-content;
            max-height: max-content;
            padding: 0;

            & ${Row.default} {
                width: 100%;
                height: max-content;
                max-width: initial;
                max-height: max-content;
                flex-flow: column;
                align-items: flex-start;
                padding: 0;
            }
        }

        &&& ${Row.default} {
            & > *:not(${Row.default}) {
                font-size: 1em;
                width: 100%;
                max-width: initial;
                min-width: initial;
            }

            & ${Button.default} {
                padding: 1em;
            }

            & ${Avatar.default} {
                font-size: 0.75em;
            }

            & ${Dropdown.default} {
                max-height: 4.8em;

                ${Dropdown.Item} {
                    width: calc(100% - 6em);
                    padding: 1.5em;
                    padding-right: 4.5em;

                    & > i {
                        right: 0.5em;
                    }
                }
            }
        }

        &[data-active="true"] {
            opacity: 1;
            pointer-events: inherit;
        }
    }
`;

const Style = styled.header<{ $scale: number; $color: string; $height: number; $side: number }>`
    position: relative;
    font-size: calc(var(--unit) * ${({ $scale }) => $scale});
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: rgb(var(--black));
    min-height: ${({ $height }) => $height || 8}em;

    & > ${Row.default} > ${Row.default} {
        padding: 0 3em;

        &:first-child:not(:only-child) {
            padding-right: 2em;
        }
    }

    && ${Row.default} {
        height: 100%;
        flex-flow: row;
        align-items: center;
        z-index: 22;
    }

    &:after {
        position: absolute;
        content: "";
        background-color: rgb(${({ $color }) => Root.Color($color)});
        width: 100%;
        min-height: 0.25em;
        bottom: 0;
        z-index: 21;
    }

    @media all and (max-width: ${Root.Device.Laptop}px) {
        min-height: 6em;
    }

    @media all and (max-width: ${Root.Device.Tablet}px) {
        & > ${Row.default} > ${Row.default} {
            padding: 0 1em;
            transition: 0.3s ease;

            &:first-child:not(:only-child) {
                padding-right: 1em;
            }
        }

        & > ${Row.default} > ${Row.default}:last-child:not(:only-child),
        ${Menu}, ${Side} {
            &[data-active="false"] {
                opacity: 0;
                pointer-events: none;
            }
        }
    }
`;

export default Style;
