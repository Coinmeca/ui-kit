"use client";
import { styled } from "styled-components";

const Style = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    opacity: 0;
    overflow: hidden;
    transition: 0.3s ease;
    z-index: 999999;

    &:hover {
        opacity: 1;
    }
`;

export default Style;
