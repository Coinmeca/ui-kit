"use client";
import { ReactNode, useState } from "react";
import { Controls, Layouts } from "components";
import { Exchange } from "prefabs";
import { Token } from "types/web3";
import type { Order as O } from "prefabs/exchange/controls/order/Order";
import useWindowSize from "hooks/useWindowSize";
import usePortal from "hooks/usePortal";
import { Vault } from "prefabs/treasury";

export interface TradeControl {
    base: Token;
    quote: Token;
    price: number | string;
    fee: number;
    option?: "market" | "limit";
    onClickBuy?: Function;
    onClickSell?: Function;
    responsive?: number;
}

export default function Trade(props: TradeControl) {
    const { windowSize } = useWindowSize();

    const [mode, setMode] = useState(true);
    const option = props?.option || "market";
    const responsive = props?.responsive || 0;

    const [deposit, setDeposit] = useState<O | undefined>();
    const [withdraw, setWithdraw] = useState<O | undefined>();

    const color = {
        deposit: "orange",
        withdraw: "blue",
    };

    const [handleConfirm, closeConfirm] = usePortal(<Exchange.Modals.Confirmation mode={mode} color={color} onClose={() => closeConfirm()} />);

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
                    style={{ gap: `${windowSize.width <= responsive ? 2 : 3}em` }}
                    contents={[
                        {
                            active: windowSize.width <= responsive ? mode === true : true,
                            style: { height: "max-content", overflow: "hidden" },
                            children: (
                                <Vault.Controls.Trade
                                    mode={true}
                                    option={option}
                                    assets={[props?.quote, props?.base]}
                                    price={props?.price}
                                    fee={props?.fee}
                                    onChange={(v: O) => setDeposit(v)}
                                />
                            ),
                        },
                        {
                            active: windowSize.width <= responsive ? mode === false : true,
                            style: { height: "max-content", overflow: "hidden" },
                            children: (
                                <Vault.Controls.Trade
                                    mode={false}
                                    option={option}
                                    assets={[props?.base, props?.quote]}
                                    price={props?.price}
                                    fee={props?.fee}
                                    onChange={(v: O) => setWithdraw(v)}
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
                            color={color.deposit}
                            style={{ ...(windowSize.width <= responsive && mode === false ? { maxWidth: "4em" } : { maxWidth: "100%" }) }}
                            onClick={(e: any, o: O) => {
                                mode === false && setMode(true);
                                (mode === true || windowSize.width > responsive) && handleConfirm(null, { order: o });
                            }}
                        >
                            {ButtonName("DEPOSIT", windowSize.width <= responsive && mode === false)}
                        </Controls.Button>
                        <Controls.Button
                            type={"solid"}
                            color={color.withdraw}
                            style={{ ...(windowSize.width <= responsive && mode ? { maxWidth: "4em" } : { maxWidth: "100%" }) }}
                            onClick={(e: any, o: O) => {
                                mode === true && setMode(false);
                                (mode === false || windowSize.width > responsive) && handleConfirm(null, { order: o });
                            }}
                        >
                            {ButtonName("WITHDRAW", windowSize.width <= responsive && mode === true)}
                        </Controls.Button>
                    </Layouts.Row>
                </Layouts.Row>
            </Layouts.Col>
        </>
    );
}
