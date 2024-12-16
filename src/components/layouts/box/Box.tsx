"use client";

import Style from "./Box.styled";

export interface Box {
    style?: object;
    children?: any;
    padding?: number | any[];
    change?: string | false;
    fit?: boolean;
}

export default function Box(props: Box) {
    const initial = 4;
    const init = (padding?: number | string): number | undefined => {
        switch (typeof padding) {
            case "string":
                return initial;
            case "number":
                return padding;
            default:
                return undefined;
        }
    };

    const padding =
        typeof props?.padding === "number"
            ? {
                  top: props?.padding,
                  right: props?.padding,
                  bottom: props?.padding,
                  left: props?.padding,
              }
            : {
                  top: (props?.padding && typeof props?.padding[0] !== "string" && props?.padding[0]) || initial,
                  right:
                      (props?.padding && (props?.padding?.length > 1 ? init(props?.padding[1]) : init(props?.padding[0]))) ||
                      initial,
                  bottom:
                      (props?.padding && (props?.padding?.length > 2 ? init(props?.padding[2]) : init(props?.padding[0]))) ||
                      initial,
                  left:
                      (props?.padding &&
                          (props?.padding?.length > 3
                              ? init(props?.padding[3])
                              : props?.padding?.length > 1
                              ? init(props?.padding[1])
                              : init(props?.padding[0]))) ||
                      initial,
              };

    return (
        <Style $change={props?.change || undefined} $padding={padding} $fit={props?.fit} style={props?.style}>
            {props.children}
        </Style>
    );
}
