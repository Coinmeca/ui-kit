"use client";
import { useEffect, useState } from "react";
import { Modal } from "containers";
import type { Modal as Default } from "containers/modals/Modal";
import { Contents, Layouts } from "components";
import type { PartContainer } from "components/layouts/contents/part/PartContainer";

export interface Process extends PartContainer, Default {
    state?: boolean | null;
}

export default function Process(props: Process) {
    const [state, setState] = useState<boolean | null>(props?.state || null);

    useEffect(() => {
        return () => {
            setState(null);
        };
    }, []);

    const handleClose = (e: any) => {
        if (typeof props?.onClose === "function") props?.onClose(e);
    };

    return (
        <Modal
            {...{ ...props }}
            onClose={(e: any) => handleClose(e)}
            content={
                <Layouts.Contents.PartContainer
                    {...props}
                    state={state}
                    left={{ children: <Contents.States.Success message="Your order has been failed to processing." /> }}
                    children={props?.children}
                    right={{ children: <Contents.States.Success message="Your order has been successfully completed." /> }}
                />
            }
            children={undefined}
            close
        />
    );
}
