"use client";

import { styled } from "styled-components";
import * as Page from "components/layouts/page/Page.styled";

const Style = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100%;
    overflow: hidden;
    z-index: 1;

    & > section {
        position: relative;
        background: rgba(var(--black-abs), var(--o045));
        display: flex;
        width: 100%;
        height: 100%;
        overflow: hidden;

        & > slot {
            position: relative;
            width: 100%;
            height: 100%;
            z-index: 3;

            ${Page.default} {
                position: relative;
                width: 100%;
                height: 100%;
            }
        }
    }
`;

export default Style;
