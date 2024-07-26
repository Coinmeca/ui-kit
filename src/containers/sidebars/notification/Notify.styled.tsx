"use client";

import { css, styled } from "styled-components";
import * as Button from "components/controls/button/Button.styled";
import * as Box from "components/layouts/box/Box.styled";
import * as Col from "components/layouts/col/Col.styled";
import * as Row from "components/layouts/row/Row.styled";

export const Content = styled.span`
    &,
    & > * {
        line-height: 2em;
    }

    & > * {
        display: inline-block;
    }
`;

export const Style = styled.div<{ $active: boolean; $direction: "left" | "right"; $close: boolean; $order?: number }>`
    min-height: max-content;
    max-height: 0;
    scroll-snap-align: start;
    transition: 0.3s ease;
    ${({ $order }) => typeof $order === "number" && `order: ${$order};`}

    &:last-child {
        scroll-snap-align: end;
    }

    ${Box.default} {
        --white: var(--white-abs);
        --black: var(--white-abs);
        background: rgba(var(--black-abs), var(--o09));
        background-image: linear-gradient(rgba(var(--white-abs), var(--o015)), rgba(var(--white-abs), var(--o015)));
        /* -webkit-backdrop-filter: blur(calc(var(--unit) / 8)); */
        /* backdrop-filter: blur(calc(var(--unit) / 8)); */
        width: auto;
        transition: 0.3s ease;
        padding: 1.25em 0 1.5em;

        & > ${Col.default} {
            & > *:not(img) {
                width: calc(100% - 4em);
                padding: 0 2em;
            }

            & ${Row.default} {
                align-items: center;
            }

            & > ${Row.default} > ${Row.default} {
                & > strong {
                    opacity: 0.45;
                }

                & > ${Button.default}:last-child {
                    margin-right: -1em;
                }
            }
        }
    }

    ${({ $active }) =>
        $active
            ? css`
                  max-height: 100vh;

                  ${Box.default} {
                      opacity: 1;
                  }
              `
            : css`
                  transform: scale(0.96);
                  pointer-events: none;

                  ${Box.default} {
                      transform: translateY(-100%);
                      opacity: 0;
                  }
              `}
    ${({ $close, $direction }) =>
        $close &&
        css`
            transform: scale(0.96);
            max-height: 0;
            opacity: 0;
            pointer-events: none;

            ${Box.default} {
                transform: translateX(${$direction === "right" ? "100" : "-100"}%);
                opacity: 0;
            }
        `}
`;

export default Style;
