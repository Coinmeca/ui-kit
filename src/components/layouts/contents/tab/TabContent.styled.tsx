"use client";
import { styled } from "styled-components";

const Style = styled.div<{ $active: boolean; $fix: boolean }>`
    position: ${({ $active }) => ($active ? "relative" : "absolute")};
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    ${({ $fix }) => !$fix && "overflow: hidden auto;"}
    transition: 0.3s ease;
    opacity: ${({ $active }) => ($active ? "1" : "0")};
    pointer-events: ${({ $active }) => ($active ? "inherit" : "none")};
`;

export default Style;
