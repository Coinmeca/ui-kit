import { styled } from "styled-components";
import * as InnerContent from "components/layouts/contents/Inner/InnerContent.styled";

const Style = styled.section`
    width: calc(100% - 6em);
    height: calc(100% - 6em);
    padding: 3em;

    ${InnerContent.default} {
        gap: 2em;
    }
`;

export default Style;
