import { styled } from "styled-components";
import { Root } from "lib/style";

const Style = styled.div`
    font-size:0.6667em;
    padding:0 1em;
    position:relative;
    // -webkit-user-drag: none;
    // -webkit-touch-callout: none;
    // -webkit-user-select: none;
    // -khtml-user-select: none;
    // -moz-user-select: none;
    // -ms-user-select: none;
    // user-select: none;
    
    input[type=range]{
        font-size:1em;
        width:100%;
        height:4em;
        // -webkit-appearance: none;

        &:hover{
            cursor: e-resize;
        }
        &:active{
            cursor: grabbing;
        }

        &:focus {
            outline: none;
        }

        &::-webkit-slider-runnable-track {
            background: rgba(var(--white),);
            height: 1em;
            border-radius: 1em;
        }
    
        // &::-webkit-slider-thumb,
        // &::-moz-range-thumb,
        // &::-ms-thumb {
        //     background:red;
        //     width: 4em;
        //     height: 4em;
        //     -webkit-appearance: none;
        // }
    }

    & > div {
        position:absolute;
        top:0;
        width:100%;
        height:100%;
        pointer-events:none;
        -webkit-user-drag: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        & > div {
            position:absolute;
            height:100%;

            &:first-child{
                width:100%;
            }

            &:last-child{
                width: calc(100% - 4rem);
            }

            & > span {
                position:relative;
                display:flex;
                align-items:center;
                justify-content:center;
                background:rgba(0,0,0,0.45);
                border-radius:4em;
                width: 4em;
                height:4em;
                transform:translateX(-1em);
                
                & > span{
                    color: white;
                    position:absolute;
                    font-size:1.25em;
                    font-feature-settings: initial;
                }
            }
        }
    }
`;

export default Style;