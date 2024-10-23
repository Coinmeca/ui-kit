"use client";
import { css, styled } from "styled-components";
import * as Page from "components/layouts/page/Page.styled";

const Style = styled.div<{ $vertical?: boolean }>`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    /* min-height: max-content; */

    ${({ $vertical }) =>
        $vertical &&
        css`
            flex-direction: column;
            min-height: initial;
        `}/* ${Page.default} > & {
        @media (prefers-color-scheme: light) {
            background: rgb(var(--white));
        }

        @media (prefers-color-scheme: dark) {
            background: rgb(var(--dim));
        }
    } */
`;

export default Style;
