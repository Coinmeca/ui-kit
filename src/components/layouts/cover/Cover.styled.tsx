import { styled } from "styled-components";

const Style = styled.div<{ $height:number; $fullsize?: boolean }>`
    width: ${({$fullsize, $height}) => $fullsize ? '100vw' : `100%`};
    height: ${({$fullsize, $height}) => $fullsize ? '100vh' : `${$height}px`}
`;

export default Style;
