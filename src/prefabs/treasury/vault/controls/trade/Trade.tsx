"use client";
// import { useTranslate } from "hooks";
import { Controls, Elements, Layouts } from "components";
import { useMobile, usePortal } from "hooks";
import { format, parseNumber } from "lib/utils";
import { Exchange } from "prefabs";
import { useVault } from "prefabs/treasury/vault/hooks";
import { useEffect, useState } from "react";
import type { Asset } from "types";

export interface TradeControl {
    mode: boolean;
    assets: Asset[];
    price: number | string;
    ratio?: number | string;
    require?: number | string;
    locked?: number | string;
    weight?: number | string;
    need?: number | string;
    fee?: number | string;
    onChange?: Function;
    responsive?: number;
}

export interface Order {
    buy: string;
    sell: string;
    category?: number;
    price: number | string;
    amount?: number | string;
    quantity?: number | string;
    fees?: number | string;
}

export default function Trade(props: TradeControl) {
    const { isMobile } = useMobile();
    // const { t } = useTranslate();

    const mode = typeof props?.mode === "boolean" ? props?.mode : true;
    const assets = props?.assets || [];
    const available = parseNumber(assets[0]?.balance || 0);

    const [currency, setCurrency] = useState(0);

    const { order, price, amount } = useVault(
        {
            pay: assets[0],
            price: parseNumber(props?.price || 0),
            amount: 0,
            quantity: 0,
            fees: 0,
            total: 0,
        },
        {
            mode,
            ratio: parseNumber(props?.ratio || 0),
            require: parseNumber(props?.require || 0),
            locked: parseNumber(props?.locked || 0),
            weight: parseNumber(props?.weight || 0),
            need: parseNumber(props?.need || 0),
            fee: 0.01,
        },
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
        row: 4,
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

    const handleChangeAmount = (a: number | string) => {
        amount(parseNumber(a));
        // mode ? quantity(parseNumber(a)) : amount(parseNumber(a));
    };

    const handleChangeRange = (v: number) => {
        if (available > 0) amount(v === 0 ? 0 : (parseNumber(available) * parseNumber(v)) / 100);
        // mode
        // ? amount((parseNumber(available) * parseNumber(v)) / 100)
        // : amount((parseNumber(available) * parseNumber(v)) / 100)
    };

    const pricePosition = order.price === 0 ? 0 : (1 - parseFloat(props?.price?.toString()) / order.price) * 100;

    const [handleAmountPad, closeAmountPad] = usePortal(
        <Exchange.BottomSheets.OrderPad
            label={mode ? "Quantity" : "Amount"}
            placeholder={"0"}
            value={order.amount}
            unit={assets[currency]?.symbol}
            sub={{
                value: `= ${format(order.quantity || 0, "currency", {
                    unit: 9,
                    limit: 12,
                    fix: 3,
                })}`,
                unit: [...assets].reverse()[currency]?.symbol,
            }}
            button={{
                color: mode ? color.buy : color.sell,
                children: mode ? "DEP" : "WIT",
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
                    <Elements.Text height={text.height} align={"right"} style={{ maxWidth: "100%" }} fix>
                        {format(available as number, "currency", {
                            unit: 9,
                            limit: 12,
                            fix: 3,
                        })}
                    </Elements.Text>
                    <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                        {assets[0]?.symbol}
                    </Elements.Text>
                </Layouts.Row>
            </Layouts.Row>
            <Layouts.Row gap={0} style={{ background: "rgba(var(--white),var(--o003))", ...text.setting }} fix>
                <Layouts.Row style={{ padding: "1em" }} fit>
                    <Elements.Text opacity={0.6} fit>
                        Rate
                    </Elements.Text>
                </Layouts.Row>
                <Layouts.Row style={{ padding: "1em" }} gap={2} align="right" fix>
                    <Elements.Text opacity={0.3} fit>
                        1 :{" "}
                    </Elements.Text>
                    <Elements.Text fit>{order.price}</Elements.Text>
                </Layouts.Row>
                <Layouts.Row style={{ padding: "1em", maxWidth: "10em" }}>
                    <Elements.Text opacity={0.6}>{assets[1]?.symbol}</Elements.Text>
                </Layouts.Row>
            </Layouts.Row>
            {/* <Controls.Input
                placeholder={t('treasury.vault.trade.rate')}
                type={'currency'}
                align={'right'}
                value={order.price}
                left={{ children: <span>{t('treasury.vault.trade.rate')}</span> }}
                right={{
                    width: gap.width,
                    children: <span style={{ justifyContent: 'flex-start' }}>{assets[1]?.symbol}</span>,
                }}
                style={text.setting}
                lock
            /> */}
            <Controls.Input
                placeholder={"0"}
                type={"currency"}
                align={"right"}
                value={order.amount}
                min={0}
                max={available && available > 0 ? available : undefined}
                onChange={(e: any, v: any) => handleChangeAmount(v)}
                onClick={() => isMobile && handleAmountPad()}
                inputMode={isMobile ? "none" : undefined}
                left={{
                    children: <span>{currency === 0 ? "Amount" : "Quantity"}</span>,
                }}
                right={{
                    width: gap.width,
                    children: <Elements.Text style={{ justifyContent: "flex-start" }}>{assets[0]?.symbol}</Elements.Text>,
                }}
                style={text.setting}
            />
            <Controls.Range
                color={mode ? color.buy : color.sell}
                // value={(!available || available !== 0) ? currency === 0 ? (!order?.quantity || order?.quantity === 0) ? 0 : (order?.quantity / available) * 100 : (!order?.quantity || order?.quantity === 0) ? 0 : (order?.quantity / available) * 100 : 0}
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
                            {format(order.fees as number, "currency", {
                                unit: 9,
                                limit: 12,
                                fix: 3,
                            })}
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
                            {format(order.total as number, "currency", {
                                unit: 9,
                                limit: 12,
                                fix: 3,
                            })}
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
