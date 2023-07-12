"use client";
import { styled } from "styled-components";

const Style = styled.div<{ $active?: boolean }>`
    transition: 0.3s ease;
    ${({ $active }) => $active === false && "transform: translateX(-100%);"}
`;

export default Style;
