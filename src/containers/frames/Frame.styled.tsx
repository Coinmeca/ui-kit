"use client";

import * as Page from "components/layouts/page/Page.styled";
import { styled } from "styled-components";

const Style = styled.section<{ $direction?: "left" | "right" }>`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100%;
    overflow: hidden;
    z-index: 1;

    ${({ $direction }) => $direction === "left" && `direction: rtl;`}

    & > section {
        position: relative;
        background: rgba(var(--black-abs), var(--o045));
        display: flex;
        width: 100%;
        height: 100%;
        overflow: hidden;

        & > main {
            position: relative;
            width: 100%;
            height: 100%;
            z-index: 3;
            overflow: hidden;

            ${Page.default} {
                position: relative;
                width: 100%;
                height: 100%;
            }
        }
    }
`;

export default Style;
