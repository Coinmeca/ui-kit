"use client";
import { useEffect, useState } from "react";
import { Modal } from "containers";
import type { Modal as Default } from "containers/modals/Modal";
import { Contents } from "components";
import type { PartContainer } from "components/layouts/contents/part/PartContainer";

export interface Process extends PartContainer, Default {
    state: boolean | null;
}

export default function Process(props: Process) {
    const handleClose = (e: any) => {
        if (typeof props?.onClose === "function") props?.onClose(e);
    };
    console.log("modal", props?.state);

    return <Modal {...{ ...props }} onClose={(e: any) => handleClose(e)} content={<Contents.Process {...props} />} close />;
}
