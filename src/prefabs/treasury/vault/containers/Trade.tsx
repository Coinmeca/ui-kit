"use client";
import { useState } from "react";
import { Controls, Layouts } from "components";
import usePortal from "hooks/usePortal";
import { Exchange } from "prefabs";
import { Vault } from "prefabs/treasury";
import type { Order as O } from "types/order";
import { Token } from "types/web3";

export interface TradeControl {
    base: Token;
    quote: Token;
    price: number | string;
    fee: number;
    option?: "market" | "limit";
    onClickBuy?: Function;
    onClickSell?: Function;
    responsive?: boolean;
}

export default function Trade(props: TradeControl) {
    const [mode, setMode] = useState(true);
    const option = props?.option || "market";
    const responsive = props?.responsive || false;

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
            <span
                style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {Object.values(name).map((character: string, i: number) => {
                    return (
                        <span
                            key={i}
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
                            style: {
                                height: "max-content",
                                overflow: "hidden",
                            },
                            children: (
                                <Vault.Controls.Trade
                                    mode={true}
                                    assets={[props?.quote, props?.base]}
                                    price={props?.price}
                                    fee={props?.fee}
                                    onChange={(v: O) => setDeposit(v)}
                                />
                            ),
                        },
                        {
                            active: responsive ? mode === false : true,
                            style: {
                                height: "max-content",
                                overflow: "hidden",
                            },
                            children: (
                                <Vault.Controls.Trade
                                    mode={false}
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
                    <Layouts.Row gap={!responsive ? 6 : 4} fix>
                        <Controls.Button icon={"revert-bold"} hide={!responsive} fit />
                        <Controls.Button
                            type={"solid"}
                            color={color.deposit}
                            style={{
                                ...(responsive && mode === false ? { maxWidth: "4em" } : { maxWidth: "100%" }),
                            }}
                            onClick={(e: any, o: O) => {
                                mode === false && setMode(true);
                                (mode === true || !responsive) && handleConfirm(null, { order: o });
                            }}
                        >
                            {ButtonName("DEPOSIT", responsive && mode === false)}
                        </Controls.Button>
                        <Controls.Button
                            type={"solid"}
                            color={color.withdraw}
                            style={{
                                ...(responsive && mode ? { maxWidth: "4em" } : { maxWidth: "100%" }),
                            }}
                            onClick={(e: any, o: O) => {
                                mode === true && setMode(false);
                                (mode === false || !responsive) && handleConfirm(null, { order: o });
                            }}
                        >
                            {ButtonName("WITHDRAW", responsive && mode === true)}
                        </Controls.Button>
                    </Layouts.Row>
                </Layouts.Row>
            </Layouts.Col>
        </>
    );
}
