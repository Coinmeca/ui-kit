"use client";
import { styled } from "styled-components";
import * as SlideContent from "components/layouts/contents/slide/SlideContent.styled";

export const Part = styled.div<{ $state?: boolean | null }>`
    position: ${({ $state }) => ($state ? "relative" : "absolute")};
    display: flex;
    flex-direction: column;
    top: 0;
    height: 100%;
    min-height: 100%;
    min-width: 33.333333333%;
    max-width: 33.333333333%;
    opacity: ${({ $state }) => ($state ? 1 : 0)};
    pointer-events: ${({ $state }) => ($state ? "initial" : "none")};

    &:first-child {
        left: 0;
    }

    &:not(:first-child):not(:last-child) {
        left: 33.333333333%;
    }

    &:last-child {
        left: 66.666666666%;
    }
`;

export const Style = styled.div<{ $state?: boolean | null }>`
    position: relative;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: 100%;

    & > * {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        min-width: 300%;
        max-width: 300%;
        height: 100%;
        max-height: inherit;
        transition: 0.3s ease;
    }
`;

export default Style;
