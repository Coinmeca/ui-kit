import { styled, css } from "styled-components";

const Style = styled.div<{ $fix: boolean; $filter: string | undefined }>`
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

    & > * {
        position: ${({ $fix }) => ($fix ? "fixed" : "absolute")};
        min-width: 100%;
        min-height: 100%;
        opacity: 1;
        transition: 0.3s ease;
    }

    & > div {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.45;
        z-index: 0;

        ${({ $filter }) => {
            return (
                $filter &&
                css`
                    background-color: ${$filter};
                `
            );
        }}
    }
`;

export default Style;
