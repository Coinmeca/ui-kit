import { css, styled } from "styled-components";

export const Style = styled.div<{ $scale: number; $padding: number; $nav: "top" | "bottom" | undefined }>`
    font-size: calc(var(--unit) * ${({ $scale }) => $scale});
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;

    & > * {
        &:first-child {
            & > * {
                font-size: 1.5em;
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                width: calc(100% - (${({ $padding }) => `${$padding}em`} * 2));
                height: calc(100% - (${({ $padding }) => `${$padding}em`} * 2));
                padding: ${({ $padding }) => `${$padding}em`};
                transition: 0.3s ease;
                overflow: hidden;

                & > *:last-child > * {
                    transition: 0.3s 0.15s ease;
                    opacity: 0;
                }

                &[data-active="false"] {
                    opacity: 0;
                    transform: translateX(-15%);
                    pointer-events: none;

                    & > *:last-child > * {
                        transform: translateX(-15%);
                    }
                }

                &[data-active="true"] ~ * {
                    transform: translateX(15%);

                    & > *:last-child > * {
                        transform: translateX(15%);
                    }
                }

                &[data-active="true"] {
                    transform: translateX(0);
                    pointer-events: initial;
                    opacity: 1;

                    & > *:last-child > * {
                        transform: translateX(0%);
                        opacity: 1;
                    }
                }
            }
        }

        ${({ $nav, $padding }) =>
            $nav &&
            css`
                &:last-child:not(:only-child) {
                    position: absolute;
                    display: flex;
                    height: auto;
                    ${$nav}: 0;
                    padding: ${$padding}em;
                    gap: 1em;
                    text-align: center;

                    & > * {
                        background: white;
                        display: inline-block;
                        width: 0.5em;
                        height: 0.5em;
                        vertical-align: top;
                        opacity: 0.45;
                        cursor: pointer;
                        transition: 0.3s ease;

                        & ~ & {
                            margin-left: 1em;
                        }

                        &[data-active="true"] {
                            width: 8em;
                            opacity: 1;
                        }
                    }
                }
            `}
    }
`;
