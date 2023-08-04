"use client";
import { Root } from "lib/style";
import { css, styled } from "styled-components";

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
    font-size: 8em;
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $height }) => $height}em;
    color: ${({ $color, $change }) => ($change ? "rgb(var(--change))" : $color ? `rgb(${Root.Color($color)})` : $color)};
    text-overflow: ellipsis;
    overflow: hidden;
    ${({ $fix }) => $fix && "white-space: nowrap;"}
    ${({ $align }) => $align && `text-align: ${$align};`};
    ${({ $opacity }) => $opacity && `opacity: ${$opacity};`}
    ${({ $case }) =>
        $case && ($case === "upper" ? "text-transform: uppercase;" : $case === "lower" ? "text-transform: lowercase;" : "text-transform: capitalize;")}
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
    font-size: 6em;
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $height }) => $height}em;
    color: ${({ $color, $change }) => ($change ? "rgb(var(--change))" : $color ? `rgb(${Root.Color($color)})` : $color)};
    text-overflow: ellipsis;
    overflow: hidden;
    ${({ $fix }) => $fix && "white-space: nowrap;"}
    ${({ $align }) => $align && `text-align: ${$align};`};
    ${({ $opacity }) => $opacity && `opacity: ${$opacity};`}
    ${({ $case }) =>
        $case && ($case === "upper" ? "text-transform: uppercase;" : $case === "lower" ? "text-transform: lowercase;" : "text-transform: capitalize;")}
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
    font-size: 5em;
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $height }) => $height}em;
    color: ${({ $color, $change }) => ($change ? "rgb(var(--change))" : $color ? `rgb(${Root.Color($color)})` : $color)};
    text-overflow: ellipsis;
    overflow: hidden;
    ${({ $fix }) => $fix && "white-space: nowrap;"}
    ${({ $align }) => $align && `text-align: ${$align};`};
    ${({ $opacity }) => $opacity && `opacity: ${$opacity};`}
    ${({ $case }) =>
        $case && ($case === "upper" ? "text-transform: uppercase;" : $case === "lower" ? "text-transform: lowercase;" : "text-transform: capitalize;")}
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
    font-size: 4em;
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $height }) => $height}em;
    color: ${({ $color, $change }) => ($change ? "rgb(var(--change))" : $color ? `rgb(${Root.Color($color)})` : $color)};
    text-overflow: ellipsis;
    overflow: hidden;
    ${({ $fix }) => $fix && "white-space: nowrap;"}
    ${({ $align }) => $align && `text-align: ${$align};`};
    ${({ $opacity }) => $opacity && `opacity: ${$opacity};`}
    ${({ $case }) =>
        $case && ($case === "upper" ? "text-transform: uppercase;" : $case === "lower" ? "text-transform: lowercase;" : "text-transform: capitalize;")}
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
    font-size: 3em;
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $height }) => $height}em;
    color: ${({ $color, $change }) => ($change ? "rgb(var(--change))" : $color ? `rgb(${Root.Color($color)})` : $color)};
    text-overflow: ellipsis;
    overflow: hidden;
    ${({ $fix }) => $fix && "white-space: nowrap;"}
    ${({ $align }) => $align && `text-align: ${$align};`};
    ${({ $opacity }) => $opacity && `opacity: ${$opacity};`}
    ${({ $case }) =>
        $case && ($case === "upper" ? "text-transform: uppercase;" : $case === "lower" ? "text-transform: lowercase;" : "text-transform: capitalize;")}
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
    font-size: 2em;
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $height }) => $height}em;
    color: ${({ $color, $change }) => ($change ? "rgb(var(--change))" : $color ? `rgb(${Root.Color($color)})` : $color)};
    text-overflow: ellipsis;
    overflow: hidden;
    ${({ $fix }) => $fix && "white-space: nowrap;"}
    ${({ $align }) => $align && `text-align: ${$align};`};
    ${({ $opacity }) => $opacity && `opacity: ${$opacity};`}
    ${({ $case }) =>
        $case && ($case === "upper" ? "text-transform: uppercase;" : $case === "lower" ? "text-transform: lowercase;" : "text-transform: capitalize;")}
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
    font-size: 1.5em;
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $height }) => $height}em;
    color: ${({ $color, $change }) => ($change ? "rgb(var(--change))" : $color ? `rgb(${Root.Color($color)})` : $color)};
    text-overflow: ellipsis;
    overflow: hidden;
    ${({ $fix }) => $fix && "white-space: nowrap;"}
    ${({ $align }) => $align && `text-align: ${$align};`};
    ${({ $opacity }) => $opacity && `opacity: ${$opacity};`}
    ${({ $case }) =>
        $case && ($case === "upper" ? "text-transform: uppercase;" : $case === "lower" ? "text-transform: lowercase;" : "text-transform: capitalize;")}
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
    font-size: 1.5em;
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $height }) => $height}em;
    color: ${({ $color, $change }) => ($change ? "rgb(var(--change))" : $color ? `rgb(${Root.Color($color)})` : $color)};
    text-overflow: ellipsis;
    overflow: hidden;
    ${({ $fix }) => $fix && "white-space: nowrap;"}
    ${({ $align }) => $align && `text-align: ${$align};`};
    opacity: ${({ $opacity }) => ($opacity ? `${$opacity}` : 0.6)};
    ${({ $case }) =>
        $case && ($case === "upper" ? "text-transform: uppercase;" : $case === "lower" ? "text-transform: lowercase;" : "text-transform: capitalize;")}
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
    font-size: 1.25em;
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $height }) => $height}em;
    color: ${({ $color, $change }) => ($change ? "rgb(var(--change))" : $color ? `rgb(${Root.Color($color)})` : $color)};
    text-overflow: ellipsis;
    overflow: hidden;
    ${({ $fix }) => $fix && "white-space: nowrap;"}
    ${({ $align }) => $align && `text-align: ${$align};`};
    opacity: ${({ $opacity }) => ($opacity ? `${$opacity}` : 0.45)};
    ${({ $case }) =>
        $case && ($case === "upper" ? "text-transform: uppercase;" : $case === "lower" ? "text-transform: lowercase;" : "text-transform: capitalize;")}
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
    font-size: ${({ $size }) => $size}em;
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $height }) => $height}em;
    ${({ $align }) => $align && `text-align: ${$align};`};
    color: ${({ $color, $change }) => ($change ? "rgb(var(--change))" : $color ? `rgb(${Root.Color($color)})` : $color)};
    text-overflow: ellipsis;
    overflow: hidden;
    ${({ $fix }) => $fix && "white-space: nowrap;"}
    ${({ $opacity }) => $opacity && `opacity: ${$opacity};`}
    ${({ $case }) =>
        $case && ($case === "upper" ? "text-transform: uppercase;" : $case === "lower" ? "text-transform: lowercase;" : "text-transform: capitalize;")}
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

    ${({ $responsive }) => {
        if ($responsive?.device) {
            const style = `
                ${$responsive?.size && `font-size: calc(var(--unit) * ${$responsive?.size});`}
                ${$responsive?.weight && `font-weight: ${$responsive?.weight}`};
                ${$responsive?.align && `text-align: ${$responsive?.align}`};
                ${$responsive?.line && `line-height: ${$responsive?.line}em;`}
                ${$responsive?.color ? `color: rgb(${Root.Color($responsive?.$color)});` : $responsive?.change && `color: rgb(var(--change));`}
                ${$responsive?.$opacity && `opacity: ${$responsive.opacity};`}
            `;

            switch ($responsive?.device) {
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
    }}
`;
