"use client";
import { useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { Token } from "types/web3";
import useWindowSize from "hooks/useWindowSize";

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

    const [mode, setMode] = useState(true);
    const price = props?.price || 0;
    const symbol = { base: props?.base?.symbol?.toUpperCase() || "", quote: props?.quote?.symbol?.toUpperCase() || "" };

    const option = props?.option || "market";
    const responsive = props?.responsive || 0;

    const onClickBuy = (e: any) => {
        alert("buy");
    };
    const onClickSell = (e: any) => {
        alert("sell");
    };

    return (
        <>
            <Layouts.Col gap={1}>
                <Layouts.Contents.SlideContainer
                    style={{ gap: "3em" }}
                    contents={[
                        {
                            active: windowSize.width <= responsive ? mode === true : true,
                            style: { height: "max-content", overflow: "hidden" },
                            children: (
                                <Layouts.Col gap={1}>
                                    <Layouts.Row style={{ padding: "0 0.5em" }} fix>
                                        <Elements.Text opacity={0.45} style={{ minWidth: "max-content" }}>
                                            Available
                                        </Elements.Text>
                                        <Layouts.Row fit fix>
                                            <Elements.Text style={{ fontFeatureSettings: `"tnum" on,"lnum" on` }}>{props?.quote?.balance}</Elements.Text>
                                            <Elements.Text opacity={0.45} style={{ width: "6em" }}>
                                                {symbol?.quote}
                                            </Elements.Text>
                                        </Layouts.Row>
                                    </Layouts.Row>
                                    <Controls.Input
                                        placeholder={"Price"}
                                        type={"currency"}
                                        align={"right"}
                                        value={price}
                                        left={{ width: 10, children: <span>Price</span> }}
                                        right={{ width: 16, children: <span style={{ justifyContent: "flex-start" }}>{symbol?.quote}</span> }}
                                        style={{ fontFeatureSetting: `"tnum" on, "lnum" on` }}
                                    ></Controls.Input>
                                    <Controls.Input
                                        placeholder={"Amount"}
                                        type={"currency"}
                                        align={"right"}
                                        value={""}
                                        left={{ width: 10, children: <span>Amount</span> }}
                                        right={{
                                            width: 16,
                                            children: <Controls.Dropdown option={Object.values(symbol)[0]} options={Object.values(symbol)} />,
                                        }}
                                        style={{ fontFeatureSetting: `"tnum" on, "lnum" on` }}
                                    />
                                    <Controls.Range color={"green"} min={0} max={100} unit={"%"} step={5} />
                                    <Layouts.Col gap={1}>
                                        <Layouts.Row style={{ padding: "0 0.5em" }} fix>
                                            <Elements.Text height={1} opacity={0.45} style={{ minWidth: "max-content" }}>
                                                Fees
                                            </Elements.Text>
                                            <Layouts.Row fit fix>
                                                <Elements.Text height={1} style={{ fontFeatureSettings: `"tnum" on,"lnum" on` }}>
                                                    - 0.123456789
                                                </Elements.Text>
                                                <Elements.Text height={1} opacity={0.45} style={{ width: "6em" }}>
                                                    {symbol?.base}
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </Layouts.Row>
                                        <Layouts.Row style={{ padding: "0 0.5em" }} fix>
                                            <Elements.Text height={1} opacity={0.45} style={{ minWidth: "max-content" }}>
                                                Total
                                            </Elements.Text>
                                            <Layouts.Row fit fix>
                                                <Elements.Text height={1} style={{ fontFeatureSettings: `"tnum" on,"lnum" on` }}>
                                                    9.87654321
                                                </Elements.Text>
                                                <Elements.Text height={1} opacity={0.45} style={{ width: "6em" }}>
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
                                <Layouts.Col gap={1}>
                                    <Layouts.Row style={{ padding: "0 0.5em" }} fix>
                                        <Elements.Text opacity={0.45} style={{ minWidth: "max-content" }}>
                                            Available
                                        </Elements.Text>
                                        <Layouts.Row fit fix>
                                            <Elements.Text>{props?.base?.balance}</Elements.Text>
                                            <Elements.Text opacity={0.45} style={{ width: "6em" }}>
                                                {symbol?.base}
                                            </Elements.Text>
                                        </Layouts.Row>
                                    </Layouts.Row>
                                    <Controls.Input
                                        placeholder={"Price"}
                                        type={"currency"}
                                        align={"right"}
                                        value={price}
                                        left={{ width: 10, children: <span>Price</span> }}
                                        right={{ width: 16, children: <span style={{ justifyContent: "flex-start" }}>{symbol?.quote}</span> }}
                                        style={{ fontFeatureSetting: `"tnum" on, "lnum" on` }}
                                    ></Controls.Input>
                                    <Controls.Input
                                        placeholder={"Amount"}
                                        type={"currency"}
                                        align={"right"}
                                        value={""}
                                        left={{ width: 10, children: <span>Amount</span> }}
                                        right={{
                                            width: 16,
                                            children: <Controls.Dropdown option={Object.values(symbol).reverse()[1]} options={Object.values(symbol).reverse()} />,
                                        }}
                                        style={{ fontFeatureSetting: `"tnum" on, "lnum" on` }}
                                    />
                                    <Controls.Range color={"red"} min={0} max={100} unit={"%"} step={5} />
                                    <Layouts.Col gap={1}>
                                        <Layouts.Row style={{ padding: "0 0.5em" }} fix>
                                            <Elements.Text height={1} opacity={0.45} style={{ minWidth: "max-content" }}>
                                                Fees
                                            </Elements.Text>
                                            <Layouts.Row fit fix>
                                                <Elements.Text height={1} style={{ fontFeatureSettings: `"tnum" on,"lnum" on` }}>
                                                    - 0.123456789
                                                </Elements.Text>
                                                <Elements.Text height={1} opacity={0.45} style={{ width: "6em" }}>
                                                    {symbol?.quote}
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </Layouts.Row>
                                        <Layouts.Row style={{ padding: "0 0.5em" }} fix>
                                            <Elements.Text height={1} opacity={0.45} style={{ minWidth: "max-content" }}>
                                                Total
                                            </Elements.Text>
                                            <Layouts.Row fit fix>
                                                <Elements.Text height={1} style={{ fontFeatureSettings: `"tnum" on,"lnum" on` }}>
                                                    9.87654321
                                                </Elements.Text>
                                                <Elements.Text height={1} opacity={0.45} style={{ width: "6em" }}>
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
                            color={"green"}
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
                            color={"red"}
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
