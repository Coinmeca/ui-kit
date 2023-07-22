"use client";
import { useEffect, useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { Token } from "types/web3";
import { Format } from "lib/utils";
import { Exchange } from "prefabs";
import useBottomSheet from "hooks/useBottomSheet";
import useMobile from "hooks/useMobile";
import useOrder from "hooks/useOrder";

export interface OrderControl {
    mode: boolean;
    assets: Token[]
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

export default function Order(props: OrderControl) {
    const { active, open, close } = useBottomSheet();
    const { isMobile } = useMobile();

    const mode = typeof props?.mode === 'undefined' ? true : props?.mode;
    const assets = props?.assets || [];
    const available = Format(assets[0]?.balance || 0, 'number', true) as number;

    const option = props?.option || "market";
    const [currency, setCurrency] = useState(mode ? 0 : 1);

    const { order, price, amount, quantity } = useOrder({
        base: assets[0]?.address,
        quote: assets[1]?.address,
        price: Format(props?.price || 1, 'number', true) as number,
        amount: 0,
        quantity: 0,
        fees: 0,
        total: 0,
    }, available, 0.01, mode);

    const handleChangePrice = (p: number | string) => {
        price(Format(p, 'number', true) as number);
    }

    const handleChangeAmount = (a: number | string) => {
        currency === 0 ? quantity(Format(a, 'number', true) as number) : amount(Format(a, 'number', true) as number)
    }

    const handleChangeRange = (v: number) => {
        if (available > 0) currency === 0 ? quantity(((Format(available, 'number', true) as number) / order.price) * (Format(v, 'number', true) as number) / 100) : amount((Format(available, 'number', true) as number) * (Format(v, 'number', true) as number) / 100);
    }

    useEffect(() => {
        if (typeof props?.onChange === 'function') props?.onChange(order);
    }, [order])

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
        <Layouts.Col gap={gap.col.small}>
            <Layouts.Row gap={gap.row} style={gap.space.big} fix>
                <Elements.Text height={text.height} opacity={text.opacity} style={text.label}>
                    Available
                </Elements.Text>
                <Layouts.Row gap={gap.row} fix>
                    <Elements.Text height={text.height} align={"right"} style={text.setting}>
                        {assets[0]?.balance}
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
                value={order.price}
                onChange={(e: any, v: any) => handleChangePrice(v)}
                left={{ width: gap.width - 6, children: <span>Price</span> }}
                right={{ width: gap.width, children: <span style={{ justifyContent: "flex-start" }}>{assets[0]?.symbol?.toUpperCase()}</span> }}
                style={text.setting}
                lock={option === "market"}
                numberpad={{ open: open, children: <Exchange.BottomSheets.OrderPad label={'Price'} active={isMobile ? active : false} placeholder={order.price} value={order.price} button={{ children: "NEXT" }} onChange={(e: any, v: any) => handleChangePrice(v)} onClose={close} /> }}
            />
            <Controls.Input
                placeholder={"0"}
                type={"currency"}
                align={"right"}
                value={currency === 0 ? order.quantity : order.amount}
                onChange={(e: any, v: any) => handleChangeAmount(v)}
                left={{ width: gap.width - 6, children: <span>Amount</span> }}
                right={{
                    width: gap.width,
                    children: <Controls.Dropdown option={[...assets].reverse()[currency]?.symbol?.toUpperCase()} options={[assets[0]?.symbol.toUpperCase(), assets[1]?.symbol.toUpperCase()].reverse()} onClickItem={(e: any, v: any, k: number) => { console.log(k); console.log(assets); setCurrency(k) }} />,
                }}
                style={text.setting}
                numberpad={{ open: open, children: <Exchange.BottomSheets.OrderPad active={active} label={currency === 0 ? 'Quantity' : 'Amount'} placeholder={'0'} value={currency === 0 ? order.quantity : order.amount} unit={[...assets].reverse()[currency]?.symbol?.toUpperCase()} sub={{ value: `= ${Format(currency === 0 ? order.amount : order.quantity || 0, 'currency', true)}`, unit: assets[currency]?.symbol?.toUpperCase() }} button={{ color: "green", children: "BUY" }} onChange={(e: any, v: any) => handleChangeAmount(v)} onClose={close} /> }}
            />
            <Controls.Range color={mode ? color.buy : color.sell} value={(order.amount / available) * 100} min={range.min} max={range.max} step={range.step} unit={range.unit} onChange={(v: any, p: number) => handleChangeRange(p)} />
            <Layouts.Col gap={gap.col.big}>
                <Layouts.Row gap={gap.row} style={gap.space.small} fix>
                    <Elements.Text height={text.height} opacity={text.opacity} style={text.label}>
                        Fees
                    </Elements.Text>
                    <Layouts.Row gap={gap.row} fix>
                        <Elements.Text height={text.height} align={"right"} style={text.setting}>
                            - {order.fees}
                        </Elements.Text>
                        <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                            {assets[1]?.symbol?.toUpperCase()}
                        </Elements.Text>
                    </Layouts.Row>
                </Layouts.Row>
                <Layouts.Row gap={gap.row} style={gap.space.small} fix>
                    <Elements.Text height={text.height} opacity={text.opacity} style={text.label}>
                        Total
                    </Elements.Text>
                    <Layouts.Row gap={gap.row} fix>
                        <Elements.Text height={text.height} align={"right"} style={text.setting}>
                            {order.total}
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
