"use client";
import { useEffect, useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { Exchange } from "prefabs";
import { useVault } from "prefabs/treasury/vault/hooks";
import { usePortal, useMobile } from "hooks";
import { Format, parseNumber } from "lib/utils";
import type { Token } from "types/web3";

export interface TradeControl {
    mode: boolean;
    assets: Token[];
    price: number | string;
    fee: number;
    option?: "market" | "limit";
    onChange?: Function;
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

export default function Trade(props: TradeControl) {
    const { isMobile } = useMobile();
    const { t } = useTranslate();

    const mode = typeof props?.mode === "undefined" ? true : props?.mode;
    const assets = props?.assets || [];
    const available = parseNumber(assets[0]?.balance || 0);

    const [currency, setCurrency] = useState(0);

    const { order, price, amount, quantity } = useVault(
        {
            base: assets[0]?.address,
            quote: assets[1]?.address,
            price: parseNumber(props?.price || 0),
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
            closeAmountPad();
        };
    }, []);

    useEffect(() => {
        if (typeof props?.onChange === "function") props?.onChange(order);
    }, [order]);

    useEffect(() => {
        price(parseNumber(props?.price || 0));
    }, [props?.price]);

    const handleChangeQuantity = (a: number | string) => {
        mode ? quantity(parseNumber(a)) : amount(parseNumber(a));
    };

    const handleChangeRange = (v: number) => {
        if (available > 0)
            currency === 0
                ? quantity(((parseNumber(available) / order.price) * parseNumber(v)) / 100)
                : amount((parseNumber(available) * parseNumber(v)) / 100);
    };

    const pricePosition = order.price === 0 ? 0 : (1 - parseFloat(props?.price?.toString()) / order.price) * 100;

    const [handleAmountPad, closeAmountPad] = usePortal(
        <Exchange.BottomSheets.OrderPad
            label={currency === 0 ? "Quantity" : "Amount"}
            placeholder={"0"}
            value={currency === 0 ? order.quantity : order.amount}
            unit={[...assets].reverse()[currency]?.symbol?.toUpperCase()}
            sub={{
                value: `= ${Format(currency === 0 ? order.amount : order.quantity || 0, "currency", {
                    unit: 9,
                    limit: 12,
                    fix: 3,
                })}`,
                unit: assets[currency]?.symbol?.toUpperCase(),
            }}
            button={{
                color: mode ? color.buy : color.sell,
                children: mode ? "BUY" : "SELL",
                onClick: () => closeAmountPad(),
            }}
            onChange={(e: any, v: any) => handleChangeQuantity(v)}
            onClose={() => closeAmountPad()}
        />
    );

    return (
        <Layouts.Col gap={gap.col.big} style={{ paddingTop: `${gap.col.small}em` }}>
            <Layouts.Row gap={gap.row} style={gap.space.big} fix>
                <Elements.Text height={text.height} opacity={text.opacity} style={text.label} fit>
                    {t("treasury.vault.trade.available")}
                </Elements.Text>
                <Layouts.Row gap={gap.row} fix>
                    <Elements.Text height={text.height} align={"right"} style={text.setting}>
                        {Format(assets[0]?.balance as number, "currency", {
                            unit: 9,
                            limit: 12,
                            fix: 3,
                        })}
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
                value={Format(order.price, "currency")}
                left={{ children: <span>{t("treasury.vault.trade.rate")}</span> }}
                right={{
                    width: gap.width,
                    children: <span style={{ justifyContent: "flex-start" }}>{assets[1]?.symbol?.toUpperCase()}</span>,
                }}
                style={text.setting}
                lock
            />
            <Controls.Input
                placeholder={"0"}
                type={"currency"}
                align={"right"}
                value={""}
                min={0}
                max={available}
                onChange={(e: any, v: any) => handleChangeQuantity(v)}
                onClick={() => isMobile && handleAmountPad()}
                inputMode={isMobile ? "none" : undefined}
                left={{
                    children: <span>{currency === 0 ? "Qunatity" : "Amount"}</span>,
                }}
                right={{
                    width: gap.width,
                    children: (
                        // <Controls.Dropdown
                        //     option={currencies[currency]}
                        //     options={currencies}
                        //     onClickItem={(e: any, v: any, k: number) => {
                        //         setCurrency(k);
                        //     }}
                        // />
                        <Elements.Text style={{ justifyContent: "flex-start" }}>{assets[0]?.symbol}</Elements.Text>
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
                            -{" "}
                            {Format(order.fees as number, "currency", {
                                unit: 9,
                                limit: 12,
                                fix: 3,
                            })}
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
                            {Format(order.total as number, "currency", {
                                unit: 9,
                                limit: 12,
                                fix: 3,
                            })}
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
