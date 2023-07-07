import { styled } from "styled-components";

const Style = styled.div<{ $height: number; $fullsize?: boolean }>`
    width: 100%;
    height: ${({ $fullsize, $height }) => ($fullsize ? "100vh" : `${$height}px`)};
`;

export default Style;
