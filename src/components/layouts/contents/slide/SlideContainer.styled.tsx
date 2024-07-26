"use client";
import { styled } from "styled-components";
import * as Page from "components/layouts/page/Page.styled";

const Style = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: max-content;

    /* ${Page.default} > & {
        @media (prefers-color-scheme: light) {
            background: rgb(var(--white));
        }

        @media (prefers-color-scheme: dark) {
            background: rgb(var(--dim));
        }
    } */
`;

export default Style;
