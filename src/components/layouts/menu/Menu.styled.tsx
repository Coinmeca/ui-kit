import { Root } from "lib/style";
import { styled } from "styled-components";

export const Row = styled.div<{ $scale: number; $fix?: boolean }>`
    font-size: calc(var(--unit) * ${({ $scale }) => $scale});
    display: flex;
    width:100%;
    overflow-x: scroll;
    overflow-style: none;
    ${({ $fix }) => !$fix && "overflow-x: scroll;"}

    &::-webkit-scrollbar {
        display: none;
    }

    &:last-child:not(:only-child) {
        max-width:max-content;
        justify-content: flex-end;
    }
`;

const Style = styled.div<{ $scale: number }>`
    font-size: calc(var(--unit) * ${({ $scale }) => $scale});
    display: flex;
    flex-direction:column;
`;

export default Style;