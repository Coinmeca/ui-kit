import { styled } from "styled-components";

export const Pad = styled.div`
    display: flex;
    flex-direction: column;
    height: -webkit-fill-available;
    flex: 3;
`;

const Style = styled.div<{ $scale: number; $width?: number | { min?: number; max?: number }; $padding: number; $reverse?: boolean }>`
    display: flex;
    padding: ${({ $padding }) => $padding}em;
    height: -webkit-fill-available;

    width: ${({ $width }) => (typeof $width === "number" && $width ? `${$width}em;` : "-webkit-fill-available")};
    ${({ $width }) => typeof $width === "object" && $width?.min && `min-width: ${$width?.min}em;`}
    ${({ $width }) => typeof $width === "object" && $width?.max && `min-width: ${$width?.max}em;`}

    & > * {
        flex: 1;

        &${Pad} {
            flex: 3;
        }

        & > * {
            flex: 1;
            height: -webkit-fill-available;
            ${({ $reverse }) => $reverse && "flex-direction: column-reverse;"}
        }

        & > *,
        &${Pad}, > * > * {
            font-size: calc(var(--unit) * ${({ $scale }) => $scale});
        }
    }
`;

export default Style;
