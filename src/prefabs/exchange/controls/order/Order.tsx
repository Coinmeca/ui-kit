"use client";
import { useEffect, useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { Exchange } from "prefabs";
import { useOrder, usePortal, useMobile } from "hooks";
import { Format } from "lib/utils";
import type { Token, Order } from "types";

export interface OrderControl {
    mode: boolean;
    assets: Token[];
    price: number | string;
    limit?: number | string;
    fee: number;
    option?: "market" | "limit";
    onChange?: Function;
    color?: {
        buy?: string;
        sell?: string;
    };
    responsive?: boolean;
}

export default function Order(props: OrderControl) {
    const { isMobile } = useMobile();

    const mode = typeof props?.mode === "undefined" ? true : props?.mode;
    const assets = props?.assets || [];
    const available = Format(assets[0]?.balance || 0, "number", true) as number;

    const option = props?.option || "market";
    const [currency, setCurrency] = useState(0);
    const currencies = mode
        ? [assets[1]?.symbol.toUpperCase(), assets[0]?.symbol.toUpperCase()]
        : [assets[0]?.symbol.toUpperCase(), assets[1]?.symbol.toUpperCase()];

    const { order, price, amount, quantity, maxQuantity } = useOrder(
        {
            base: assets[1]?.address,
            quote: assets[0]?.address,
            price: Format(props?.price, "number", true) as number,
        },
        mode,
        0.01,
        available
    );

    const color = {
        buy: props?.color?.buy || "green",
        sell: props?.color?.sell || "red",
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

    const [limit, setLimit] = useState(props?.price);

    useEffect(() => {
        if (option === "limit") setLimit(order.price);
        if (typeof props?.onChange === "function") props?.onChange(order);
    }, [order]);

    useEffect(() => {
        if (option === "market") price(Format(props?.price, "number", true) as number);
        if (option === "limit") price(Format(limit, "number", true) as number);
    }, [option]);

    const handleChangePrice = (p: number | string) => {
        price(Format(p, "number", true) as number);
    };

    const handleChangeAmount = (a: number | string) => {
        mode
            ? currency === 0
                ? quantity(Format(a, "number", true) as number)
                : amount(Format(a, "number", true) as number)
            : currency === 0
            ? amount(Format(a, "number", true) as number)
            : quantity(Format(a, "number", true) as number);
    };

    const handleChangeRange = (v: number) => {
        const a = available;
        const q = maxQuantity();
        if (a && q) {
            mode
                ? currency === 0
                    ? quantity((q * (Format(v, "number", true) as number)) / 100)
                    : amount((a * (Format(v, "number", true) as number)) / 100)
                : currency === 0
                ? amount((a * (Format(v, "number", true) as number)) / 100)
                : quantity((q * (Format(v, "number", true) as number)) / 100);
        }
    };

    const pricePosition = order?.price === 0 ? 0 : (1 - parseFloat(props?.price?.toString()) / order?.price) * 100;
    const [handlePricePad, closePricePad] = usePortal(
        <Exchange.BottomSheets.OrderPad
            label={"Price"}
            placeholder={order?.price}
            value={order?.price}
            unit={[...assets][mode ? 0 : 1]?.symbol?.toUpperCase()}
            sub={{
                color: `${
                    mode ? (pricePosition > 0 && "red") || (pricePosition < 0 && "green") : (pricePosition > 0 && "green") || (pricePosition < 0 && "red")
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
            value={currency === 0 ? order?.quantity : order?.amount}
            unit={[...assets].reverse()[currency]?.symbol?.toUpperCase()}
            sub={{
                value: `= ${Format(currency === 0 ? order?.amount : order?.quantity || 0, "currency", { unit: 9, limit: 12, fix: 3 })}`,
                unit: assets[currency]?.symbol?.toUpperCase(),
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
            <Layouts.Row gap={gap.row} style={gap.space.big} fix>
                <Elements.Text height={text.height} opacity={text.opacity} style={text.label} fit>
                    Available
                </Elements.Text>
                <Layouts.Row gap={gap.row} fix>
                    <Elements.Text height={text.height} align={"right"} style={text.setting}>
                        {Format(assets[0]?.balance as number, "currency", { unit: 9, limit: 12, fix: 3 })}
                    </Elements.Text>
                    <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                        {assets[0]?.symbol?.toUpperCase()}
                    </Elements.Text>
                </Layouts.Row>
            </Layouts.Row>
            <Controls.Input
                placeholder={"Price"}
                type={"currency"}
                align={"right"}
                value={order?.price}
                onChange={(e: any, v: any) => handleChangePrice(v)}
                onClick={() => isMobile && handlePricePad()}
                inputMode={isMobile ? "none" : undefined}
                left={{ children: <span>Price</span> }}
                right={{
                    width: gap.width,
                    children: <span style={{ justifyContent: "flex-start" }}>{assets[mode ? 0 : 1]?.symbol?.toUpperCase()}</span>,
                }}
                style={text.setting}
                lock={option === "market"}
            />
            <Controls.Input
                placeholder={"0"}
                type={"currency"}
                align={"right"}
                value={mode ? (currency === 0 ? order?.quantity : order?.amount) : currency === 0 ? order?.amount : order?.quantity}
                max={mode ? (currency === 0 ? maxQuantity() : available) : currency === 0 ? available : maxQuantity()}
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
                            responsive={isMobile}
                        />
                    ),
                }}
                style={text.setting}
            />
            <Controls.Range
                color={mode ? color.buy : color.sell}
                value={order?.amount! !== 0 ? (order?.amount! / available) * 100 : 0}
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
                            - {Format(order?.fees as number, "currency", { unit: 9, limit: 12, fix: 3 })}
                        </Elements.Text>
                        <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                            {assets[1]?.symbol?.toUpperCase()}
                        </Elements.Text>
                    </Layouts.Row>
                </Layouts.Row>
                <Layouts.Row gap={gap.row} style={gap.space.small} fix>
                    <Elements.Text height={text.height} opacity={text.opacity} style={text.label} fit>
                        Total
                    </Elements.Text>
                    <Layouts.Row gap={gap.row} fix>
                        <Elements.Text height={text.height} align={"right"} style={text.setting}>
                            {Format(order?.total as number, "currency", { unit: 9, limit: 12, fix: 3 })}
                        </Elements.Text>
                        <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                            {assets[1]?.symbol?.toUpperCase()}
                        </Elements.Text>
                    </Layouts.Row>
                </Layouts.Row>
            </Layouts.Col>
        </Layouts.Col>
    );
}
