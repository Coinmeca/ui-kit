import { css, styled } from "styled-components";
import * as BottomSheet from "containers/bottomsheets/BottomSheet.styled";

export const Item = styled.li`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;

    // min-width: max-content;

    gap: 1em;
    padding: 1em;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s ease;

    & > span {
        font-size: 1.5em;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    & > img {
        width: 2.5em;
        height: 2.5em;
        vertical-align: middle;
        border-radius: 2em;
        margin-top: -0.25em;
        margin-bottom: -0.25em;
    }

    & i {
        font-size: 2.5em;
        svg {
            fill: rgba(var(--white), var(--o045));
        }
    }

    &:hover,
    &:active {
        background: rgba(var(--white), var(--o015));
        color: rgba(var(--white), var(--o1));
        & i svg {
            fill: rgba(var(--white), var(--o1));
        }
    }

    &[data-disabled="true"] {
        opacity: 0.15;
        cursor: initial;
        pointer-events: none;
    }

    ${BottomSheet.default} & {
        padding: 1.5em;
        width: initial;
    }
`;

export const Option = styled.ul<{
    $chevron: boolean;
    $type?: string;
}>`
    height: 100%;
    max-height: 100%;

    & > ${Item} {
        height: 100%;
        max-height: 100%;
        overflow: hidden;

        &:hover {
            background: none;
        }

        & > *:last-child:not(span) {
            ${({ $type }) =>
                !$type &&
                css`
                    position: absolute;
                    right: 0.25em;
                `}
            transition: 0.3s ease;
        }

        ${({ $chevron }) => css`
            width: calc(100% - ${$chevron ? "5em" : "2em"});
            padding-right: ${$chevron ? "4em" : "1em"};
        `}
    }
    [data-active="true"] > & > ${Item} {
        &,
        &:hover,
        &:active {
            background: transparent;
            color: rgba(var(--white), var(--o03));
            & i svg {
                fill: rgba(var(--white), var(--o03));
            }
        }
        & > *:last-child:not(span) {
            ${({ $type }) =>
                !$type &&
                css`
                    transform: rotate(180deg);
                `}
        }
    }
`;

export const Options = styled.ul<{
    $chevron: boolean;
}>`
    height: auto;
    overflow: hidden scroll;
    transition: 0.3s ease;
    z-index: 10;

    & > ${Item} {
        ${({ $chevron }) => css`
            width: calc(100% - ${$chevron ? "5em" : "2em"});
            padding-right: ${$chevron ? "4em" : "1em"};
        `}
    }

    & i svg {
        fill: rgba(var(--white), var(--o045));
    }

    & ::-webkit-scrollbar {
        width: 0.5em;
    }

    & ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 0 rgba(var(--black), var(--o045));
    }

    & ::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 0.2em rgba(var(--white), var(--o045));
    }

    [data-active="true"] > & {
        background: rgba(var(--white), var(--o015));
    }
`;

const Style = styled.div<{
    $open: boolean;
    $height: number;
    $fit: boolean;
    $scale: number;
    $disabled: boolean;
    $type?: string;
}>`
    font-size: ${({ $scale }) => $scale}em;
    background: transparent;
    color: rgba(var(--white), var(--o045));
    ${({ $fit }) => $fit && "max-width: max-content"};
    height: 4em;
    flex-direction: column;
    transition: 0.3s ease;
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: 0.3s ease;
    -webkit-backdrop-filter: var(--blur);
    backdrop-filter: var(--blur);

    & > ${Option}, & > ${Options} {
        position: relative;
        display: flex;
        flex-direction: column;
    }

    & > ${Options} {
        max-height: 0;
        background: rgba(var(--white), var(--o0075));
    }

    ${({ $type }) =>
        $type &&
        css`
            & > ${Option} > ${Item} {
                width: auto;
                padding-left: 0;
                padding-right: 0;
            }
        `}

    &[data-active="true"] {
        background: rgba(var(--white), var(--o0075));

        ${Options} {
            ${({ $height }) => $height && `max-height: ${$height}em;`}
        }
    }

    ${({ $disabled }) =>
        $disabled &&
        css`
            opacity: 0.15;
            cursor: initial;
            pointer-events: none !important;
        `}
`;

export default Style;
