import { styled } from "styled-components";

const Style = styled.section<{ $sidebar: boolean; $width: number }>`
    position:relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index:1;

    & > section {
        background: rgba(var(--black-abs), var(--o045));
        display: flex;
        width: 100%;
        height: 100%;

        & > main {
            width: 100%;
            overflow: hidden auto;
        }

        & > aside {
            z-index;
            min-width: ${({ $width }) => $width}px;

            @media all and (max-width: 1919px) {
                
            }
        }
    }
`;

export default Style;
