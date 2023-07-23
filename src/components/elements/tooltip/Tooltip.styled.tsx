import { Root } from "lib/style";
import styled from "styled-components";

const Style = styled.div<{ $color: string; $padding: number; }>`
    font-size: 1em;
    position:absolute;
    display:flex;
    flex-direction:column;
    padding: ${({ $padding }) => $padding}em;
    background-color: rgba(${({ $color }) => Root.Color($color)}, var(--o015));
    backdrop-filter: var(--blur);
    transition:.15s ease;
`;

export default Style;