import { css, styled } from "styled-components";

const Style = styled.div<{ $vertical: boolean; $margin: number }>`
    background: rgba(var(--white), var(--o01));

    ${({ $vertical, $margin }) => {
        return !$vertical
            ? css`
                  margin: ${$margin > 0 && $margin}px 0;
                  width: 100%;
                  height: 1px;
              `
            : css`
                  margin: 0 ${$margin > 0 && $margin}px;
                  width: 1px;
                  height: 100%;
              `;
    }}
`;

export default Style;
