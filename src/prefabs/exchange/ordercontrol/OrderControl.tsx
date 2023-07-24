"use client";
import { useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { Modal } from "containers";
import { Token } from "types/web3";
import Order from "./Order";
import type { Order as O } from "./Order";
import useWindowSize from "hooks/useWindowSize";
import usePortal from "hooks/usePortal";

export interface OrderControl {
    base: Token;
    quote: Token;
    price: number | string;
    fee: number;
    option?: "market" | "limit";
    onClickBuy?: Function;
    onClickSell?: Function;
    responsive?: number;
}

export interface Order {
    buy: string;
    sell: string;
    category?: number;
    option?: number;
    price: number | string;
    amount?: number | string;
    quantity?: number | string;
    fees?: number | string;
}

export default function OrderControl(props: OrderControl) {
    const { windowSize } = useWindowSize();
    const { portal, close } = usePortal();

    const [mode, setMode] = useState(true);
    const option = props?.option || "market";
    const responsive = props?.responsive || 0;

    const [buy, setBuy] = useState<any>();


    const handleChangeBuy = (order: O) => {
        console.log(order);
        setBuy(order);
    };

    const color = {
        buy: "green",
        sell: "red",
    };

    const confirm = () => {
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
            align: "right" as 'right',
        };

        return <>
            <Layouts.Col>
                <Layouts.Col gap={2}>
                    <Layouts.Row gap={gap.row} style={gap.space.small} fix>
                        <Elements.Text height={text.height} opacity={text.opacity} style={text.label}>
                            Price
                        </Elements.Text>
                        <Layouts.Row gap={gap.row} fix>
                            <Elements.Text color={mode ? color.buy : color.sell} height={text.height} align={text.align} style={text.setting}>
                                12345678
                            </Elements.Text>
                            <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                                {('eth').toUpperCase()}
                            </Elements.Text>
                        </Layouts.Row>
                    </Layouts.Row>
                    <Layouts.Divider />
                    <Layouts.Row gap={gap.row} style={gap.space.small} fix>
                        <Elements.Text height={text.height} opacity={text.opacity} style={text.label}>
                            Amount
                        </Elements.Text>
                        <Layouts.Row gap={gap.row} fix>
                            <Elements.Text height={text.height} align={text.align} style={text.setting}>
                                12345678
                            </Elements.Text>
                            <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                                {('eth').toUpperCase()}
                            </Elements.Text>
                        </Layouts.Row>
                    </Layouts.Row>
                    <Layouts.Row gap={gap.row} style={gap.space.small} fix>
                        <Elements.Text height={text.height} opacity={text.opacity} style={text.label}>
                            Quantity
                        </Elements.Text>
                        <Layouts.Row gap={gap.row} fix>
                            <Elements.Text color={mode ? color.buy : color.sell} height={text.height} align={text.align} style={text.setting}>
                                12345678
                            </Elements.Text>
                            <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                                {('eth').toUpperCase()}
                            </Elements.Text>
                        </Layouts.Row>
                    </Layouts.Row>
                    <Layouts.Divider />
                    <Layouts.Row gap={gap.row} style={gap.space.small} fix>
                        <Elements.Text height={text.height} opacity={text.opacity} style={text.label}>
                            Fees
                        </Elements.Text>
                        <Layouts.Row gap={gap.row} fix>
                            <Elements.Text opacity={0.45} height={text.height} align={text.align} style={text.setting}>
                                - 12345678
                            </Elements.Text>
                            <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                                {('eth').toUpperCase()}
                            </Elements.Text>
                        </Layouts.Row>
                    </Layouts.Row>
                    <Layouts.Row gap={gap.row} style={gap.space.small} fix>
                        <Elements.Text height={text.height} opacity={text.opacity} style={text.label}>
                            Total
                        </Elements.Text>
                        <Layouts.Row gap={gap.row} fix>
                            <Elements.Text color={mode ? color.buy : color.sell} height={text.height} align={text.align} style={text.setting}>
                                12345678
                            </Elements.Text>
                            <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                                {('eth').toUpperCase()}
                            </Elements.Text>
                        </Layouts.Row>
                    </Layouts.Row>
                </Layouts.Col>
                <Controls.Button onClick={close}>Confirm</Controls.Button>
            </Layouts.Col>
        </>
    };

    const handleBuy = () => {
        portal(<Modal title={"Buy Confirmation"} onClose={close} close>{confirm()}</Modal>);
    };

    const handleSell = (e: any) => {
        portal(<Modal title={"Sell Confirmation"} onClose={close} close>{confirm()}</Modal>);
    };

    return (
        <>
            <Layouts.Col gap={1}>
                <Layouts.Contents.SlideContainer
                    style={{ gap: `${windowSize.width <= responsive ? 2 : 3}em` }}
                    contents={[
                        {
                            active: windowSize.width <= responsive ? mode === true : true,
                            style: { height: "max-content", overflow: "hidden" },
                            children: (
                                <Order
                                    mode={true}
                                    option={option}
                                    assets={[props?.quote, props?.base]}
                                    price={props?.price}
                                    fee={props?.fee}
                                    onChange={(v: O) => handleChangeBuy(v)}
                                />
                            ),
                        },
                        {
                            active: windowSize.width <= responsive ? mode === false : true,
                            style: { height: "max-content", overflow: "hidden" },
                            children: (
                                <Order
                                    mode={false}
                                    option={option}
                                    assets={[props?.base, props?.quote]}
                                    price={props?.price}
                                    fee={props?.fee}
                                    onChange={(v: O) => handleChangeBuy(v)}
                                />
                            ),
                        },
                    ]}
                />
                <Layouts.Row fix>
                    <Layouts.Row gap={windowSize.width > responsive ? 6 : 4} fix>
                        <Controls.Button icon={"revert-bold"} hide={windowSize.width > responsive} fit />
                        <Controls.Button
                            type={"solid"}
                            color={color.buy}
                            style={{ ...(windowSize.width <= responsive && mode === false ? { maxWidth: "4em" } : { maxWidth: "100%" }) }}
                            onClick={(e: any, o: O) => {
                                windowSize.width <= responsive && mode === false ? setMode(true) : handleBuy();
                            }}
                        >
                            <span>B</span>
                            <span
                                style={{
                                    ...(windowSize.width <= responsive && mode === false && { position: "absolute", opacity: 0, transition: ".3s ease" }),
                                }}
                            >
                                U
                            </span>
                            <span
                                style={{
                                    ...(windowSize.width <= responsive && mode === false && { position: "absolute", opacity: 0, transition: ".3s ease" }),
                                }}
                            >
                                Y
                            </span>
                        </Controls.Button>
                        <Controls.Button
                            type={"solid"}
                            color={color.sell}
                            style={{ ...(windowSize.width <= responsive && mode ? { maxWidth: "4em" } : { maxWidth: "100%" }) }}
                            onClick={(e: any) => {
                                windowSize.width <= responsive && mode ? setMode(false) : handleSell(e);
                            }}
                        >
                            <span>S</span>
                            <span style={{ ...(windowSize.width <= responsive && mode && { position: "absolute", opacity: 0, transition: ".3s ease" }) }}>
                                E
                            </span>
                            <span style={{ ...(windowSize.width <= responsive && mode && { position: "absolute", opacity: 0, transition: ".3s ease" }) }}>
                                L
                            </span>
                            <span style={{ ...(windowSize.width <= responsive && mode && { position: "absolute", opacity: 0, transition: ".3s ease" }) }}>
                                L
                            </span>
                        </Controls.Button>
                    </Layouts.Row>
                </Layouts.Row>
            </Layouts.Col>
        </>
    );
}
