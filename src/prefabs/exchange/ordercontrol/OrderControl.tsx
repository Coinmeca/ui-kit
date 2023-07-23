"use client";
import { useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { Token } from "types/web3";
import useWindowSize from "hooks/useWindowSize";
import Order from "./Order";
import type { Order as O } from "./Order";

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

    const [mode, setMode] = useState(true);
    const option = props?.option || "market";
    const responsive = props?.responsive || 0;

    const [buy, setBuy] = useState<any>();

    const handleChangeBuy = (order: O) => {
        console.log(order);
        setBuy(order);
    }

    const handleBuy = () => {
        alert(buy);
    };

    const handleSell = (e: any) => {
        alert("sell");
    };

    const color = {
        buy: "green",
        sell: "red",
    };

    const gap = {
        col: {
            small: 1,
            big: 1,
        },
        row: 2,
        space: {
            small: { padding: "0 0.5em" },
            big: { padding: "0.5em" },
        },
        width: 12,
    };

    const text = {
        height: 1.5,
        opacity: 0.45,
        label: { flex: 0 },
        setting: { fontFeatureSettings: `"tnum" on,"lnum" on` },
        width: { width: "100%", maxWidth: `${gap.width - 5.125}em` },
        align: "right",
    };

    const range = {
        min: 0,
        max: 100,
        step: 5,
        unit: "%",
    };

    return (
        <>
            <Layouts.Col gap={gap.col.big}>
                <Layouts.Contents.SlideContainer
                    style={{ gap: `${windowSize.width <= responsive ? 2 : 3}em` }}
                    contents={[
                        {
                            active: windowSize.width <= responsive ? mode === true : true,
                            style: { height: "max-content", overflow: "hidden" },
                            children: (
                                <Order mode={true} option={option} assets={[props?.quote, props?.base]} price={props?.price} fee={props?.fee} onChange={(v: O) => handleChangeBuy(v)} />
                            ),
                        },
                        {
                            active: windowSize.width <= responsive ? mode === false : true,
                            style: { height: "max-content", overflow: "hidden" },
                            children: (
                                <Order mode={false} option={option} assets={[props?.base, props?.quote]} price={props?.price} fee={props?.fee} onChange={(v: O) => handleChangeBuy(v)} />
                            ),
                        },
                    ]}
                />
                <Layouts.Row fix>
                    <Layouts.Row gap={windowSize.width > responsive ? 6 : 4} fix>
                        <Controls.Button icon={"reset"} hide={windowSize.width > responsive} fit />
                        <Controls.Button
                            type={"solid"}
                            color={color.buy}
                            style={{ ...(windowSize.width <= responsive && mode === false ? { maxWidth: "4em" } : { maxWidth: "100%" }) }}
                            onClick={(e: any, o: O) => {
                                windowSize.width <= responsive && mode === false ? setMode(true) : handleBuy();
                            }}
                        >
                            <span>B</span>
                            <span style={{ ...(windowSize.width <= responsive && mode === false && { position: "absolute", opacity: 0, transition: ".3s ease" }) }}>U</span>
                            <span style={{ ...(windowSize.width <= responsive && mode === false && { position: "absolute", opacity: 0, transition: ".3s ease" }) }}>Y</span>
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
                            <span style={{ ...(windowSize.width <= responsive && mode && { position: "absolute", opacity: 0, transition: ".3s ease" }) }}>E</span>
                            <span style={{ ...(windowSize.width <= responsive && mode && { position: "absolute", opacity: 0, transition: ".3s ease" }) }}>L</span>
                            <span style={{ ...(windowSize.width <= responsive && mode && { position: "absolute", opacity: 0, transition: ".3s ease" }) }}>L</span>
                        </Controls.Button>
                    </Layouts.Row>
                </Layouts.Row>
            </Layouts.Col>
        </>
    );
}
