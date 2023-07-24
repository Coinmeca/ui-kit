"use client";
import { useEffect, useState } from "react";
import Style, { Part } from "./PartContainer.styled";

export interface PartContainer {
    state?: boolean | null;
    children?: any;
    left?: { children?: any; onClick?: Function };
    right?: { children?: any; onClick?: Function };
    style?: object;
    onBack?: Function;
}

export default function PartContainer(props: PartContainer) {
    const [state, setState] = useState<boolean | null>(props?.state || null);

    useEffect(() => {
        return () => {
            setState(null);
        };
    }, []);

    useEffect(() => {
        if (typeof props?.state !== "undefined") setState(props?.state);
    }, [props?.state]);

    useEffect(() => {
        console.log(props?.state);
        switch (state) {
            case null:
                console.log(2, props?.state);
                if (typeof props?.onBack === "function") props?.onBack();
                break;
            case false:
                console.log(1, props?.state);
                if (typeof props?.left?.onClick === "function") props?.left?.onClick();
                break;
            case true:
                console.log(3, props?.state);
                if (typeof props?.right?.onClick === "function") props?.right?.onClick();
                break;
        }
    }, [state]);

    return (
        <Style $state={state} style={props?.style}>
            <div>
                <Part $state={state}>{props?.left?.children}</Part>
                <Part $state={state}>{props?.children}</Part>
                <Part $state={state}>{props?.right?.children}</Part>
            </div>
        </Style>
    );
}
