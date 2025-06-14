"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { Elements, Layouts } from "components";
import { usePortal, useWindowSize } from "hooks";
import { Root } from "lib/style";
import { format, sort } from "lib/utils";
import { Tick } from "./Tick";
import Style, { Asks, Bids, NoData } from "./Orderbook.styled";
import Tooltip from "./Tooltip";

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

export default function Ordrebook(props: Orderbook) {
    const { windowSize } = useWindowSize();
    const [handleTooltip, closeTooltip] = usePortal(Tooltip, {
        horizon: "center",
        fit: true,
    });

    const asks = props?.asks ? sort(props?.asks, "price", "number", true) : [];
    const bids = props?.bids ? sort(props?.bids, "price", "number", false) : [];

    const ask_max: number =
        (asks && asks?.length > 0 && Math.max(...asks?.map((o: Tick) => parseFloat(format(o?.balance, "number"))))) || 0;
    const bid_max: number =
        (bids && bids?.length > 0 && Math.max(...bids?.map((o: Tick) => parseFloat(format(o?.balance, "number"))))) || 0;

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
                (a: Tick, b: Tick) =>
                    parseFloat((a || 0).toString()) +
                    parseFloat((b?.price || 0).toString()) * parseFloat((b?.balance || 0).toString()),
                0,
            );
        const sum = [...asks]
            .splice(0, i + 1)
            .reduce((a: Tick, b: Tick) => parseFloat((a || 0).toString()) + parseFloat((b?.balance || 0).toString()), 0);
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
                (a: Tick, b: Tick) =>
                    parseFloat((a || 0).toString()) +
                    parseFloat((b?.price || 0).toString()) * parseFloat((b?.balance || 0).toString()),
                0,
            );
        const sum = [...bids]
            .splice(0, i + 1)
            .reduce((a: Tick, b: Tick) => parseFloat((a || 0).toString()) + parseFloat((b?.balance || 0).toString()), 0);
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
            {asks && asks?.length > 0 ? (
                <Asks $show={view === 0 || view === 1} onMouseLeave={() => closeTooltip()}>
                    <AnimatePresence mode="popLayout" presenceAffectsLayout>
                        {asks?.map((ask: Tick, k: number) => (
                            <Tick
                                price={ask?.price}
                                balance={ask?.balance}
                                max={ask_max}
                                onClick={(e) => handleAsk(ask, e)}
                                onMouseEnter={(e) => handleAskHover(ask, k, e)}
                            />
                        ))}
                    </AnimatePresence>
                </Asks>
            ) : (
                <NoData
                    as={motion.div}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3 }}>
                    <Elements.Text type={"desc"} opacity={0.6}>
                        There is no asks.
                    </Elements.Text>
                </NoData>
            )}
            <Layouts.Divider responsive={props?.responsive?.device} style={{ ...(view !== 0 && { display: "none" }) }} />
            {bids && bids?.length > 0 ? (
                <Bids
                    $show={view === 0 || view === 2}
                    onMouseEnter={(e) => e?.stopPropagation()}
                    onMouseLeave={() => closeTooltip()}>
                    <AnimatePresence mode="popLayout">
                        {bids?.map((bid: Tick, k: number) => (
                            <Tick
                                price={bid?.price}
                                balance={bid?.balance}
                                max={bid_max}
                                onClick={(e) => handleBid(bid, e)}
                                onMouseEnter={(e) => handleBidHover(bid, k, e)}
                            />
                        ))}
                    </AnimatePresence>
                </Bids>
            ) : (
                <NoData
                    as={motion.div}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3 }}>
                    <Elements.Text type={"desc"} opacity={0.6}>
                        There is no bids.
                    </Elements.Text>
                </NoData>
            )}
        </Style>
    );
}
