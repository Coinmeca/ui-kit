import { styled, css } from "styled-components";
import { Root } from "lib/style";

export const Filter = styled.div<{ $filter?: string; $opacity: number }>`
    position: absolute;
    top: 0;
    left: 0;
    opacity: ${({ $opacity }) => $opacity};
    z-index: 0;

    ${({ $filter }) =>
        $filter &&
        css`
            background: ${$filter === Root.Color($filter) ? $filter : `rgb(${Root.Color($filter)})`};
        `}
`;

const Style = styled.div<{ $fix: boolean }>`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
    /* z-index: -1; */

    & > * {
        position: ${({ $fix }) => ($fix ? "fixed" : "absolute")};
        min-width: 100%;
        min-height: 100%;
        object-fit: cover;
        /* opacity: 1; */
        transition: 0.3s ease;
    }

    & ~ * {
        z-index: 1;
    }
`;

export default Style;
