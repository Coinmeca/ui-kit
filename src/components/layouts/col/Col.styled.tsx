import { Root } from "lib/style";
import { css, styled } from "styled-components";

const Style = styled.div<{
    $gap: number;
    $fit: boolean;
    $response?: string | undefined;
    $reverse?: boolean;
}>`
    display: flex;
    flex-direction: ${({ $reverse }) => ($reverse ? "column-reverse" : "column")};
    width: ${({ $fit }) => ($fit ? "max-content" : "100%")};

    && > *{
        width:100%;
    }

    ${({ $gap }) => {
        const gap = $gap || 4;
        return gap !== 0 && css`
            gap: ${$gap || 4}rem;

            & > & {
                gap: ${gap / 2}rem;

                & > & {
                    gap: ${gap / 4}rem;

                    & > & {
                        gap: ${gap / 8}rem;

                        & > & {
                            gap: ${gap / 16}rem;

                            & > & {
                                gap: ${gap / 32}rem;
                            }
                        }
                    }
                }
            }
        `;
    }}

    ${({ $response, $reverse }) => {
        switch ($response) {
            case "laptop":
                return css`
                    @media all and(max-width: ${Root.Device.Laptop}px) {
                        flex-direction: ${$reverse ? "row-reverse" : "row"};
                    }
                `;
            case "tablet":
                return css`
                    @media all and(max-width: ${Root.Device.Tablet}px) {
                        flex-direction: ${$reverse ? "row-reverse" : "row"};
                    }
                `;
            case "mobile":
                return css`
                    @media all and(max-width: ${Root.Device.Mobile}px) {
                        flex-direction: ${$reverse ? "row-reverse" : "row"};
                    }
                `;
        }
    }}
`;

export default Style;
