"use client";
import { useState } from "react";
import { Controls, Layouts } from "components";
import { Exchange } from "prefabs";
import { Token } from "types/web3";
import type { Order as O } from "prefabs/exchange/controls/order/Order";
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

export default function Order(props: OrderControl) {
    const { windowSize } = useWindowSize();

    const [mode, setMode] = useState(true);
    const option = props?.option || "market";
    const responsive = props?.responsive || 0;

    const [buy, setBuy] = useState<O | undefined>();
    const [sell, setSell] = useState<O | undefined>();

    const color = {
        buy: "green",
        sell: "red",
    };

    const [handleConfirm, closeConfirm] = usePortal(<Exchange.Modals.Confirmation mode={mode} color={color} order={buy} onClose={() => closeConfirm()} />);
    const handleReset = () => {};

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
                                <Exchange.Controls.Order
                                    mode={true}
                                    option={option}
                                    assets={[props?.quote, props?.base]}
                                    price={props?.price}
                                    fee={props?.fee}
                                    onChange={(v: O) => setBuy(v)}
                                />
                            ),
                        },
                        {
                            active: windowSize.width <= responsive ? mode === false : true,
                            style: { height: "max-content", overflow: "hidden" },
                            children: (
                                <Exchange.Controls.Order
                                    mode={false}
                                    option={option}
                                    assets={[props?.base, props?.quote]}
                                    price={props?.price}
                                    fee={props?.fee}
                                    onChange={(v: O) => setSell(v)}
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
                                mode === false && setMode(true);
                                (mode === true || windowSize.width > responsive) && handleConfirm();
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
                                mode === true && setMode(false);
                                (mode === false || windowSize.width > responsive) && handleConfirm();
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
