"use client";
import { Root } from "lib/style";
import { css, styled } from "styled-components";

const Responsive = (vertical: boolean, margin?: number) => {
    return !vertical
        ? css`
              ${margin && margin > 0 && `margin: ${margin}em 0`};
              width: 100%;
              min-width: 100%;
              max-width: 100%;
              height: 1px;
              min-height: 1px;
              max-height: 1px;
          `
        : css`
              ${margin && margin > 0 && `margin: 0 ${margin}em`};
              width: 1px;
              min-width: 1px;
              max-width: 1px;
              height: 100%;
              min-height: 100%;
              max-height: 100%;
          `;
};

const Style = styled.div<{
    $color: string;
    $vertical: boolean;
    $gap: number;
    $margin: number;
    $strong: boolean;
    $responsive?: "desktop" | "laptop" | "tablet" | "mobile";
}>`
    font-size: 1em;
    min-width: max-content;
    min-height: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: ${({ $vertical }) => (!$vertical ? "row" : "column")};
    gap: ${({ $gap }) => $gap || 2}em;

    & > div {
        background: rgba(${({ $color }) => Root.Color($color)}, ${({ $strong }) => ($strong ? "var(--o1)" : "var(--o015)")});
        width: inherit;
        height: inherit;
    }

    ${({ $vertical, $margin }) => Responsive($vertical, $margin)}

    ${({ $responsive, $vertical, $margin }) => {
        switch ($responsive) {
            case "laptop":
                return css`
                    @media all and (max-width: ${Root.Device.Laptop}px) {
                        ${Responsive(!$vertical, $margin)};
                    }
                `;
            case "tablet":
                return css`
                    @media all and (max-width: ${Root.Device.Tablet}px) {
                        ${Responsive(!$vertical, $margin)};
                    }
                `;
            case "mobile":
                return css`
                    @media all and (max-width: ${Root.Device.Mobile}px) {
                        ${Responsive(!$vertical, $margin)};
                    }
                `;
        }
    }}
`;

export default Style;
