import { css, styled } from "styled-components";
import * as Box from "components/layouts/box/Box.styled";
import * as Row from "components/layouts/row/Row.styled";
import * as Col from "components/layouts/col/Col.styled";
import * as Button from "components/controls/button/Button.styled";

export const Content = styled.span`
    &,
    & > * {
        line-height: 2em;
    }

    & > * {
        display: inline-block;
    }
`;

export const Style = styled.div<{ $active: boolean; $close: boolean }>`
    min-height: max-content;
    max-height: 0;
    scroll-snap-align: start;
    transition: 0.3s ease;

    &:last-child {
        scroll-snap-align: end;
    }

    ${Box.default} {
        background: rgba(var(--black-abs), var(--o09));
        background-image: linear-gradient(rgba(var(--white-abs), var(--o015)), rgba(var(--white-abs), var(--o015)));
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
    ${({ $close }) =>
        $close &&
        css`
            transform: scale(0.96);
            max-height: 0;
            opacity: 0;
            pointer-events: none;

            ${Box.default} {
                transform: translateX(100%);
                opacity: 0;
            }
        `}
`;

export default Style;
