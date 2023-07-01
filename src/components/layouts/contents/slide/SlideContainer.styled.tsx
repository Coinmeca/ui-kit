import { styled } from "styled-components";
import * as Content from "./SlideContent.styled";

const Style = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    max-height: max-content;

    & > ${Content.default.defaultProps?.$active?.valueOf(true)} {
        transform: translateX(-15%);
    }
`;

export default Style;
