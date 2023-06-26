import { styled, css } from "styled-components";
import { Root } from "lib/style";

export const Style = styled.div<{
    $gap: number;
    $align?: "start" | "center" | "end" | "stretch";
}>`
    display: flex;
    flex-direction: row;

    ${({ $gap, $align }) => {
        return css`
            align-items: ${$align};
            gap: ${$gap}rem;

            & > & {
                gap: ${$gap / 2}rem;

                & > & {
                    gap: ${$gap / 4}rem;

                    & > & {
                        gap: ${$gap / 8}rem;
                    }
                }
            }
        `;
    }}
`;
