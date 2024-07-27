"use client";
import { Modal } from "containers";
import type { Modal as Default } from "containers/modals/Modal";
import { Contents } from "components";
import type { Process as Part } from "components/contents/process/Process";

export interface Process extends Part, Default {}

export default function Process(props: Process) {
    const handleClose = (e: any) => {
        if (typeof props?.onClose === "function") props?.onClose(e);
    };

    return <Modal {...{ ...props }} onClose={(e: any) => handleClose(e)} content={<Contents.Process {...props} />} close />;
}
