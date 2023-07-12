"use client";
import { styled } from "styled-components";

const Style = styled.div<{ $scroll: boolean }>`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden ${({ $scroll }) => $scroll && "auto"};
`;

export default Style;
