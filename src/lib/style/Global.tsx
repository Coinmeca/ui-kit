"use client";
import { createGlobalStyle } from "styled-components";
import { Device } from "./Root";

const Global = createGlobalStyle`
    html,body,main{
        height:100%;
        min-height:-webkit-fill-available;
    }

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
            /* font-size: 10px; */
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
    body, table, ul, ol, form, input, button, h1, h2, h3, h4, h5, h6, strong, p, i {
        margin: 0;
        border: 0;
        padding: 0;
        outline: none;
        list-style: none;
    }

    a {
        text-decoration:none;
        cursor:pointer;
        transition:.3s ease;
    }

    :root {
        --unit: 8px;

        --white-abs: 255, 255, 255;
        --black-abs: 0, 0, 0;

        --red: 255, 0, 64;
        --green: 0, 192, 96;
        --orange: 255, 160, 0;
        --blue: 0, 64, 255;
        --sky: 0, 255, 255;
        --purple: 160, 0, 255;
        --rainbow: linear-gradient(90deg, #00C0FF 0%, #FFCF00 49%, #FC4F4F 80%, #00C0FF 100%);

        --o1: 1;
        --o09: 0.9;
        --o075: 0.75;
        --o06: 0.6;
        --o045: 0.45;
        --o03: 0.3;
        --o015: 0.15;
        --o01: 0.1;
        --o0075: 0.075;
        --o006: 0.06;
        --o0045: 0.045;
        --o003: 0.03;
        --o0015: 0.015;
        --o0: 0;

        --blur: blur(4em);
        --change: var(--white);
    }

    [data-direction="row"] {
        flex-direction: row;
    }

    [data-direction="col"] {
        flex-direction: column;
    }

    [data-row="left"] {
        justify-content: flex-start!important;
        text-align: left;
    }

    [data-row="middle"] {
        justify-content: center!important;
        text-align: left;
    }

    [data-row="center"] {
        justify-content: center!important;
        text-align: center;

        & > *{
            margin:auto;
        }
    }

    [data-row="right"] {
        justify-content: flex-end!important;
        text-align: right;
    }

    [data-col="left"] {
        align-items: flex-start!important;
        text-align: left;
    }

    [data-col="middle"] {
        align-items: center!important;
        text-align: left;
    }

    [data-col="center"] {
        align-items: center!important;
        justify-content: center!important;
        text-align: center;

        & > *{
            margin:auto;
        }
    }

    [data-col="right"] {
        align-items: flex-end!important;
        text-align: right;
    }


    @media (prefers-color-scheme: light) {
        :root {
            --white: 255, 255, 255;
            --black: 0, 0, 0;
            --dim: 255, 255, 255;
        }

        ::selection {
            color: white;
            background: black;
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
            --black: 0, 0, 0;
            --dim: 32, 32, 32;
        }

        ::selection {
            color: black;
            background: white;
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

    @media all and (min-width: ${Device.Desktop}px) {
        [data-show="laptop"],
        [data-show="tablet"],
        [data-show="mobile"] {
            display:none!important;
        }
        [data-hide="desktop"] {
            display:none!important;
        }
    }

    @media all and (min-width: ${Device.Laptop + 1}px) and (max-width: ${Device.Desktop - 1}px) {
        [data-show="tablet"],
        [data-show="mobile"] {
            display:none!important;
        }
    }
    @media all and (min-width: ${Device.Tablet + 1}px) and (max-width: ${Device.Laptop}px) {
        [data-show="tablet"],
        [data-show="mobile"] {
            display:none!important;
        }
        [data-hide="laptop"] {
            display:none!important;
        }
    }
    @media all and (min-width: ${Device.Mobile + 1}px) and (max-width: ${Device.Tablet}px) {
        [data-show="mobile"] {
            display:none!important;
        }
        [data-hide="laptop"],
        [data-hide="tablet"] {
            display:none!important;
        }
    }
    @media all and (max-width: ${Device.Mobile}px) {
        [data-hide="laptop"],
        [data-hide="tablet"],
        [data-hide="mobile"] {
            display:none!important;
        }
    }
`;

export default Global;
