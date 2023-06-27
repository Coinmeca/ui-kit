import { css, styled } from "styled-components";

export const Style = styled.div<{ $active:boolean; $disabled: boolean }>`
    display:flex;
    align-items:center;
    justify-content:center;
    width: 100%;
    gap: 0.5em;
    padding: 0.5em;
    cursor: pointer;
    user-select: none;
    -webkit-user-drag: none;
    transition: 0.3s ease;

    color: rgba(var(--white), var(--o045));
    & i svg{
        fill: rgba(var(--white), var(--o045));
    }

    & span {
        font-size: 1em;
    }
        
    & i {
        font-size:1em;
    }

    &:hover {
        color:rgba(var(--white), var(--o1));
        & i svg{
            fill:rgba(var(--white), var(--o1));
        }
    }

    &:active{
        background:rgba(var(--white), var(--o015));
    }

    ${({$disabled}) => {
        return (
            $disabled &&
            css`
                opacity: 0.15;
                cursor: initial;
                pointer-events: none !important;
            `
        );
    }}
    
`