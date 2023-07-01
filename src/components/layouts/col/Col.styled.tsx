import { styled } from "styled-components";

const Style = styled.div<{
    $gap: number;
    $align: "start" | "center" | "end" | "stretch";
}>`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 4rem;

    & > & {
        gap: ${({ $gap }) => $gap / 2}rem;

        & > & {
            gap: ${({ $gap }) => $gap / 4}rem;

            & > & {
                gap: ${({ $gap }) => $gap / 8}rem;
            }
        }
    }
`;

export default Style;
