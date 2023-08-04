"use client";
import { styled } from "styled-components";
import * as InnerContent from "components/layouts/contents/inner/InnerContent.styled";

const Style = styled.div<{ $width: number; $height: number }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    & > * {
        width: 100%;
    }

    & > ${InnerContent.default} {
        align-items: center;
        justify-content: center;
        padding: 3em 0;

        & > img {
            width: ${({ $width }) => $width}em;
            height: ${({ $height }) => $height}em;
        }

        & > * ~ * {
            margin-top: 2em;
        }
    }
`;

export default Style;
