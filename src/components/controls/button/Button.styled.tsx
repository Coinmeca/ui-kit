import { styled, css } from "styled-components";
import { Root } from "lib/style";

export const Style = styled.button<{
    $type: "glass" | "line" | "solid" | undefined;
    $color: string;
    $scale: number;
    $fit?: boolean;
    $disabled?: boolean;
}>`
    ${({ $color }) => {
        return css`
            --theme: ${Root.Color($color)};
        `;
    }};

    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ $fit }) => ($fit ? "max-content" : "100%")};
    min-width: max-content;
    min-height: 4rem;
    gap: 0.5em;
    padding-left: 1rem;
    padding-right: 1rem;
    cursor: pointer;
    user-select: none;
    -webkit-user-drag: none;
    transition: 0.3s ease;

    & > i:only-child {
        margin-left: -0.25rem;
        margin-right: -0.25rem;
    }

    & span {
        font-size: 1.5rem;
        transition: none;
    }

    ${({ $type, $color }) => {
        switch ($type) {
            case "glass":
                const glass = $color === "black" ? "var(--white)" : "var(--theme)";
                return css`
                    background: rgba(${glass}, var(--o015));
                    color: rgb(${glass});
                    & i svg {
                        fill: rgb(${glass});
                    }
                    &:hover {
                        background: rgba(${glass}, var(--o03));
                    }
                    &:active {
                        background: rgba(${glass}, var(--o06));
                    }
                `;
            case "line":
                const line = $color === "white" ? "var(--white)" : "var(--black)";
                return css`
                    background: transparent;
                    border: 1px solid rgb(var(--theme));
                    color: rgb(var(--theme));
                    & i svg {
                        fill: rgb(var(--theme));
                    }
                    &:hover {
                        background: rgba(var(--theme), var(--o1));
                        color: rgb(${line});
                        & i svg {
                            fill: rgb(${line});
                        }
                    }
                    &:active {
                        background: rgba(var(--theme), var(--o06));
                        border: 1px solid rgba(var(--theme), var(--o06));
                    }
                    .box &:active {
                        color: rgb(var(--dim));
                    }
                `;
            case "solid":
                const solid = $color === "black" ? "var(--white)" : "var(--black)";
                return css`
                    background: rgb(var(--theme), var(--o1));
                    color: rgba(${solid});
                    & i svg {
                        fill: rgb(${solid});
                    }

                    &:hover {
                        background: rgba(var(--theme), var(--o075));
                    }
                    &:active {
                        background: rgba(var(--theme), var(--o045));
                    }
                `;
            default:
                return css`
                    background: transparent;
                    color: rgba(var(--theme), var(--o045));
                    & i svg {
                        fill: rgba(var(--theme), var(--o045));
                    }
                    &:hover {
                        color: rgba(var(--theme), var(--o1));
                        & i svg {
                            fill: rgba(var(--theme), var(--o1));
                        }
                    }
                    &:active {
                        background: rgba(var(--theme), var(--o015));
                    }
                `;
        }
    }}

    ${({ $disabled }) => {
        return (
            $disabled &&
            css`
                opacity: 0.15;
                cursor: initial;
                pointer-events: none !important;
            `
        );
    }}
`;
