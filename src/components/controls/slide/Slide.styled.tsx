import { css, styled } from "styled-components";

export const Style = styled.div<{ $scale: number; $timer: number; $padding: number; $nav: "top" | "bottom" | undefined }>`
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

                & > *:last-child {
                    transition: 0.3s 0.15s ease;
                    opacity: 0;
                }

                &[data-active="false"] {
                    opacity: 0;
                    transform: translateX(-15%);
                    pointer-events: none;

                    & > *:last-child {
                        transform: translateX(-15%);
                    }
                }

                &[data-active="true"] ~ * {
                    transform: translateX(15%);

                    & > *:last-child {
                        transform: translateX(15%);
                    }
                }

                &[data-active="true"] {
                    transform: translateX(0);
                    pointer-events: initial;
                    opacity: 1;

                    & > *:last-child {
                        transform: translateX(0%);
                        opacity: 1;
                    }
                }
            }
        }

        ${({ $nav, $timer, $padding }) =>
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
                        background: rgba(var(--white), var(--o045));
                        display: inline-block;
                        width: 0.5em;
                        height: 0.5em;
                        vertical-align: top;
                        cursor: pointer;
                        transition: 0.3s ease;

                        & ~ & {
                            margin-left: 1em;
                        }

                        &[data-active="true"] {
                            width: 8em;
                            background-image: linear-gradient(rgb(var(--white)), rgb(var(--white)));
                            background-size:100% 100%;
                            background-position:left;
                            background-repeat:no-repeat;
                            animation: slide both 1 ${$timer / 1000}s ease;
                        }
                    }
                }
            `}
    }

    @keyframes slide{
        0% {background-size: 0% 100%;}
        100% {background-size: 100% 100%;}
    }
`;
