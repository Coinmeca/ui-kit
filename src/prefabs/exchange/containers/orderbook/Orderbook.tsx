"use client";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Elements, Layouts } from "components";
import { useWindowSize, usePortal } from "hooks";
import { Format, Sort, parseNumber } from "lib/utils";
import { Root } from "lib/style";
import { Token } from "types";
import Tooltip from "./Tooltip";
import Style, { NoData, Asks, Bids, Tick as Ticks } from "./Orderbook.styled";

export interface Orderbook {
    asks?: Tick[];
    bids?: Tick[];
    view?: number;
    base?: Token;
    quote?: Token;
    onClickAsk?: Function;
    onClickBid?: Function;
    bookOrder?: boolean;
    responsive?: {
        device: "desktop" | "laptop" | "tablet" | "mobile";
        vertical?: boolean;
    };
    guidance?: boolean;
}

export interface Tick {
    price: number | string;
    balance: number | string;
}

export default function Ordrebook(props: Orderbook) {
    const { windowSize } = useWindowSize();

    const [handleTooltip, closeTooltip] = usePortal(Tooltip, {
        horizon: "center",
        fit: true,
    });

    const asks = props?.asks
        ? Sort(
              props?.asks?.map((t: Tick) => ({ price: parseNumber(t?.price), balance: parseNumber(t?.balance) })),
              "price",
              "number",
              true
          )
        : [];
    const bids = props?.bids
        ? Sort(
              props?.bids?.map((t: Tick) => ({ price: parseNumber(t?.price), balance: parseNumber(t?.balance) })),
              "price",
              "number",
              false
          )
        : [];

    const ask_max: number = (asks && asks?.length > 0 && Math.max(...asks?.map((o: Tick) => parseNumber(o?.balance)))) || 0;
    const bid_max: number = (bids && bids?.length > 0 && Math.max(...bids?.map((o: Tick) => parseNumber(o?.balance)))) || 0;

    const view = props?.view || 0;
    const guidance = props?.guidance || false;

    useEffect(() => {
        return () => {
            closeTooltip();
        };
    }, []);

    const handleAsk = (ask: Tick, k: number, e?: any) => {
        if (typeof props?.onClickAsk === "function") props?.onClickAsk(ask, k, e);
    };

    const handleBid = (bid: Tick, k: number, e?: any) => {
        if (typeof props?.onClickBid === "function") props?.onClickBid(bid, k, e);
    };

    const handleAskHover = (ask: Tick, i: number, e: any) => {
        if (!guidance) return;
        const k = [...asks]
            .splice(0, i + 1)
            .reduce((a: number, b: Tick) => a + parseNumber((b?.balance || 0).toString()) * parseNumber((b?.price || 0).toString()), 0);
        const sum = [...asks].splice(0, i + 1).reduce((a: Tick, b: Tick) => parseNumber((a || 0).toString()) + parseNumber((b?.balance || 0).toString()), 0);
        handleTooltip(null, {
            vertical: "top",
            color: "red",
            e: e,
            base: props?.base?.symbol,
            quote: props?.quote?.symbol,
            price: k / sum,
            amount: k,
            balance: sum,
            fit: true,
        });
    };

    const handleBidHover = (bid: Tick, i: number, e: any) => {
        if (!guidance) return;
        const k = [...bids]
            .splice(0, i + 1)
            .reduce((a: number, b: Tick) => a + parseNumber((b?.balance || 0).toString()) / parseNumber((b?.price || 0).toString()), 0);
        const sum = [...bids].splice(0, i + 1).reduce((a: Tick, b: Tick) => parseNumber((a || 0).toString()) + parseNumber((b?.balance || 0).toString()), 0);
        handleTooltip(null, {
            vertical: windowSize.width > Root.Device.Mobile ? "bottom" : "top",
            color: "green",
            e: e,
            base: props?.base?.symbol,
            quote: props?.quote?.symbol,
            price: sum / k,
            amount: sum,
            balance: k,
            fit: true,
        });
    };

    return (
        <Style $responsive={props?.responsive} $guidance={guidance}>
            {asks && asks?.length > 0 ? (
                <Asks $show={view === 0 || view === 1} onMouseLeave={() => closeTooltip()}>
                    <AnimatePresence mode="popLayout" presenceAffectsLayout>
                        {asks?.map((ask: Tick, k: number) => (
                            <Ticks
                                key={k}
                                onClick={(e: any) => handleAsk(ask, k, e)}
                                onMouseEnter={(e: any) => handleAskHover(ask, k, e)}
                                as={motion.div}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                layout
                            >
                                <div>
                                    <div>
                                        <div>
                                            <span>{Format(ask?.balance, "currency", { unit: 9, limit: 12, fix: 3 })}</span>
                                        </div>
                                        <div
                                            style={{
                                                backgroundSize: `${
                                                    (parseNumber(ask?.balance.toString()) / ask_max) * 100 > 100
                                                        ? "100"
                                                        : (parseNumber(ask?.balance.toString()) / ask_max) * 100 < 0
                                                        ? "0"
                                                        : (parseNumber(ask?.balance.toString()) / ask_max) * 100
                                                }% 100%`,
                                            }}
                                        >
                                            <span>{Format(ask?.price, "currency", { unit: 9, limit: 12, fix: 3 })}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <div>
                                    <Controls.Button>Order</Controls.Button>
                                </div> */}
                            </Ticks>
                        ))}
                    </AnimatePresence>
                </Asks>
            ) : (
                <NoData
                    as={motion.div}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Elements.Text type={"desc"} opacity={0.6}>
                        There is no asks.
                    </Elements.Text>
                </NoData>
            )}
            <Layouts.Divider responsive={props?.responsive?.device} style={{ ...(view !== 0 && { display: "none" }) }} />
            {bids && bids?.length > 0 ? (
                <Bids $show={view === 0 || view === 2} onMouseEnter={(e) => e?.stopPropagation()} onMouseLeave={() => closeTooltip()}>
                    <AnimatePresence mode="popLayout">
                        {bids?.map((bid: Tick, k: number) => (
                            <Ticks
                                key={k}
                                onClick={(e: any) => handleBid(bid, e)}
                                onMouseEnter={(e: any) => handleBidHover(bid, k, e)}
                                as={motion.div}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                layout
                            >
                                <div onMouseEnter={(e) => e?.stopPropagation()}>
                                    <div>
                                        <div>
                                            <span>{Format(bid?.balance, "currency", { unit: 9, limit: 12, fix: 3 })}</span>
                                        </div>
                                        <div
                                            style={{
                                                backgroundSize: `${
                                                    (parseNumber(bid?.balance) / bid_max) * 100 > 100
                                                        ? "100"
                                                        : (parseNumber(bid?.balance) / bid_max) * 100 < 0
                                                        ? "0"
                                                        : (parseNumber(bid?.balance) / bid_max) * 100
                                                }% 100%`,
                                            }}
                                        >
                                            <span>{Format(bid?.price, "currency", { unit: 9, limit: 12, fix: 3 })}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <div>
                                    <Controls.Button>Order</Controls.Button>
                                </div> */}
                            </Ticks>
                        ))}
                    </AnimatePresence>
                </Bids>
            ) : (
                <NoData
                    as={motion.div}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Elements.Text type={"desc"} opacity={0.6}>
                        There is no bids.
                    </Elements.Text>
                </NoData>
            )}
        </Style>
    );
}
