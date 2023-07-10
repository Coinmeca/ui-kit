import { css, styled } from "styled-components";
import * as Box from "components/layouts/box/Box.styled";
import * as Row from "components/layouts/row/Row.styled";
import * as Col from "components/layouts/col/Col.styled";
import * as Button from "components/controls/button/Button.styled";

const Style = styled.div<{ $active: boolean }>`
    max-height: 100%;
    transition: 0.3s ease;

    ${Box.default} {
        background: rgba(var(--white), 0.1);
        backdrop-filter: blur(calc(var(--unit) * 8));
        width: auto;
        transition: 0.3s ease;
        padding: 1em 0 2em;

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
        !$active &&
        css`
            max-height: 0;
            ${Box.default} {
                transform: translateX(100%);
            }
        `}
`;

export default Style;
