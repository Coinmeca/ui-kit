"use client";
import { Root } from "lib/style";
import { css, styled } from "styled-components";

export const H1 = styled.h1<{ $weight: number | string; $align: "left" | "center" | "right"; $line: number }>`
    font-size: calc(var(--unit) * 8);
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $line }) => $line}em;
    text-align: ${({ $align }) => $align};

    @media all and (max-width: ${Root.Device.Mobile}px) {
        font-size: calc(var(--unit) * 6);
    }
`;
export const H2 = styled.h2<{ $weight: number | string; $align: "left" | "center" | "right"; $line: number }>`
    font-size: calc(var(--unit) * 6);
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $line }) => $line}em;
    text-align: ${({ $align }) => $align};

    @media all and (max-width: ${Root.Device.Mobile}px) {
        font-size: calc(var(--unit) * 4);
    }
`;
export const H3 = styled.h3<{ $weight: number | string; $align: "left" | "center" | "right"; $line: number }>`
    font-size: calc(var(--unit) * 5);
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $line }) => $line}em;
    text-align: ${({ $align }) => $align};

    @media all and (max-width: ${Root.Device.Mobile}px) {
        font-size: calc(var(--unit) * 3);
    }
`;
export const H4 = styled.h4<{ $weight: number | string; $align: "left" | "center" | "right"; $line: number }>`
    font-size: calc(var(--unit) * 4);
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $line }) => $line}em;
    text-align: ${({ $align }) => $align};

    @media all and (max-width: ${Root.Device.Mobile}px) {
        font-size: calc(var(--unit) * 2.5);
    }
`;
export const H5 = styled.h5<{ $weight: number | string; $align: "left" | "center" | "right"; $line: number }>`
    font-size: calc(var(--unit) * 3);
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $line }) => $line}em;
    text-align: ${({ $align }) => $align};

    @media all and (max-width: ${Root.Device.Mobile}px) {
        font-size: calc(var(--unit) * 2);
    }
`;
export const H6 = styled.h6<{ $weight: number | string; $align: "left" | "center" | "right"; $line: number }>`
    font-size: calc(var(--unit) * 2);
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $line }) => $line}em;
    text-align: ${({ $align }) => $align};

    @media all and (max-width: ${Root.Device.Mobile}px) {
        font-size: calc(var(--unit) * 1.75);
    }
`;
export const Strong = styled.strong<{ $weight: number | string; $align: "left" | "center" | "right"; $line: number }>`
    font-size: calc(var(--unit) * 1.5);
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $line }) => $line}em;
    text-align: ${({ $align }) => $align};
`;
export const P = styled.p<{ $weight: number | string; $align: "left" | "center" | "right"; $line: number }>`
    font-size: calc(var(--unit) * 1.5);
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $line }) => $line}em;
    text-align: ${({ $align }) => $align};
    opacity: 0.6;
`;
export const Desc = styled.p<{ $weight: number | string; $align: "left" | "center" | "right"; $line: number }>`
    font-size: calc(var(--unit) * 1.5);
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $line }) => $line}em;
    text-align: ${({ $align }) => $align};
    opacity: 0.45;
`;
export const Text = styled.span<{ $scale: number; $weight: number | string; $align: "left" | "center" | "right"; $line: number; $responsive?: any; $size?: number }>`
    font-size: calc(var(--unit) * ${({ $scale }) => $scale});
    font-weight: ${({ $weight }) => $weight};
    line-height: ${({ $line }) => $line}em;
    text-align: ${({ $align }) => $align};

    ${({ $responsive }) => {
        if ($responsive?.device) {
            const style = `
                ${$responsive?.scale && `font-size: calc(var(--unit) * ${$responsive?.scale});`}
                ${$responsive?.weight && `font-weight: ${$responsive?.weight}`};
                ${$responsive?.align && `text-align: ${$responsive?.align}`};
                ${$responsive?.line && `line-height: ${$responsive?.line}em;`}
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
