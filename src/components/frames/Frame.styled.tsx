"use client";
import { styled } from "styled-components";
import * as Content from "components/layouts/contents/Content.styled";

const Style = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;a
    z-index: 1;

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
            overflow: hidden auto;
            z-index: 3;

            ${Content.default} {
                position: relative;
                width: 100%;
                height: 100%;
            }
        }
    }
`;

export default Style;
