"use client";
import { useEffect, useState } from "react";
import Style, { Part } from "./PartContainer.styled";

export interface PartContainer {
    state?: boolean | null;
    content?: any;
    left?: { children?: any; onClick?: Function };
    right?: { children?: any; onClick?: Function };
    style?: object;
    onBack?: Function;
}

export default function PartContainer(props: PartContainer) {
    const [state, setState] = useState<boolean | null | undefined>(props?.state);

    useEffect(() => {
        return () => {
            setState(null);
        };
    }, []);

    useEffect(() => {
        setState(props?.state);
    }, [props?.state]);

    useEffect(() => {
        switch (state) {
            case true:
                if (typeof props?.right?.onClick === "function") props?.right?.onClick();
                break;
            case false:
                if (typeof props?.left?.onClick === "function") props?.left?.onClick();
                break;
            default:
                if (typeof props?.onBack === "function") props?.onBack();
                break;
        }
    }, [state, props?.left?.onClick, props?.right?.onClick, props?.onBack]);

    return (
        <Style $state={state} style={props?.style}>
            <div
                style={{
                    transform: `translateX(${
                        typeof state === "undefined" || state === null ? "-33.333%" : state ? "-66.666%" : "0"
                    }`,
                }}>
                <Part $state={state === false} style={{}}>
                    {props?.left?.children}
                </Part>
                <Part $state={state === null}>{props?.content}</Part>
                <Part $state={state === true}>{props?.right?.children}</Part>
            </div>
        </Style>
    );
}
