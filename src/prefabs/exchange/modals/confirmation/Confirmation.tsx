"use client";
import { useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { Modals } from "containers";
import type { Order as O } from "types/order";

export interface Confirmation {
    mode?: boolean;
    color?: { buy?: string; sell?: string };
    order: O;
    onClose: Function;
}

export default function Confirmation(props: any) {
    const mode = typeof props?.mode === "undefined" ? true : props?.mode;
    const color = {
        buy: props?.color?.buy || "green",
        sell: props?.color?.sell || "red",
    };

    const [process, setProcess] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleClose = (e: any) => {
        if (typeof props?.onClose === "function") props?.onClose(e);
    };

    const confirm = (confirm: Function) => {
        const gap = {
            row: 2,
            space: {
                small: { padding: "0 0.5em" },
            },
        };

        const text = {
            height: 1.5,
            opacity: 0.45,
            label: { flex: 0 },
            setting: { fontFeatureSettings: `"tnum" on,"lnum" on` },
            width: { width: "100%", maxWidth: `${4}em` },
            align: "right" as "right",
        };

        return (
            <Layouts.Col gap={2} style={{ height: "100%" }}>
                <Layouts.Contents.InnerContent style={{ justifyContent: "center", ...text?.setting }}>
                    <Layouts.Col gap={1}>
                        <Layouts.Row gap={gap.row} style={gap.space.small} fix>
                            <Elements.Text height={text.height} opacity={text.opacity} fit>
                                Price
                            </Elements.Text>
                            <Layouts.Row gap={gap.row} fix>
                                <Elements.Text color={mode ? color.buy : color.sell} height={text.height} align={text.align}>
                                    {props?.order?.price}
                                </Elements.Text>
                                <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                                    {"eth".toUpperCase()}
                                </Elements.Text>
                            </Layouts.Row>
                        </Layouts.Row>
                        <Layouts.Divider />
                        <Layouts.Row gap={gap.row} style={gap.space.small} fix>
                            <Elements.Text height={text.height} opacity={text.opacity} fit>
                                Amount
                            </Elements.Text>
                            <Layouts.Row gap={gap.row} fix>
                                <Elements.Text height={text.height} align={text.align}>
                                    {props?.order?.amount}
                                </Elements.Text>
                                <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                                    {"eth".toUpperCase()}
                                </Elements.Text>
                            </Layouts.Row>
                        </Layouts.Row>
                        <Layouts.Row gap={gap.row} style={gap.space.small} fix>
                            <Elements.Text height={text.height} opacity={text.opacity} fit>
                                Quantity
                            </Elements.Text>
                            <Layouts.Row gap={gap.row} fix>
                                <Elements.Text color={mode ? color.buy : color.sell} height={text.height} align={text.align}>
                                    {props?.order?.quantity}
                                </Elements.Text>
                                <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                                    {"eth".toUpperCase()}
                                </Elements.Text>
                            </Layouts.Row>
                        </Layouts.Row>
                        <Layouts.Divider />
                        <Layouts.Row gap={gap.row} style={gap.space.small} fix>
                            <Elements.Text height={text.height} opacity={text.opacity} fit>
                                Fees
                            </Elements.Text>
                            <Layouts.Row gap={gap.row} fix>
                                <Elements.Text opacity={0.45} height={text.height} align={text.align}>
                                    - {props?.order?.fees}
                                </Elements.Text>
                                <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                                    {"eth".toUpperCase()}
                                </Elements.Text>
                            </Layouts.Row>
                        </Layouts.Row>
                        <Layouts.Row gap={gap.row} style={gap.space.small} fix>
                            <Elements.Text height={text.height} opacity={text.opacity} fit>
                                Total
                            </Elements.Text>
                            <Layouts.Row gap={gap.row} fix>
                                <Elements.Text color={mode ? color.buy : color.sell} height={text.height} align={text.align}>
                                    {props?.order?.total}
                                </Elements.Text>
                                <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                                    {"eth".toUpperCase()}
                                </Elements.Text>
                            </Layouts.Row>
                        </Layouts.Row>
                    </Layouts.Col>
                </Layouts.Contents.InnerContent>
                <Controls.Button onClick={confirm}>Confirm</Controls.Button>
            </Layouts.Col>
        );
    };

    return (
        <Modals.Process
            process={process}
            title={`${mode ? "Buy" : "Sell"} Confirmation`}
            content={confirm(() => setLoading(true))}
            failure={{
                message: "Your order has been failed to processing.",
                children: (
                    <Controls.Button
                        onClick={(e: any) => {
                            setProcess(null);
                        }}
                    >
                        Go Back
                    </Controls.Button>
                ),
            }}
            loading={{
                active: loading,
                message: "Please wait to done your transaction processing.",
                children: (
                    <Controls.Button
                        onClick={(e: any) => {
                            setProcess(true);
                        }}
                    >
                        {`Let's Finish`}
                    </Controls.Button>
                ),
            }}
            success={{
                message: "Your order has been successfully completed.",
                children: (
                    <Controls.Button
                        onClick={(e: any) => {
                            handleClose(e);
                            setProcess(null);
                            setLoading(false);
                        }}
                    >
                        OK
                    </Controls.Button>
                ),
            }}
            onClose={(e: any) => {
                handleClose(e);
            }}
            close={!loading}
        />
    );
}
