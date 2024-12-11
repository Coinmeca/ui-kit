"use client";
import { css, styled } from "styled-components";
import { Root } from "lib/style";
import * as Icon from "components/elements/icon/Icon.styled";
import { Responsive } from "./Text";

const responsive = (responsive: Responsive) => {
    if (responsive?.device) {
        const style = `
                ${responsive?.size && `font-size: calc(var(--unit) * ${responsive?.size});`}
                ${responsive?.weight && `font-weight: ${responsive?.weight}`};
                ${responsive?.align && `text-align: ${responsive?.align}`};
                ${responsive?.height && `line-height: ${responsive?.height}em;`}
                ${
                    responsive?.color
                        ? `color: rgb(${Root.Color(responsive?.color)});`
                        : responsive?.change && `color: rgb(var(--change));`
                }
                ${responsive?.opacity && `opacity: ${responsive.opacity};`}
            `;

        switch (responsive?.device) {
            case "laptop":
                return css`
                    @media all and (max-width: ${Root.Device.Laptop}px) {
                        ${style}
                    }
                `;
            case "tablet":
                return css`
                    @media all and (max-width: ${Root.Device.Tablet}px) {
                        ${style}
                    }
                `;
            case "mobile":
                return css`
                    @media all and (max-width: ${Root.Device.Mobile}px) {
                        ${style}
                    }
                `;
        }
    }
};

export const H1 = styled.h1<{
    $color: string;
    $change?: boolean;
    $opacity?: number;
    $weight: number | string;
    $height: number;
    $align?: "left" | "center" | "right";
    $case?: "upper" | "lower" | "capital";
    $fit?: boolean;
    $fix?: boolean;
}>`
    word-break: break-word;
    vertical-align: middle;
    font-size: 8em;
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $height }) => $height}em;
    color: ${({ $color, $change }) =>
        $change ? "rgb(var(--change))" : $color === Root.Color($color) ? $color : `rgb(${Root.Color($color)})`};
    ${({ $align }) => $align && `text-align: ${$align};`};
    ${({ $opacity }) => $opacity && `opacity: ${$opacity};`}
    ${({ $case }) =>
        $case &&
        ($case === "upper"
            ? "text-transform: uppercase;"
            : $case === "lower"
            ? "text-transform: lowercase;"
            : "text-transform: capitalize;")}
    ${({ $fix }) =>
        $fix &&
        css`
            min-height: 1em;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        `}
    ${({ $fit }) =>
        $fit &&
        css`
            min-width: max-content;
            max-width: max-content;
        `}
    ${({ $change }) =>
        $change &&
        css`
            ::selection {
                color: var(--black);
                background: rgb(var(--change));
            }
        `}

    & > * {
        display: inline;
        vertical-align: middle;
    }

    & > ${Icon.default} {
        font-size: 1.5em;
    }

    @media all and (max-width: ${Root.Device.Mobile}px) {
        font-size: 6em;
    }
`;

export const H2 = styled.h2<{
    $color: string;
    $change?: boolean;
    $opacity?: number;
    $weight: number | string;
    $height: number;
    $align?: "left" | "center" | "right";
    $case?: "upper" | "lower" | "capital";
    $fit?: boolean;
    $fix?: boolean;
}>`
    word-break: break-word;
    vertical-align: middle;
    font-size: 6em;
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $height }) => $height}em;
    color: ${({ $color, $change }) =>
        $change ? "rgb(var(--change))" : $color === Root.Color($color) ? $color : `rgb(${Root.Color($color)})`};
    ${({ $align }) => $align && `text-align: ${$align};`};
    ${({ $opacity }) => $opacity && `opacity: ${$opacity};`}
    ${({ $case }) =>
        $case &&
        ($case === "upper"
            ? "text-transform: uppercase;"
            : $case === "lower"
            ? "text-transform: lowercase;"
            : "text-transform: capitalize;")}
    ${({ $fix }) =>
        $fix &&
        css`
            min-height: 1em;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        `}
    ${({ $fit }) =>
        $fit &&
        css`
            min-width: max-content;
            max-width: max-content;
        `}
    ${({ $change }) =>
        $change &&
        css`
            ::selection {
                color: var(--white);
                background: rgb(var(--change));
            }
        `}

    & >* {
        display: inline;
        vertical-align: middle;
    }

    & > ${Icon.default} {
        font-size: 1.5em;
    }

    @media all and (max-width: ${Root.Device.Mobile}px) {
        font-size: 4em;
    }
`;

export const H3 = styled.h3<{
    $color: string;
    $change?: boolean;
    $opacity?: number;
    $weight: number | string;
    $height: number;
    $align?: "left" | "center" | "right";
    $case?: "upper" | "lower" | "capital";
    $fit?: boolean;
    $fix?: boolean;
}>`
    word-break: break-word;
    vertical-align: middle;
    font-size: 5em;
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $height }) => $height}em;
    color: ${({ $color, $change }) =>
        $change ? "rgb(var(--change))" : $color === Root.Color($color) ? $color : `rgb(${Root.Color($color)})`};
    ${({ $align }) => $align && `text-align: ${$align};`};
    ${({ $opacity }) => $opacity && `opacity: ${$opacity};`}
    ${({ $case }) =>
        $case &&
        ($case === "upper"
            ? "text-transform: uppercase;"
            : $case === "lower"
            ? "text-transform: lowercase;"
            : "text-transform: capitalize;")}
    ${({ $fix }) =>
        $fix &&
        css`
            min-height: 1em;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        `}
    ${({ $fit }) =>
        $fit &&
        css`
            min-width: max-content;
            max-width: max-content;
        `}
    ${({ $change }) =>
        $change &&
        css`
            ::selection {
                color: var(--white);
                background: rgb(var(--change));
            }
        `}

    & >* {
        display: inline;
        vertical-align: middle;
    }

    & > ${Icon.default} {
        font-size: 1.5em;
    }

    @media all and (max-width: ${Root.Device.Mobile}px) {
        font-size: 3em;
    }
`;

export const H4 = styled.h4<{
    $color: string;
    $change?: boolean;
    $opacity?: number;
    $weight: number | string;
    $height: number;
    $align?: "left" | "center" | "right";
    $case?: "upper" | "lower" | "capital";
    $fit?: boolean;
    $fix?: boolean;
}>`
    word-break: break-word;
    vertical-align: middle;
    font-size: 4em;
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $height }) => $height}em;
    color: ${({ $color, $change }) =>
        $change ? "rgb(var(--change))" : $color === Root.Color($color) ? $color : `rgb(${Root.Color($color)})`};
    ${({ $align }) => $align && `text-align: ${$align};`};
    ${({ $opacity }) => $opacity && `opacity: ${$opacity};`}
    ${({ $case }) =>
        $case &&
        ($case === "upper"
            ? "text-transform: uppercase;"
            : $case === "lower"
            ? "text-transform: lowercase;"
            : "text-transform: capitalize;")}
    ${({ $fix }) =>
        $fix &&
        css`
            min-height: 1em;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        `}
    ${({ $fit }) =>
        $fit &&
        css`
            min-width: max-content;
            max-width: max-content;
        `}
    ${({ $change }) =>
        $change &&
        css`
            ::selection {
                color: var(--white);
                background: rgb(var(--change));
            }
        `}

    & >* {
        display: inline;
        vertical-align: middle;
    }

    & > ${Icon.default} {
        font-size: 1.5em;
    }

    @media all and (max-width: ${Root.Device.Mobile}px) {
        font-size: 2.5em;
    }
`;

export const H5 = styled.h5<{
    $color: string;
    $change?: boolean;
    $opacity?: number;
    $weight: number | string;
    $height: number;
    $align?: "left" | "center" | "right";
    $case?: "upper" | "lower" | "capital";
    $fit?: boolean;
    $fix?: boolean;
}>`
    word-break: break-word;
    vertical-align: middle;
    font-size: 3em;
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $height }) => $height}em;
    color: ${({ $color, $change }) =>
        $change ? "rgb(var(--change))" : $color === Root.Color($color) ? $color : `rgb(${Root.Color($color)})`};
    ${({ $align }) => $align && `text-align: ${$align};`};
    ${({ $opacity }) => $opacity && `opacity: ${$opacity};`}
    ${({ $case }) =>
        $case &&
        ($case === "upper"
            ? "text-transform: uppercase;"
            : $case === "lower"
            ? "text-transform: lowercase;"
            : "text-transform: capitalize;")}
    ${({ $fix }) =>
        $fix &&
        css`
            min-height: 1em;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        `}
    ${({ $fit }) =>
        $fit &&
        css`
            min-width: max-content;
            max-width: max-content;
        `}
    ${({ $change }) =>
        $change &&
        css`
            ::selection {
                color: var(--white);
                background: rgb(var(--change));
            }
        `}

    & >* {
        display: inline;
        vertical-align: middle;
    }

    & > ${Icon.default} {
        font-size: 1.5em;
    }

    @media all and (max-width: ${Root.Device.Mobile}px) {
        font-size: 2em;
    }
`;

export const H6 = styled.h6<{
    $color: string;
    $change?: boolean;
    $opacity?: number;
    $weight: number | string;
    $height: number;
    $align?: "left" | "center" | "right";
    $case?: "upper" | "lower" | "capital";
    $fit?: boolean;
    $fix?: boolean;
}>`
    word-break: break-word;
    vertical-align: middle;
    font-size: 2em;
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $height }) => $height}em;
    color: ${({ $color, $change }) =>
        $change ? "rgb(var(--change))" : $color === Root.Color($color) ? $color : `rgb(${Root.Color($color)})`};
    ${({ $align }) => $align && `text-align: ${$align};`};
    ${({ $opacity }) => $opacity && `opacity: ${$opacity};`}
    ${({ $case }) =>
        $case &&
        ($case === "upper"
            ? "text-transform: uppercase;"
            : $case === "lower"
            ? "text-transform: lowercase;"
            : "text-transform: capitalize;")}
    ${({ $fix }) =>
        $fix &&
        css`
            min-height: 1em;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        `}
    ${({ $fit }) =>
        $fit &&
        css`
            min-width: max-content;
            max-width: max-content;
        `}
    ${({ $change }) =>
        $change &&
        css`
            ::selection {
                color: var(--white);
                background: rgb(var(--change));
            }
        `}

    & >* {
        display: inline;
        vertical-align: middle;
    }

    & > ${Icon.default} {
        font-size: 1.5em;
    }

    @media all and (max-width: ${Root.Device.Mobile}px) {
        font-size: 1.75em;
    }
`;

export const Strong = styled.strong<{
    $color: string;
    $change?: boolean;
    $opacity?: number;
    $weight: number | string;
    $height: number;
    $align?: "left" | "center" | "right";
    $case?: "upper" | "lower" | "capital";
    $fit?: boolean;
    $fix?: boolean;
}>`
    word-break: break-word;
    vertical-align: middle;
    font-size: 1.5em;
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $height }) => $height}em;
    color: ${({ $color, $change }) =>
        $change ? "rgb(var(--change))" : $color === Root.Color($color) ? $color : `rgb(${Root.Color($color)})`};
    ${({ $align }) => $align && `text-align: ${$align};`};
    ${({ $opacity }) => $opacity && `opacity: ${$opacity};`}
    ${({ $case }) =>
        $case &&
        ($case === "upper"
            ? "text-transform: uppercase;"
            : $case === "lower"
            ? "text-transform: lowercase;"
            : "text-transform: capitalize;")}
    ${({ $fix }) =>
        $fix &&
        css`
            min-height: 1em;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        `}
    ${({ $fit }) =>
        $fit &&
        css`
            min-width: max-content;
            max-width: max-content;
        `}
    ${({ $change }) =>
        $change &&
        css`
            ::selection {
                color: var(--white);
                background: rgb(var(--change));
            }
        `}

    & >* {
        display: inline;
        vertical-align: middle;
    }

    & > ${Icon.default} {
        font-size: 1.5em;
    }
`;

export const P = styled.p<{
    $color: string;
    $change?: boolean;
    $opacity?: number;
    $weight: number | string;
    $height: number;
    $align?: "left" | "center" | "right";
    $case?: "upper" | "lower" | "capital";
    $fit?: boolean;
    $fix?: boolean;
}>`
    word-break: break-word;
    vertical-align: middle;
    font-size: 1.5em;
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $height }) => $height}em;
    color: ${({ $color, $change }) =>
        $change ? "rgb(var(--change))" : $color === Root.Color($color) ? $color : `rgb(${Root.Color($color)})`};
    ${({ $align }) => $align && `text-align: ${$align};`};
    opacity: ${({ $opacity }) => ($opacity ? `${$opacity}` : 0.6)};
    ${({ $case }) =>
        $case &&
        ($case === "upper"
            ? "text-transform: uppercase;"
            : $case === "lower"
            ? "text-transform: lowercase;"
            : "text-transform: capitalize;")}
    ${({ $fix }) =>
        $fix &&
        css`
            min-height: 1em;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        `}
    ${({ $fit }) =>
        $fit &&
        css`
            min-width: max-content;
            max-width: max-content;
        `}
    ${({ $change }) =>
        $change &&
        css`
            ::selection {
                color: var(--white);
                background: rgb(var(--change));
            }
        `}

    & >* {
        display: inline;
        vertical-align: middle;
    }

    & > ${Icon.default} {
        font-size: 1.5em;
    }
`;

export const Desc = styled.p<{
    $color: string;
    $change?: boolean;
    $opacity?: number;
    $weight: number | string;
    $height: number;
    $align?: "left" | "center" | "right";
    $case?: "upper" | "lower" | "capital";
    $fit?: boolean;
    $fix?: boolean;
}>`
    word-break: break-word;
    vertical-align: middle;
    font-size: 1.25em;
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $height }) => $height}em;
    color: ${({ $color, $change }) =>
        $change ? "rgb(var(--change))" : $color === Root.Color($color) ? $color : `rgb(${Root.Color($color)})`};
    ${({ $align }) => $align && `text-align: ${$align};`};
    opacity: ${({ $opacity }) => ($opacity ? `${$opacity}` : 0.45)};
    ${({ $case }) =>
        $case &&
        ($case === "upper"
            ? "text-transform: uppercase;"
            : $case === "lower"
            ? "text-transform: lowercase;"
            : "text-transform: capitalize;")}
    ${({ $fix }) =>
        $fix &&
        css`
            min-height: 1em;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        `}
    ${({ $fit }) =>
        $fit &&
        css`
            min-width: max-content;
            max-width: max-content;
        `}
    ${({ $change }) =>
        $change &&
        css`
            ::selection {
                color: var(--white);
                background: rgb(var(--change));
            }
        `}

    & >* {
        display: inline;
        vertical-align: middle;
    }

    & > ${Icon.default} {
        font-size: 1.5em;
    }
`;

export const Text = styled.span<{
    $size: number;
    $color: string;
    $change?: boolean;
    $opacity?: number;
    $weight: number | string;
    $height: number;
    $align?: "left" | "center" | "right";
    $case?: "upper" | "lower" | "capital";
    $responsive?: any;
    $fit?: boolean;
    $fix?: boolean;
}>`
    word-break: break-word;
    vertical-align: middle;
    font-size: ${({ $size }) => $size}em;
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $height }) => $height}em;
    ${({ $align }) => $align && `text-align: ${$align};`};
    color: ${({ $color, $change }) =>
        $change ? "rgb(var(--change))" : $color === Root.Color($color) ? $color : `rgb(${Root.Color($color)})`};
    ${({ $opacity }) => $opacity && `opacity: ${$opacity};`}
    ${({ $case }) =>
        $case &&
        ($case === "upper"
            ? "text-transform: uppercase;"
            : $case === "lower"
            ? "text-transform: lowercase;"
            : "text-transform: capitalize;")}
    ${({ $fix }) =>
        $fix &&
        css`
            min-height: 1em;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        `}
    ${({ $fit }) =>
        $fit &&
        css`
            min-width: max-content;
            max-width: max-content;
        `}
    ${({ $change }) =>
        $change &&
        css`
            &::selection {
                color: rgb(var(--black));
                background: rgb(var(--change));
            }
        `}

    & >* {
        vertical-align: middle;
    }

    & > ${Icon.default} {
        font-size: 1.5em;
    }

    :is(${H1}, ${H2}, ${H3}, ${H4}, ${H5}, ${H6}, ${Strong}, ${P}, ${Desc}, &) > & {
        display: inline;
        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
        text-align: inherit;
    }

    ${({ $responsive }) => responsive($responsive)}
`;

export const Link = styled.a<{
    $size: number;
    $color: string;
    $change?: boolean;
    $opacity?: number;
    $weight: number | string;
    $height: number;
    $align?: "left" | "center" | "right";
    $case?: "upper" | "lower" | "capital";
    $responsive?: any;
    $fit?: boolean;
    $fix?: boolean;
}>`
    display: inline;
    word-break: break-word;
    vertical-align: middle;
    text-decoration: underline;
    text-underline-offset: 0.25em;
    padding: 0 0.3em 0.15em 0.3em;
    transition: 0.3s ease;
    cursor: pointer;
    font-size: ${({ $size }) => ($size ? `${$size}em` : "inherit")};
    font-weight: ${({ $weight }) => ($weight ? $weight : "inherit")};
    line-height: ${({ $height }) => ($height ? `${$height}em` : "inherit")};
    color: ${({ $color, $change }) =>
        $change ? "rgb(var(--change))" : $color === Root.Color($color) ? $color : `rgb(${Root.Color($color)})`};
    ${({ $align }) => ($align ? `text-align: ${$align}` : "inherit")};
    ${({ $opacity }) => $opacity && `opacity: ${$opacity};`}
    ${({ $case }) =>
        $case &&
        ($case === "upper"
            ? "text-transform: uppercase;"
            : $case === "lower"
            ? "text-transform: lowercase;"
            : "text-transform: capitalize;")}
    ${({ $fix }) =>
        $fix &&
        css`
            min-height: 1em;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        `}
    ${({ $fit }) =>
        $fit &&
        css`
            min-width: max-content;
            max-width: max-content;
        `}
    ${({ $change }) =>
        $change &&
        css`
            &::selection {
                color: rgb(var(--black));
                background: rgb(var(--change));
            }
        `}

    & >* {
        vertical-align: middle;
    }

    & > ${Icon.default} {
        font-size: 1.5em;
    }

    &:hover {
        opacity: ${({ $opacity }) => ($opacity === 1 ? 0.45 : 1)};
    }

    &:active {
        background: ${({ $color, $change }) =>
            $change
                ? "rgba(var(--change),0.15)"
                : $color
                ? $color === Root.Color($color)
                    ? $color
                    : `rgba(${Root.Color($color)},0.15)`
                : "rgba(var(--white),0.15)"};
    }

    :is(${H1}, ${H2}, ${H3}, ${H4}, ${H5}, ${H6}, ${Strong}, ${P}, ${Desc}, ${Text}, &) > & {
        display: inline;
        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
        text-align: inherit;
    }

    ${({ $responsive }) => responsive($responsive)}
`;

export const Button = styled.a<{
    $size: number;
    $color: string;
    $change?: boolean;
    $weight: number | string;
    $height: number;
    $align?: "left" | "center" | "right";
    $case?: "upper" | "lower" | "capital";
    $responsive?: any;
    $fit?: boolean;
    $fix?: boolean;
}>`
    display: inline;
    word-break: break-word;
    vertical-align: middle;
    text-decoration: none;
    text-underline-offset: 0.25em;
    padding: 0 0.3em 0.15em 0.3em;
    opacity: 0.45;
    transition: 0.3s ease;
    cursor: pointer;
    font-size: ${({ $size }) => ($size ? `${$size}em` : "inherit")};
    font-weight: ${({ $weight }) => ($weight ? $weight : "inherit")};
    line-height: ${({ $height }) => ($height ? `${$height}em` : "inherit")};
    color: ${({ $color, $change }) =>
        $change ? "rgb(var(--change))" : $color === Root.Color($color) ? $color : `rgb(${Root.Color($color)})`};
    ${({ $align }) => ($align ? `text-align: ${$align}` : "inherit")};
    ${({ $case }) =>
        $case &&
        ($case === "upper"
            ? "text-transform: uppercase;"
            : $case === "lower"
            ? "text-transform: lowercase;"
            : "text-transform: capitalize;")}
    ${({ $fix }) =>
        $fix &&
        css`
            min-height: 1em;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        `}
    ${({ $fit }) =>
        $fit &&
        css`
            min-width: max-content;
            max-width: max-content;
        `}
    ${({ $change }) =>
        $change &&
        css`
            &::selection {
                color: rgb(var(--black));
                background: rgb(var(--change));
            }
        `}

    & >* {
        vertical-align: middle;
    }

    & > ${Icon.default} {
        font-size: 1.5em;
    }

    &:hover {
        opacity: 1;
    }

    &:active {
        background: ${({ $color, $change }) =>
            $change
                ? "rgba(var(--change),0.15)"
                : $color
                ? $color === Root.Color($color)
                    ? $color
                    : `rgba(${Root.Color($color)},0.15)`
                : "rgba(var(--white),0.15)"};
    }

    :is(${H1}, ${H2}, ${H3}, ${H4}, ${H5}, ${H6}, ${Strong}, ${P}, ${Desc}, ${Text}, ${Link}, &) > & {
        display: inline;
        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
        text-align: inherit;
    }

    ${({ $responsive }) => responsive($responsive)}
`;
