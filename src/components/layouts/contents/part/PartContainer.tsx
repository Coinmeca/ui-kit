"use client";
import { Layouts } from "components";
import { useEffect, useState } from "react";
import Style, { Part } from "./PartContainer.styled";

export interface PartContainer {
    state?: boolean | null;
    content?: any;
    left?: { children?: any; onClick?: Function };
    right?: { children?: any; onClick?: Function };
    style?: object;
    onBack?: Function;
    loading?: boolean;
}

export default function PartContainer(props: PartContainer) {
    const [state, setState] = useState<boolean | null | undefined>(typeof props?.state !== "undefined" ? props?.state : null);

    useEffect(() => {
        return () => {
            setState(undefined);
        };
    }, []);

    useEffect(() => {
        console.log("process", props?.state);
        if (typeof props?.state !== "undefined") setState(props?.state);
    }, [props?.state]);

    useEffect(() => {
        switch (state) {
            case null:
                console.log(1, props?.state);
                if (typeof props?.onBack === "function") props?.onBack();
                break;
            case false:
                console.log(2, props?.state);
                if (typeof props?.left?.onClick === "function") props?.left?.onClick();
                break;
            case true:
                console.log(3, props?.state);
                if (typeof props?.right?.onClick === "function") props?.right?.onClick();
                break;
        }
    }, [state, props?.onBack, props?.left?.onClick, props?.right?.onClick]);

    const center = () => {
        return <Part $state={state}>{props?.content}</Part>;
    };

    return (
        <Style $state={state} style={props?.style}>
            <div style={{ transform: `translateX(${!state ? (typeof state === "undefined" ? "0" : state === false ? "-100%" : "-200%") : "0"}` }}>
                <Part $state={state} style={{}}>
                    {props?.left?.children}
                </Part>
                {!props?.loading ? (
                    center()
                ) : (
                    <Layouts.Contents.SlideContainer
                        contents={[
                            { active: !props?.loading, children: center() },
                            { active: props?.loading, children: <>Loading...</> },
                        ]}
                    />
                )}
                <Part $state={state}>{props?.right?.children}</Part>
            </div>
        </Style>
    );
}
