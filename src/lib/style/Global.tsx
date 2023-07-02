import { createGlobalStyle } from "styled-components";

const Style = createGlobalStyle`
    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap");
    @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap");

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
        font-feature-settings: "tnum" on, "lnum" on;
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

    body,
    table,
    ul,
    ol,
    form,
    input,
    button {
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
            -webkit-box-shadow: inset 0 0 0 rgba(var(--black), var(--o045));
        }

        ::-webkit-scrollbar-thumb {
            -webkit-box-shadow: inset 0 0 2rem rgba(var(--white), var(--o045));
        }
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --white: 0, 0, 0;
            --black: 255, 255, 255;
            --dim: 32, 32, 32;
        }

        html {
            color-scheme: dark;
        }

        ::-webkit-scrollbar {
            width: 4px;
        }

        ::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 0 rgba(var(--white), var(--o045));
        }

        ::-webkit-scrollbar-thumb {
            -webkit-box-shadow: inset 0 0 2rem rgba(var(--black), var(--o045));
        }
    }
`;

export default Style;
