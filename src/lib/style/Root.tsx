"use client";
import { css } from "styled-components";

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
            if (color.indexOf("#") === 1) return `${parseInt(color.slice(0, 1))}, ${parseInt(color.slice(2, 3))}, ${parseInt(color.slice(4, 5))}`;
            return color;
    }
};
