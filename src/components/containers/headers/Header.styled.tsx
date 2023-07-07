import * as Row from "components/layouts/row/Row.styled";
import { Root } from "lib/style";
import { styled } from "styled-components";

export const Logo = styled.a`
    max-width: max-content;

    @media all and (max-width: ${Root.Device.Mobile}px) {
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
        z-index: 10;
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

        &:after {
            display: none;
        }
    }
`;

export const Menu = styled.div`
    display: flex;
    height: 100%;

    & ${Nav} {
        height: 100%;
    }

    @media all and (max-width: ${Root.Device.Mobile}px) {
        position: fixed;
        bottom: 0;
        left: 0;
        flex-direction: column;
        width: 100%;
        height: calc(100% - 8em);
        background: rgba(0, 0, 0, 0.9);
        z-index: 100;
        padding-top: 2em;

        & ${Nav} {
            font-size: 2em;
            padding: 1.5em 3em;
            height: max-content;
        }
    }
`;

export const Side = styled.div<{ $scale: number; $width: number }>`
    font-size: calc(var(--unit) * ${({ $scale }) => $scale});
    max-width: ${({ $width }) => $width}em;

    & > ${Row.default} {
        padding: 0 2em;
        justify-content: space-between;
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
    }

    &:after {
        position: absolute;
        content: "";
        background-color: rgb(${({ $color }) => Root.Color($color)});
        width: 100%;
        min-height: 0.25em;
        bottom: 0;
        z-index: 5;
    }

    @media all and (max-width: ${Root.Device.Laptop}px) {
        min-height: 6em;
    }
`;

export default Style;
