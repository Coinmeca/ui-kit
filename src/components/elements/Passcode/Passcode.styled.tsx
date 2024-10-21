"use client";
import { Root } from "lib/style";
import styled, { css } from "styled-components";

export const Dot = styled.div<{ $active?: boolean; $size: number; $stroke: number | string; }>`
    font-size: ${({ $size }) => $size}em;
    width:1em;
    height:1em;
    border: ${({ $stroke }) => typeof $stroke === 'number' ? `${$stroke}em` : $stroke} solid rgb(var(--theme));
    border-radius: ${({ $size }) => $size}em;
    transition:.3s ease;

    ${({$active})=> $active && css`
        background-color: rgb(var(--theme));
    `}
`

const Style = styled.div<{ $scale: number; $gap: number | string, $color: string; $error?: boolean }>`
    ${({ $color, $error }) => {
        return css`
            --theme: ${$error ? 'var(--red)' : $color === "white" ? "var(--black)" : $color === "black" ? "var(--white)" : $color === Root.Color($color) ? $color : Root.Color($color)};
        `;
    }};

    ${({ $error }) => $error && css`animation: shake-horizon 1 .6s ease;`}

    font-size: ${({ $scale }) => $scale}em;
    display:flex;
    align-items: center;
    justify-content: center;
    gap: ${({ $gap }) => typeof $gap === 'number' ? `${$gap || 2}em` : $gap};
    transition:.3s ease;

    @keyframes shake-horizon{
        0% { transform:translateX(-7.5%) }
        6.25% { transform:translateX(7.5%) }
        12.5% { transform:translateX(-3.75%) }
        18.75% { transform:translateX(3.75%) }
        25% { transform:translateX(-1.875%) }
        31.25% { transform:translateX(1.875%) }
        37.5% { transform:translateX(-0.9375%) }
        43.75% { transform:translateX(0.9375%) }
        50% { transform:translateX(-0.46875%) }
        56.25% { transform:translateX(0.46875%) }
        62.5% { transform:translateX(-0.234375%) }
        68.75% { transform:translateX(0.234375%) }
        75% { transform:translateX(-0.1171875%) }
        81.25% { transform:translateX(0.1171875%) }
        87.5% { transform:translateX(-0.05859375%) }
        93.75% { transform:translateX(0.05859375%) }
        100% { transform:translateX(0%) }
    }
`;

export default Style;