"use client";
import { useEffect, useState } from "react";
import { Modal } from "containers";
import type { Modal as Default } from "containers/modals/Modal";
import { Contents } from "components";
import type { PartContainer } from "components/layouts/contents/part/PartContainer";

export interface Process extends PartContainer, Default {
    state?: boolean | null;
}

export default function Process(props: Process) {
    const [state, setState] = useState<boolean | null>(typeof props?.state !== "undefined" ? props?.state : null);

    const handleClose = (e: any) => {
        if (typeof props?.onClose === "function") props?.onClose(e);
    };

    useEffect(() => {
        console.log("value", props?.state);
        if (typeof props?.state !== "undefined") setState(props?.state);
    }, [props?.state]);

    return <Modal {...{ ...props }} onClose={(e: any) => handleClose(e)} content={<Contents.Process {...props} state={state} />} close />;
}
