"use client";
import { Root } from "lib/style";
import { styled } from "styled-components";

const Style = styled.section<{
    $active: boolean;
    $color?: string;
    $fix?: boolean;
}>`
    ${({ $color }) => $color && `background: rgba(${Root.Color($color)}, var(--o06));`}
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    pointer-events: ${({ $active }) => ($active ? "inherit" : "none")};
    transition: 0.3s ease;

    ${({ $fix }) => $fix && "position: fixed;"}
`;

export default Style;
