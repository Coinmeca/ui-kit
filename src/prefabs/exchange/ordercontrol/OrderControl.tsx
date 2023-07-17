"use client";
import { useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { Token } from "types/web3";
import useWindowSize from "hooks/useWindowSize";
import { Format } from "lib/utils";
import { BottomSheets } from "containers";
import useBottomSheet from "hooks/useBottomSheet";
import useMobile from "hooks/useMobile";

export interface OrderControl {
    base: Token;
    quote: Token;
    price: number | string;
    option?: "market" | "limit";
    onClickBuy?: Function;
    onClickSell?: Function;
    responsive?: number;
}

export default function OrderControl(props: OrderControl) {
    const windowSize = useWindowSize();
    const { active, open, close } = useBottomSheet(false);
    const { isMobile } = useMobile();

    const [mode, setMode] = useState(true);
    const price = Format(props?.price, "currency", true) || 0;
    const symbol = { base: props?.base?.symbol?.toUpperCase() || "", quote: props?.quote?.symbol?.toUpperCase() || "" };

    const option = props?.option || "market";
    const responsive = props?.responsive || 0;

    const onClickBuy = (e: any) => {
        alert("buy");
    };
    const onClickSell = (e: any) => {
        alert("sell");
    };

    const color = {
        buy: "green",
        sell: "red",
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
        height: 1,
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
                                <Layouts.Col gap={gap.col.small}>
                                    <Layouts.Row gap={gap.row} style={gap.space.big} fix>
                                        <Elements.Text height={text.height} opacity={text.opacity} style={text.label}>
                                            Available
                                        </Elements.Text>
                                        <Layouts.Row gap={gap.row} fix>
                                            <Elements.Text height={text.height} align={"right"} style={text.setting}>
                                                {props?.quote?.balance}
                                            </Elements.Text>
                                            <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                                                {symbol?.quote}
                                            </Elements.Text>
                                        </Layouts.Row>
                                    </Layouts.Row>
                                    <Controls.Input
                                        placeholder={"Price"}
                                        type={"currency"}
                                        align={"right"}
                                        value={price}
                                        left={{ width: gap.width - 6, children: <span>Price</span> }}
                                        right={{ width: gap.width, children: <span style={{ justifyContent: "flex-start" }}>{symbol?.quote}</span> }}
                                        style={text.setting}
                                        lock={option === "market"}
                                    />
                                    <Controls.Input
                                        placeholder={"0"}
                                        type={"currency"}
                                        align={"right"}
                                        value={""}
                                        left={{ width: gap.width - 6, children: <span>Amount</span> }}
                                        right={{
                                            width: gap.width,
                                            children: <Controls.Dropdown option={Object.values(symbol)[0]} options={Object.values(symbol)} />,
                                        }}
                                        style={text.setting}
                                        numberpad={{ open: open, active: isMobile ? active : false, children: <BottomSheets.Numberpads.Exchange active={active} onClose={close} /> }}
                                    />
                                    <Controls.Range color={color.buy} min={range.min} max={range.max} step={range.step} unit={range.unit} />
                                    <Layouts.Col gap={gap.col.big}>
                                        <Layouts.Row gap={gap.row} style={gap.space.small} fix>
                                            <Elements.Text height={text.height} opacity={text.opacity} style={text.label}>
                                                Fees
                                            </Elements.Text>
                                            <Layouts.Row gap={gap.row} fix>
                                                <Elements.Text height={text.height} align={"right"} style={text.setting}>
                                                    - 0.123456789
                                                </Elements.Text>
                                                <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                                                    {symbol?.base}
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </Layouts.Row>
                                        <Layouts.Row gap={gap.row} style={gap.space.small} fix>
                                            <Elements.Text height={text.height} opacity={text.opacity} style={text.label}>
                                                Total
                                            </Elements.Text>
                                            <Layouts.Row gap={gap.row} fix>
                                                <Elements.Text height={text.height} align={"right"} style={text.setting}>
                                                    9.87654321
                                                </Elements.Text>
                                                <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                                                    {symbol?.base}
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </Layouts.Row>
                                    </Layouts.Col>
                                </Layouts.Col>
                            ),
                        },
                        {
                            active: windowSize.width <= responsive ? mode === false : true,
                            style: { height: "max-content", overflow: "hidden" },
                            children: (
                                <Layouts.Col gap={gap.col.small}>
                                    <Layouts.Row gap={gap.row} style={gap.space.big} fix>
                                        <Elements.Text height={text.height} opacity={text.opacity} style={text.label}>
                                            Available
                                        </Elements.Text>
                                        <Layouts.Row gap={gap.row} fix>
                                            <Elements.Text height={text.height} align={"right"} style={text.setting}>
                                                {props?.base?.balance}
                                            </Elements.Text>
                                            <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                                                {symbol?.base}
                                            </Elements.Text>
                                        </Layouts.Row>
                                    </Layouts.Row>
                                    <Controls.Input
                                        placeholder={"Price"}
                                        type={"currency"}
                                        align={"right"}
                                        value={price}
                                        left={{ width: gap.width - 6, children: <span>Price</span> }}
                                        right={{ width: gap.width, children: <span style={{ justifyContent: "flex-start" }}>{symbol?.quote}</span> }}
                                        style={text.setting}
                                        lock={option === "market"}
                                    ></Controls.Input>
                                    <Controls.Input
                                        placeholder={"0"}
                                        type={"currency"}
                                        align={"right"}
                                        value={""}
                                        left={{ width: gap.width - 6, children: <span>Amount</span> }}
                                        right={{
                                            width: gap.width,
                                            children: <Controls.Dropdown option={Object.values(symbol).reverse()[1]} options={Object.values(symbol).reverse()} />,
                                        }}
                                        style={text.setting}
                                    />
                                    <Controls.Range color={color.sell} min={range.min} max={range.max} step={range.step} unit={range.unit} />
                                    <Layouts.Col gap={gap.col.big}>
                                        <Layouts.Row gap={gap.row} style={gap.space.small} fix>
                                            <Elements.Text height={text.height} opacity={text.opacity} style={text.label}>
                                                Fees
                                            </Elements.Text>
                                            <Layouts.Row gap={gap.row} fix>
                                                <Elements.Text height={text.height} align={"right"} style={text.setting}>
                                                    - 0.123456789
                                                </Elements.Text>
                                                <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                                                    {symbol?.quote}
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </Layouts.Row>
                                        <Layouts.Row gap={gap.row} style={gap.space.small} fix>
                                            <Elements.Text height={text.height} opacity={text.opacity} style={text.label}>
                                                Total
                                            </Elements.Text>
                                            <Layouts.Row gap={gap.row} fix>
                                                <Elements.Text height={text.height} align={"right"} style={text.setting}>
                                                    9.87654321
                                                </Elements.Text>
                                                <Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
                                                    {symbol?.quote}
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </Layouts.Row>
                                    </Layouts.Col>
                                </Layouts.Col>
                            ),
                        },
                    ]}
                />
                <Layouts.Row fix>
                    <Layouts.Row gap={windowSize.width <= responsive ? 2 : 6} fix>
                        <Controls.Button icon={"reset"} hide={windowSize.width > responsive} fit />
                        <Controls.Button
                            type={"solid"}
                            color={color.buy}
                            style={{ ...(windowSize.width <= responsive && mode === false ? { maxWidth: "4em" } : { maxWidth: "100%" }) }}
                            onClick={(e: any) => {
                                windowSize.width <= responsive && mode === false ? setMode(true) : onClickBuy(e);
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
                                windowSize.width <= responsive && mode ? setMode(false) : onClickSell(e);
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
