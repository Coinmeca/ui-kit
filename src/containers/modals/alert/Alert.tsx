import type { Modal as Default } from "containers/modals/Modal";
import Modal from "containers/modals/Modal";
import { Controls } from "components";

export interface Alert extends Default {
    buttonLeft?: {
        name?: string;
        onClick?: Function;
    };
    buttonRight?: {
        name?: string;
        onClick?: Function;
    };
}

export default function Alert(props: Alert) {
    const handleLeftClick = (e: any) => {
        if (typeof props?.buttonLeft?.onClick === "function")
            props?.buttonLeft?.onClick(e);
        if (typeof props?.onClose === "function") props?.onClose(e);
    };
    const handleRightClick = (e: any) => {
        if (typeof props?.buttonRight?.onClick === "function")
            props?.buttonRight?.onClick(e);
        if (typeof props?.onClose === "function") props?.onClose(e);
    };

    return (
        <Modal
            title={props?.title}
            message={props?.message}
            buttonArea={
                <>
                    <Controls.Button onClick={(e: any) => handleLeftClick(e)}>
                        {props?.buttonLeft?.name || "Cancel"}
                    </Controls.Button>
                    <Controls.Button onClick={(e: any) => handleRightClick(e)}>
                        {props?.buttonRight?.name || "OK"}
                    </Controls.Button>
                </>
            }
            onClose={props?.onClose}
            close
        />
    );
}
