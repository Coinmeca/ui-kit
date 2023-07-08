"use client";
import { Root } from "lib/style";
import { styled } from "styled-components";

const Style = styled.section<{ $color: string }>`
    background: rgba(${({ $color }) => `${Root.Color($color)}, 0.45`});
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

export default Style;
