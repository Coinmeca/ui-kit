import { styled } from "styled-components";

const Style = styled.div<{ $scale: number; $active: boolean; $height?: number | { min?: number; max?: number } }>`
    font-size: calc(var(--unit) * ${({ $scale }) => $scale});
    background: rgba(var(--black), var(--o09));
    position: absolute;
    bottom: 0;
    display: flex;
    width: -webkit-fill-available;
    height: ${({ $height }) => (typeof $height === "number" && `${$height}em`) || "max-content"};
    margin: 0 !important;
    text-align: center;
    transform: translateY(${({ $active }) => ($active ? "100%" : "0")});

    ${({ $height }) => typeof $height === "object" && typeof $height?.min === "number" && `min-height: ${$height?.min}em`};
    ${({ $height }) => typeof $height === "object" && typeof $height?.max === "number" && `max-height: ${$height?.max}em`};
`;

export default Style;
