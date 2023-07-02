"use client";
import { css } from "styled-components";

export const Device = {
    Mobile: 640,
    Tablet: 960,
    Laptop: 1280,
    Desktop: 1920,
};

export const Blur = css<{ $scale?: number }>`
    backdrop-filter: blur(${(props) => props.$scale || 1}rem);
`;

export const Color = (color: string) => {
    switch (color) {
        case "white":
            return "var(--white)";
        case "black":
            return "var(--black)";
        case "red":
            return "var(--red)";
        case "green":
            return "var(--green)";
        case "orange":
            return "var(--orange)";
        case "blue":
            return "var(--blue)";
        case "purple":
            return "var(--purple)";
        case "sky":
            return "var(--sky)";
        default:
            return color;
    }
};
