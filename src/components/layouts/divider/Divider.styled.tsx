import { css, styled } from "styled-components";

const Style = styled.div<{ $vertical: boolean; $margin: number }>`
    background: rgba(var(--white), var(--o01));

    ${({ $vertical, $margin }) => {
        return !$vertical
            ? css`
                  ${$margin > 0 && `margin: ${$margin}px 0`};
                  width: 100%;
                  height: 1px;
                  min-height: 1px;
                  max-height: 1px;
              `
            : css`
                  ${$margin > 0 && `margin: 0 ${$margin}px`};
                  width: 1px;
                  min-width: 1px;
                  max-width: 1px;
                  height: 100%;
              `;
    }}
`;

export default Style;
