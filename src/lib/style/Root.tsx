"use client";
import { css } from "styled-components";

export const Device = {
    Small: 360,
    Middle: 480,
    Mobile: 640,
    Tablet: 960,
    Laptop: 1280,
    Desktop: 1920,
    HD2K: 2560,
    HD3K: 3072,
    HD4K: 3840,
    HD5K: 5120,
    HD6K: 6144,
    HD8K: 7680,
};

export const Blur = css<{ $scale?: number }>`
    -webkit-backdrop-filter: blur(${({ $scale }) => $scale || 1}rem);
    backdrop-filter: blur(${({ $scale }) => $scale || 1}rem);
`;

export const Color = (color: string) => {
    switch (color) {
        case "white":
            return "var(--white)";
        case "black":
            return "var(--black)";
        case "dim":
            return "var(--dim)";
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
        case "rainbow":
            return "var(--rainbow)";
        case "color":
            return "var(--color)";
        default:
            return color;
    }
};
