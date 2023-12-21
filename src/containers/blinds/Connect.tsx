import { Controls, Elements, Layouts } from "components";
import { type BG } from "components/layouts/bg/BG";

export interface Connect {
    background: BG;
    message?: string;
    onConnect?: Function;
}

export default function Connect(props: any) {
    const message = props?.message || "Please connect wallet first.";
    const handleConnect = (e?: any) => {
        if (typeof props?.onConnect === "function") props?.onConnect(e);
    };

    return (
        <Layouts.Blind background={props?.background}>
            <Layouts.Col gap={2} align={"center"} fit>
                <Elements.Text type="strong" align={"center"} fit>
                    {message}
                </Elements.Text>
                <Controls.Button type={"solid"} color={"black"} onClick={handleConnect} fit>
                    Connect
                </Controls.Button>
            </Layouts.Col>
        </Layouts.Blind>
    );
}
