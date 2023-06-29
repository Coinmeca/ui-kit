import { styled } from "styled-components";

const Style = styled.i<{ $color?: string; $scale?: number }>`
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: initial;
    font-size: ${(props) => (props.$scale || 1) * 2.5}em;
    width: 1em;
    height: 1em;
    aspect-ratio: 1/1;

    & svg {
        width: 100%;
        height: 100%;
        fill: ${(props) => props.$color};
        transition: 0.3s ease;
    }
`;

export default Style;
