import { styled } from "styled-components";

export const Style = styled.div<{$scale:number}>`

    font-size: ${({ $scale }) => $scale * 0.6667}em;
    display:flex;
    flex-direction: column;
    min-height: 4em;
    transition:.3s ease;

    background: rgba(var(--white), var(--o0075));

    &:hover {
        background: rgba(var(--white), var(--o015));
    }
    &:active {
        background: rgba(var(--white), var(--o01));
    }

    & > div{
        display:flex;
        align-items:center;
        width:calc(100% - 2em);
        height:auto;
        padding:1em;
        gap: 1em;

        input {
            font-size:1.5em;
            background: transparent;
            display:flex;
            width:100%;
            height:100%;
            outline:none;
            
            &::placeholder{
                font-weight:normal;
                color:inherit;
                opacity:0.3;
            }
        }
    }
    
`