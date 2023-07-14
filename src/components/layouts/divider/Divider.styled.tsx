"use client";
import { Root } from "lib/style";
import { css, styled } from "styled-components";

const Style = styled.div<{ $color: string; $vertical: boolean; $gap: number; $margin: number; $strong: boolean }>`
    font-size: calc(var(--unit) * 1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: ${({ $vertical }) => (!$vertical ? "row" : "column")};
    gap: ${({ $gap }) => $gap || 2}em;

    & > div {
        background: rgba(${({ $color }) => Root.Color($color)}, ${({ $strong }) => ($strong ? "var(--o1)" : "var(--o015)")});

        ${({ $vertical, $margin }) => {
            return !$vertical
                ? css`
                      ${$margin > 0 && `margin: ${$margin}em 0`};
                      width: 100%;
                      height: 1px;
                      min-height: 1px;
                      max-height: 1px;
                  `
                : css`
                      ${$margin > 0 && `margin: 0 ${$margin}em`};
                      width: 1px;
                      min-width: 1px;
                      max-width: 1px;
                      height: 100%;
                  `;
        }}
    }
`;

export default Style;
