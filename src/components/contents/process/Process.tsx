"use client";
import { useState } from "react";
import { Contents, Controls, Elements, Layouts } from "components";
import type { State } from "components/contents/states/State";

export interface Process {
    state?: boolean | null;
    content?: any;
    failure?: State;
    success?: State;
    style?: object;
    onBack?: Function;
    onFinish?: Function;
    loading?: boolean;
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
                        {...props?.failure}
                        message={'Your order has been failed to processing.'}
                    >
                        <Controls.Button onClick={(e: any) => handleBack(e)}>Go Back</Controls.Button>
                    </Contents.States.Failure>
                ),
            }}
            content={props?.content}
            right={{
                children: (
                    <Contents.States.Success
                        {...props?.success}
                        message={"Your order has been successfully completed."}

                    >
                        <Controls.Button onClick={(e: any) => handleFinish(e)}>OK</Controls.Button>
                    </Contents.States.Success>
                ),
            }}
        />
    );
}