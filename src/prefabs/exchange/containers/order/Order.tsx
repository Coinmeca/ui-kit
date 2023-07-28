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
    responsive?: boolean;
}

export default function Order(props: OrderControl) {
    const { windowSize } = useWindowSize();

    const [mode, setMode] = useState(true);
    const option = props?.option || "market";
    const responsive = props?.responsive || false;

    const [buy, setBuy] = useState<O | undefined>();
    const [sell, setSell] = useState<O | undefined>();

    const color = {
        buy: "green",
        sell: "red",
    };

    const [handleConfirm, closeConfirm] = usePortal(<Exchange.Modals.Confirmation mode={mode} color={color} order={buy} onClose={() => closeConfirm()} />);
    const handleReset = () => {};

    const ButtonName = (name: string, condition: boolean) => {
        if (!name && name === "") return;
        return (
            <span style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {Object.values(name).map((character: string, i: number) => {
                    return (
                        <span
                            style={{
                                ...(i !== 0 && {
                                    ...(condition && {
                                        position: "absolute",
                                        opacity: 0,
                                        // transition: ".15s ease",
                                    }),
                                }),
                            }}
                        >
                            {character}
                        </span>
                    );
                })}
            </span>
        );
    };

    return (
        <>
            <Layouts.Col gap={1}>
                <Layouts.Contents.SlideContainer
                    style={{ gap: `${responsive ? 2 : 3}em` }}
                    contents={[
                        {
                            active: responsive ? mode === true : true,
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
                            active: responsive ? mode === false : true,
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
                    <Layouts.Row gap={!responsive ? 6 : 4} fix>
                        <Controls.Button icon={"revert-bold"} hide={!responsive} fit />
                        <Controls.Button
                            type={"solid"}
                            color={color.buy}
                            style={{ ...(responsive && mode === false ? { maxWidth: "4em" } : { maxWidth: "100%" }) }}
                            onClick={(e: any, o: O) => {
                                mode === false && setMode(true);
                                (mode === true || !responsive) && handleConfirm();
                            }}
                        >
                            {ButtonName("BUY", responsive && mode === false)}
                        </Controls.Button>
                        <Controls.Button
                            type={"solid"}
                            color={color.sell}
                            style={{ ...(responsive && mode ? { maxWidth: "4em" } : { maxWidth: "100%" }) }}
                            onClick={(e: any) => {
                                mode === true && setMode(false);
                                (mode === false || !responsive) && handleConfirm();
                            }}
                        >
                            {ButtonName("SELL", responsive && mode === true)}
                        </Controls.Button>
                    </Layouts.Row>
                </Layouts.Row>
            </Layouts.Col>
        </>
    );
}
