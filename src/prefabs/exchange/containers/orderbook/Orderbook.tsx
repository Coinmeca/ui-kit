"use client";
import { useEffect } from "react";
import { Controls, Elements, Layouts } from "components";
import { AnimatePresence, motion } from "framer-motion";
import Tooltip from "./Tooltip";
import Style, { Asks, Bids, Tick as Ticks } from "./Orderbook.styled";
import { Format, Sort } from "lib/utils";
import { Root } from "lib/style";
import useWindowSize from "hooks/useWindowSize";
import usePortal from "hooks/usePortal";

export interface Orderbook {
    asks?: Tick[];
    bids?: Tick[];
    view?: number;
    base?: string;
    quote?: string;
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

    const asks = props?.asks ? Sort(props?.asks, "price", "number", true) : [];
    const bids = props?.bids ? Sort(props?.bids, "price", "number", false) : [];

    const ask_max: number = (asks && asks?.length > 0 && Math.max(...asks?.map((o: Tick) => parseFloat(o?.balance?.toString())))) || 0;
    const bid_max: number = (bids && bids?.length > 0 && Math.max(...bids?.map((o: Tick) => parseFloat(o?.balance?.toString())))) || 0;

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
            .reduce(
                (a: Tick, b: Tick) => parseFloat((a || 0).toString()) + parseFloat((b?.price || 0).toString()) * parseFloat((b?.balance || 0).toString()),
                0
            );
        const sum = [...asks].splice(0, i + 1).reduce((a: Tick, b: Tick) => parseFloat((a || 0).toString()) + parseFloat((b?.balance || 0).toString()), 0);
        handleTooltip(null, {
            vertical: "top",
            color: "red",
            e: e,
            base: props?.base,
            quote: props?.quote,
            price: k / sum,
            amount: k * sum,
            balance: sum,
            fit: true,
        });
    };

    const handleBidHover = (bid: Tick, i: number, e: any) => {
        if (!guidance) return;
        const k = [...bids]
            .splice(0, i + 1)
            .reduce(
                (a: Tick, b: Tick) => parseFloat((a || 0).toString()) + parseFloat((b?.price || 0).toString()) * parseFloat((b?.balance || 0).toString()),
                0
            );
        const sum = [...bids].splice(0, i + 1).reduce((a: Tick, b: Tick) => parseFloat((a || 0).toString()) + parseFloat((b?.balance || 0).toString()), 0);
        handleTooltip(null, {
            vertical: windowSize.width > Root.Device.Mobile ? "bottom" : "top",
            color: "green",
            e: e,
            base: props?.base,
            quote: props?.quote,
            price: k / sum,
            amount: k * sum,
            balance: sum,
            fit: true,
        });
    };

    return (
        <Style $responsive={props?.responsive} $guidance={guidance}>
            <Asks $show={view === 0 || view === 1} onMouseLeave={() => closeTooltip()}>
                {asks && asks?.length > 0 ? (
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
                                            <span>{Format(ask?.balance, "currency", true)}</span>
                                        </div>
                                        <div
                                            style={{
                                                backgroundSize: `${
                                                    (parseFloat(ask?.balance.toString()) / ask_max) * 100 > 100
                                                        ? "100"
                                                        : (parseFloat(ask?.balance.toString()) / ask_max) * 100 < 0
                                                        ? "0"
                                                        : (parseFloat(ask?.balance.toString()) / ask_max) * 100
                                                }% 100%`,
                                            }}
                                        >
                                            <span>{Format(ask?.price, "currency", true)}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <div>
                                    <Controls.Button>Order</Controls.Button>
                                </div> */}
                            </Ticks>
                        ))}
                    </AnimatePresence>
                ) : (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ direction: "ltr" }}
                    >
                        <Elements.Text type={"desc"} opacity={0.6}>
                            There is no asks.
                        </Elements.Text>
                    </motion.div>
                )}
            </Asks>
            <Layouts.Divider responsive={props?.responsive?.device} style={{ ...(view !== 0 && { display: "none" }) }} />
            <Bids $show={view === 0 || view === 2} onMouseEnter={(e) => e?.stopPropagation()} onMouseLeave={() => closeTooltip()}>
                {bids && bids?.length > 0 ? (
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
                                            <span>{Format(bid?.balance, "currency", true)}</span>
                                        </div>
                                        <div
                                            style={{
                                                backgroundSize: `${
                                                    (parseFloat(bid?.balance.toString()) / bid_max) * 100 > 100
                                                        ? "100"
                                                        : (parseFloat(bid?.balance.toString()) / bid_max) * 100 < 0
                                                        ? "0"
                                                        : (parseFloat(bid?.balance.toString()) / bid_max) * 100
                                                }% 100%`,
                                            }}
                                        >
                                            <span>{Format(bid?.price, "currency", true)}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <div>
                                    <Controls.Button>Order</Controls.Button>
                                </div> */}
                            </Ticks>
                        ))}
                    </AnimatePresence>
                ) : (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Elements.Text type={"desc"} opacity={0.6}>
                            There is no bids.
                        </Elements.Text>
                    </motion.div>
                )}
            </Bids>
        </Style>
    );
}
