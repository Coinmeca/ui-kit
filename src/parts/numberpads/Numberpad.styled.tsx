import { styled } from "styled-components";

export const Pad = styled.div`
    display: flex;
    flex-direction: column;
    height: -webkit-fill-available;
    flex: 3;
`;

const Style = styled.div<{ $scale: number; $width?: number; $padding: number; $reverse?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({ $padding }) => $padding}em;
    width: -webkit-fill-available;
    height: -webkit-fill-available;

    & > * {
        display: flex;
        flex-direction: row;
        width: -webkit-fill-available;
        height: -webkit-fill-available;
        ${({ $width }) => $width && `max-width: ${$width}em;`}

        & > * {
            flex: 1;
            ${({ $reverse }) => $reverse && "flex-direction: column-reverse;"}

            &${Pad} {
                flex: 3;
            }

            & > * {
                flex: 1;
                height: -webkit-fill-available;
            }

            & > *,
            &${Pad}, > * > * {
                font-size: calc(var(--unit) * ${({ $scale }) => $scale});
            }
        }
    }
`;

export default Style;