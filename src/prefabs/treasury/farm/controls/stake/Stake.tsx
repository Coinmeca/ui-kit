"use client";
import { Controls, Elements, Layouts } from "components";
import { useMobile, useOrder, usePortal } from "hooks";
import { format } from "lib/utils";
import { Exchange } from "prefabs";
import { useEffect, useState } from "react";
import type { Asset } from "types";

export interface StakeControl {
    mode: boolean;
    assets: Asset[];
    price: number | string;
    fee: number;
    option?: "market" | "limit";
    onChange?: Function;
    responsive?: number;
}

export default function Stake(props: StakeControl) {
    const { isMobile } = useMobile();

    const mode = typeof props?.mode === "undefined" ? true : props?.mode;
    const assets = props?.assets || [];
    const available = parseFloat(format(assets[0]?.balance || 0, "number", true));

    const option = props?.option || "market";
    const [currency, setCurrency] = useState(0);
    const currencies = mode
        ? [assets[1]?.symbol?.toUpperCase() || "", assets[0]?.symbol?.toUpperCase() || ""]
        : [assets[0]?.symbol?.toUpperCase() || "", assets[1]?.symbol?.toUpperCase() || ""];

    const { order, price, amount, quantity } = useOrder(
        {
            pay: assets[0],
            price: parseFloat(format(props?.price || 1, "number", true)),
            amount: 0,
            quantity: 0,
            fees: 0,
            total: 0,
        },
        mode,
        0.01,
        available
    );

    const color = {
        buy: "orange",
        sell: "blue",
    };

    const gap = {
        col: {
            small: 0.5,
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

    useEffect(() => {
        return () => {
            closePricePad();
            closeAmountPad();
        };
    }, []);

    useEffect(() => {
        if (typeof props?.onChange === "function") props?.onChange(order);
    }, [order]);

    const handleChangePrice = (p: number | string) => {
        price(parseFloat(format(p, "number", true)));
    };

    const handleChangeAmount = (a: number | string) => {
        currency === 0 ? quantity(parseFloat(format(a, "number", true))) : amount(parseFloat(format(a, "number", true)));
    };

    const handleChangeRange = (v: number) => {
        if (available > 0)
            currency === 0
                ? quantity(((parseFloat(format(available, "number", true)) / order.price) * parseFloat(format(v, "number", true))) / 100)
                : amount((parseFloat(format(available, "number", true)) * parseFloat(format(v, "number", true))) / 100);
    };

    const pricePosition = order.price === 0 ? 0 : (1 - parseFloat(props?.price?.toString()) / order.price) * 100;
    const [handlePricePad, closePricePad] = usePortal(
        <Exchange.BottomSheets.OrderPad
            label={"Price"}
            placeholder={order.price}
            value={order.price}
            unit={[...assets][mode ? 0 : 1]?.symbol}
            sub={{
                color: `${mode ? (pricePosition > 0 && "red") || (pricePosition < 0 && "green") : (pricePosition > 0 && "green") || (pricePosition < 0 && "red")
                    }`,
                value: `${(pricePosition > 0 && "+ ") || (pricePosition < 0 && "- ") || ""}${Math.abs(pricePosition)}`,
                unit: "%",
            }}
            button={{ children: "OK", onClick: () => closePricePad() }}
            onChange={(e: any, v: any) => handleChangePrice(v)}
        />
    );

    const [handleAmountPad, closeAmountPad] = usePortal(
        <Exchange.BottomSheets.OrderPad
            label={currency === 0 ? "Quantity" : "Amount"}
            placeholder={"0"}
            value={currency === 0 ? order.quantity : order.amount}
            unit={[...assets].reverse()[currency]?.symbol}
            sub={{
                value: `= ${format(currency === 0 ? order.amount : order.quantity || 0, "currency", { unit: 9, limit: 12, fix: 3 })}`,
                unit: assets[currency]?.symbol,
            }}
            button={{
                color: mode ? color.buy : color.sell,
                children: mode ? "BUY" : "SELL",
                onClick: () => closeAmountPad(),
            }}
            onChange={(e: any, v: any) => handleChangeAmount(v)}
            onClose={() => closeAmountPad()}
        />
    );

    return (
        <Layouts.Col gap={gap.col.big} style={{ paddingTop: `${gap.col.small}em` }}>
            <Layouts.Row gap={gap.row} style={{ ...gap.space.big, overflow: "hidden" }} fix>
                <Elements.Text height={text.height} opacity={text.opacity} style={text.label} fit>
                    Available
                </Elements.Text>
                <Layouts.Row gap={gap.row} fix>
                    <Elements.Text height={text.height} align={"right"} style={text.setting}>
                        {format(assets[0]?.balance as number, "currency", { unit: 9, limit: 12, fix: 3 })}
                    </Elements.Text>
                    <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                        {assets[0]?.symbol}
                    </Elements.Text>
                </Layouts.Row>
            </Layouts.Row>
            {/* <Controls.Input
                placeholder={"Price"}
                type={"currency"}
                align={"right"}
                value={order.price}
                onChange={(e: any, v: any) => handleChangePrice(v)}
                onClick={() => isMobile && handlePricePad()}
                inputMode={isMobile ? "none" : undefined}
                left={{ children: <span>Price</span> }}
                right={{
                    width: gap.width,
                    children: <span style={{ justifyContent: "flex-start" }}>{assets[mode ? 0 : 1]?.symbol}</span>,
                }}
                style={text.setting}
                lock={option === "market"}
            /> */}
            <Controls.Input
                placeholder={"0"}
                type={"currency"}
                align={"right"}
                value={currency === 0 ? order?.quantity : order?.amount}
                max={currency === 0 ? (order?.quantity || 1) / order.price : order.amount}
                onChange={(e: any, v: any) => handleChangeAmount(v)}
                onClick={() => isMobile && handleAmountPad()}
                inputMode={isMobile ? "none" : undefined}
                left={{
                    children: <span>{currency === 0 ? "Qunatity" : "Amount"}</span>,
                }}
                right={{
                    width: gap.width,
                    children: (
                        <Controls.Dropdown
                            option={currencies[currency]}
                            options={currencies}
                            onClickItem={(e: any, v: any, k: number) => {
                                setCurrency(k);
                            }}
                        />
                    ),
                }}
                style={text.setting}
            />
            <Controls.Range
                color={mode ? color.buy : color.sell}
                value={(order.amount! / available) * 100}
                min={range.min}
                max={range.max}
                step={range.step}
                unit={range.unit}
                onChange={(v: any, p: number) => handleChangeRange(p)}
            />
            <Layouts.Col gap={gap.col.big}>
                <Layouts.Row gap={gap.row} style={gap.space.small} fix>
                    <Elements.Text height={text.height} opacity={text.opacity} style={text.label} fit>
                        Fees
                    </Elements.Text>
                    <Layouts.Row gap={gap.row} fix>
                        <Elements.Text height={text.height} align={"right"} style={text.setting}>
                            - {format(order.fees as number, "currency", { unit: 9, limit: 12, fix: 3 })}
                        </Elements.Text>
                        <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                            {assets[1]?.symbol}
                        </Elements.Text>
                    </Layouts.Row>
                </Layouts.Row>
                <Layouts.Row gap={gap.row} style={gap.space.small} fix>
                    <Elements.Text height={text.height} opacity={text.opacity} style={text.label} fit>
                        Total
                    </Elements.Text>
                    <Layouts.Row gap={gap.row} fix>
                        <Elements.Text height={text.height} align={"right"} style={text.setting}>
                            {format(order.total as number, "currency", { unit: 9, limit: 12, fix: 3 })}
                        </Elements.Text>
                        <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                            {assets[1]?.symbol}
                        </Elements.Text>
                    </Layouts.Row>
                </Layouts.Row>
            </Layouts.Col>
        </Layouts.Col>
    );
}
