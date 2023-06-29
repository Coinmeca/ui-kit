import { css, styled } from "styled-components";

const Style = styled.section<{ $sidebar: boolean; $width: number }>`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: 1;

    & > section {
        background: rgba(var(--black-abs), var(--o045));
        display: flex;
        width: 100%;
        height: 100%;

        & > main {
            z-index: 2;
            width: 100%;
            overflow: hidden auto;
        }

        & > aside {
            z-index: 10;
            ${({ $width, $sidebar }) =>
                $sidebar &&
                css`
                    min-width: ${$sidebar ? $width : 0}px;
                `};
            transition: 0.3s ease;
        }
    }

    @media all and (max-width: 1919px) {
        & > section {
            & > aside {
                z-index: 1;
                min-width: 0;
                max-width: 0;
            }
        }
    }
`;

export default Style;
