import { styled } from "styled-components";
import * as Divider from "components/layouts/divider/Divider.styled";
import * as Input from "components/controls/input/Input.styled";
import * as ListItem from "components/layouts/list/ListItem.style";
import * as TableItem from "components/layouts/table/TableItem.styled";


const Upper = styled.section`
`

const Lower = styled.section`
`

const Style = styled.aside`
    position: relative;
    display:flex;
    height:100%;

    & > * {
        position: relative;
        display:flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: rgba(var(--black), var(--o045));
        overflow:hidden;

        & > *{
            position: relative;
            display:flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
        }
    }

    & > ${Upper} {
    
    }

    & > ${Lower} {

    }

    & ${Divider.default} {
        background: white;
    }

    & ${Input.default} {
        padding: 1em 2em;
    }

    & ${ListItem.default} {
        padding-left: 2em;
        padding-right: 2em;
    }

    & ${TableItem.default} > * {
        &:first-child{
            padding-left: 2em;
        }

        &:last-child{
            padding-right: 2em;
        }
    }
`

export default Style;