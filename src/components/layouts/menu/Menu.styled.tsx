import { Root } from "lib/style";
import { styled } from "styled-components";

export const Item = styled.div<{ $direction: string; $align: string }>`


    @media all and (max-width: ${Root.Device.Tablet}px) {
        &[data-device="tablet"] {
            ${({$direction}) => $direction === "row" ? "flex-direction: column" : $direction === "col" && "flex-direction:column"};
        }
    }

    @media all and (max-width: ${Root.Device.Laptop}px) {
        &[data-device="laptop"] {
        }
    }

    @media all and (max-width: ${Root.Device.Mobile}px) {
        &[data-device="mobile"] {
        }
    }
`;

export const Style = styled.div<{}>``;

export default Style;
