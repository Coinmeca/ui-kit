"use client";
import { createGlobalStyle } from "styled-components";
import { Device } from "./Root";

const Global = createGlobalStyle`
    html {
        color-scheme: light;
        background: black;
        color: white;
        font-size: var(--unit);
    }

    html,
    input,
    button,
    textarea {
        font-family: "Montserrat", "sans-serif";
        font-weight: 500;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;

        &[lang="ko"] {
            font-size: 10px;
            &,
            input,
            button,
            textarea {
                font-family: "Montserrat", "Noto Sans KR", "sans-serif";
            }
        }

        &[lang="jp"] {
            font-size: 10px;
            &,
            input,
            button,
            textarea {
                font-family: "Montserrat", "Noto Sans JP", "sans-serif";
            }
        }
    }

    body {
        font-size: 1.5rem;
    }

    body, table, ul, ol, form, input, button, h1, h2, h3, h4, h5, h6, strong, p, i {
        margin: 0;
        border: 0;
        padding: 0;
        outline: none;
        list-style: none;
    }

    :root {
        --unit: 8px;

        --white-abs: 255, 255, 255;
        --black-abs: 0, 0, 0;

        --red: 255, 0, 64;
        --green: 0, 192, 96;
        --orange: 255, 160, 0;
        --blue: 0, 0, 255;
        --sky: 0, 255, 255;
        --purple: 160, 0, 255;

        --o1: 1;
        --o09: 0.9;
        --o075: 0.75;
        --o06: 0.6;
        --o045: 0.45;
        --o03: 0.3;
        --o015: 0.15;
        --o01: 0.1;
        --o0075: 0.075;
        --o005: 0.05;
        --o0: 0;

        --blur: blur(4rem);
    }

    [data-direction="row"] {
        flex-direction: row;
    }

    [data-direction="col"] {
        flex-direction: column;
    }

    [data-row="left"] {
        justify-content: flex-start;
        text-align: left;
    }

    [data-row="center"] {
        justify-content: center;
        text-align: center;

        & > *{
            margin:auto;
        }
    }

    [data-row="right"] {
        justify-content: flex-end;
        text-align: right;
    }

    [data-col="left"] {
        align-items: flex-start;
        text-align: left;
    }

    [data-col="center"] {
        align-items: center;
        text-align: center;

        & > *{
            margin:auto;
        }
    }

    [data-col="right"] {
        align-items: flex-end;
        text-align: right;
    }

    @media (prefers-color-scheme: light) {
        :root {
            --white: 255, 255, 255;
            --black: 0, 0, 0;
            --dim: 255, 255, 255;
        }

        ::-webkit-scrollbar {
            width: 4px;
        }

        ::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 0 rgba(var(--white), var(--o03));
        }

        ::-webkit-scrollbar-thumb {
            -webkit-box-shadow: inset 0 0 2rem rgba(var(--black), var(--o03));
        }
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --white: 255,255,255;
            --black: 0,0,0;
            --dim: 32, 32, 32;
        }

        html {
            color-scheme: dark;
        }

        ::-webkit-scrollbar {
            width: 4px;
        }

        ::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 0 rgba(var(--black), var(--o03));
        }

        ::-webkit-scrollbar-thumb {
            -webkit-box-shadow: inset 0 0 2rem rgba(var(--white), var(--o03));
        }
    }

    @media all and (min-width: ${Device.HD2K}px) {
        :root{
            --unit: 8px;
        }
    }

    @media all and (min-width: ${Device.HD3K}px) {
        :root{
            --unit: 10px;
        }
    }

    @media all and (min-width: ${Device.HD4K}px) {
        :root{
            --unit: 12px;
        }
    }

    @media all and (min-width: ${Device.HD5K}px) {
        :root{
            --unit: 14px;
        }
    }

    @media all and (min-width: ${Device.HD5K}px) {
        :root{
            --unit: 16px;
        }
    }

    @media all and (min-width: ${Device.HD8K}px) {
        :root{
            --unit: 24px;
        }
    }
`;

export default Global;
