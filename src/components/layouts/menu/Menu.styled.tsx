import { Root } from "lib/style";
import { styled } from "styled-components";

export const Row = styled.div<{ $scale: number; $fix?: boolean }>`
    font-size: calc(var(--unit) * ${({ $scale }) => $scale});
    display: flex;
    overflow-x: scroll;
    overflow-style: none;
    ${({ $fix }) => !$fix && "overflow-x: scroll;"}

    &::-webkit-scrollbar {
        display: none;
    }

    &:last-child:not(:only-child) {
        justify-content: "flex-end";
    }
`;

export const Col = styled.div<{ $scale: number }>`
    font-size: calc(var(--unit) * ${({ $scale }) => $scale});
    display: flex;
    min-width: max-content;
`;

export const Style = styled.div<{}>``;

export default Style;
