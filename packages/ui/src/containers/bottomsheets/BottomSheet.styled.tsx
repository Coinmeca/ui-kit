import { styled } from "styled-components";

const Style = styled.div<{ $scale: number; $active: boolean; $height?: number | string | { min?: number | string; max?: number | string } }>`
    font-size: ${({ $scale }) => $scale}em;
    background: rgba(var(--black), var(--o09));
    position: absolute;
    bottom: 0;
    display: flex;
    width: -webkit-fill-available;
    height: ${({ $height }) => (typeof $height === "number" ? `${$height}em` : $height === "string" && `${$height}`) || "max-content"};
    margin: 0 !important;
    text-align: center;
    pointer-events: ${({ $active }) => ($active ? "initial" : "none")};
    transform: translateY(100%);
    transform: translateY(${({ $active }) => $active && "0"});
    transition: 0.3s ease;

    ${({ $height }) =>
        typeof $height === "object" &&
        `min-height: ${typeof $height?.min === "number" ? `${$height?.min}em` : typeof $height?.min === "string" && `${$height?.min}`}`};
    ${({ $height }) =>
        typeof $height === "object" &&
        `max-height: ${typeof $height?.max === "number" ? `${$height?.max}em` : typeof $height?.max === "string" && `${$height?.max}`}`};

    input {
        color: white;
    }
`;

export default Style;
