"use client";
import { useState } from "react";
import { Contents, Controls, Elements, Layouts } from "components";
import type { PartContainer } from "components/layouts/contents/part/PartContainer";
import type { State } from "../states/State";

export interface Process extends PartContainer {
    left?: { children?: State };
    right?: { children?: State };
    onFinish?: Function;
}

export default function Process(props: Process) {
    const [state, setState] = useState<boolean | null>(props?.state || null);

    const handleBack = (e: any) => {
        if (typeof props?.onBack === "function") props?.onBack(e);
        setState(null);
    };

    const handleFinish = (e: any) => {
        if (typeof props?.onFinish === "function") props?.onFinish(e);
        setState(null);
    };

    return (
        <Layouts.Contents.PartContainer
            {...props}
            state={state}
            left={{
                children: (
                    <Contents.States.Failure
                        {...props?.left}
                        message={'Your order has been failed to processing.'}
                        children={<Controls.Button onClick={(e: any) => handleBack(e)}>Go Back</Controls.Button>}
                    />
                ),
            }}
            content={props?.content}
            right={{
                children: (
                    <Contents.States.Success
                        {...props?.right}
                        message={"Your order has been successfully completed."}
                        children={<Controls.Button onClick={(e: any) => handleFinish(e)}>OK</Controls.Button>}
                    />
                ),
            }}
        />
    );
}
