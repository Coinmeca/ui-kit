"use client";
import { useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { Modal, Modals } from "containers";
import usePortal from "hooks/usePortal";
import Dummy from "../dummy";

export default function Page() {
    const { slides2, tab, setTab, tabs } = Dummy();

    // const handleModal = () => {
    //     // portal(<Modals.Alert title={"This is a Modal."} message={"This is a modal content test message."} onClose={close} />);
    //     // portal(<Modal title={"This is a Modal."} message={"This is a modal content test message."} onClose={close} close />);
    //     handleDialogue();
    // };

    const [handleModal, closeDialogue] = usePortal(
        <Modal title={"This is a Modal."} message={"This is a modal content test message."} onClose={() => closeDialogue()} close />
    );

    const [state, setState] = useState<boolean | null>(null);
    const [handleProcessModal, closeProcessModal] = usePortal(
        <Modals.Process
            state={state}
            title={"This is a Modal."}
            content={
                <>
                    <Layouts.Contents.InnerContent>
                        <Elements.Text align="center" opacity={0.6}>
                            Here is the message for process modal.
                        </Elements.Text>
                    </Layouts.Contents.InnerContent>
                    <Layouts.Row fix gap={3}>
                        <Controls.Button
                            onClick={() => {
                                setState(false);
                                console.log("onLeft", state);
                            }}
                        >
                            Go to Left
                        </Controls.Button>
                        <Controls.Button
                            onClick={() => {
                                setState(true);
                                console.log("onRight", state);
                            }}
                        >
                            Go to Right
                        </Controls.Button>
                    </Layouts.Row>
                </>
            }
            failure={{
                message: "Your order has been successfully completed.",
                children: (
                    <Controls.Button
                        onClick={(e: any) => {
                            console.log("back");
                            setState(null);
                        }}
                    >
                        Go Back
                    </Controls.Button>
                ),
            }}
            success={{
                message: "Your order has been failed to processing.",
                children: (
                    <Controls.Button
                        onClick={(e: any) => {
                            console.log("finish");
                            setState(null);
                        }}
                    >
                        Go Back
                    </Controls.Button>
                ),
            }}
            onClose={() => {
                closeProcessModal();
            }}
            close
        />
    );

    return (
        <Layouts.Page>
            <Layouts.Cover>
                <Controls.Slide slides={slides2} padding={0} align={{ vertical: "top", horizon: "left" }} nav={"top"} style={{ zIndex: 4 }} />
            </Layouts.Cover>
            <Layouts.Box>
                <Layouts.Contents.InnerContent>
                    <Layouts.Row fix>
                        <Controls.Tab active={tab === "icon"} onClick={() => setTab("icon")}>
                            Icon
                        </Controls.Tab>
                        <Controls.Tab active={tab === "button"} onClick={() => setTab("button")}>
                            Button
                        </Controls.Tab>
                        <Controls.Tab active={tab === "dropdown"} onClick={() => setTab("dropdown")}>
                            Dropdown
                        </Controls.Tab>
                        <Controls.Tab active={tab === "input"} onClick={() => setTab("input")}>
                            Input
                        </Controls.Tab>
                        <Controls.Tab active={tab === "range"} onClick={() => setTab("range")}>
                            Range
                        </Controls.Tab>
                    </Layouts.Row>
                    <Layouts.Divider />
                    <Layouts.Contents.TabContainer contents={tabs} />
                </Layouts.Contents.InnerContent>
            </Layouts.Box>
        </Layouts.Page>
    );
}
