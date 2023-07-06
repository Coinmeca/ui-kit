import { styled } from "styled-components";

const Style = styled.div<{$scale: number, $size: number}>`
    font-size: calc(var(--unit) * ${({ $scale }) => $scale});
    display:flex;
    align-items:center;
    gap: 1em;

    & > *{
        font-size:1.5em;
    }

    & > div{
        position: relative;
        display:flex;
        align-items: center;
        justify-content:center;
        width: ${({ $size }) => $size}em;
        height: ${({ $size }) => $size}em;
        border-radius: ${({ $size }) => $size}em;
        aspect-ratio: 1 / 1;
        overflow:hidden;

        & > span{
            font-size:1.5em;
        }

        & > img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 1;
        }
    }

    & > span{
        font-size:1.5em;
        font-weight:bold;
    }
`

export default Style;