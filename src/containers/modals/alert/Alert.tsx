import Default from "../Default";
import { Controls } from "components";

export interface Alert {
    title?: string;
    message?: string;
    buttonLeft?: {
        name?: string;
        onClick?: Function;
    };
    buttonRight?: {
        name?: string;
        onClick?: Function;
    };
    onClose?: Function;
}

export default function Alert(props: Alert) {
    const handleLeftClick = (e: any) => {
        if (typeof props?.buttonLeft?.onClick === "function") props?.buttonLeft?.onClick(e);
    };
    const handleRightClick = (e: any) => {
        if (typeof props?.buttonRight?.onClick === "function") props?.buttonRight?.onClick(e);
    };

    return (
        <Default
        // title={props?.title}
        // message={props?.message}
        // buttonArea={
        //     <>
        //         <Controls.Button onClick={(e: any) => handleLeftClick(e)}>{props?.buttonLeft?.name || "Cancel"}</Controls.Button>
        //         <Controls.Button onClick={(e: any) => handleRightClick(e)}>{props?.buttonRight?.name || "OK"}</Controls.Button>
        //     </>
        // }
        // onClose={props?.onClose}
        // close
        />
    );
}
