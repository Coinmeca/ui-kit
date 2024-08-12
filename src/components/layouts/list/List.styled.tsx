"use client";
import { styled } from "styled-components";

export const NoData = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const Style = styled.div<{ $fill: boolean }>`
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    ${({ $fill }) => $fill && "height: 100%;"}
    overflow: hidden auto;
    scroll-snap-type: y mandatory;
    -webkit-overflow-scrolling: touch;
`;

export default Style;
