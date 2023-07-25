"use client";
import Style, { Asks, Bids, Tick as Ticks } from "./Orderbook.styled";
import { Elements, Layouts } from "components";
import { AnimatePresence, motion } from "framer-motion";
import { Format, Sort } from "lib/utils";
import { Root } from "lib/style";
import useWindowSize from "hooks/useWindowSize";
import useTooltip from "hooks/useTooltip";

export interface Orderbook {
    asks?: Tick[];
    bids?: Tick[];
    view?: number;
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
    const { onTooltip, closeTooltip } = useTooltip();

    const asks = props?.asks ? Sort(props?.asks, "price", "number", true) : [];
    const bids = props?.bids ? Sort(props?.bids, "price", "number", false) : [];

    const ask_max: number = (asks && asks?.length > 0 && Math.max(...asks?.map((o: Tick) => parseFloat(o?.balance?.toString())))) || 0;
    const bid_max: number = (bids && bids?.length > 0 && Math.max(...bids?.map((o: Tick) => parseFloat(o?.balance?.toString())))) || 0;

    const view = props?.view || 0;
    const guidance = props?.guidance || false;

    const handleAsk = (ask: Tick, k: number, e?: any) => {
        if (typeof props?.onClickAsk === "function") props?.onClickAsk(ask, k, e);
    };

    const handleBid = (bid: Tick, k: number, e?: any) => {
        if (typeof props?.onClickBid === "function") props?.onClickBid(bid, k, e);
    };

    const Tooltip = ({ tick }: { tick: Tick }) => {
        return (
            <Layouts.Col gap={0.25}>
                <Layouts.Row gap={0} fix>
                    <Elements.Text opacity={0.6} fit>
                        Avg Price:
                    </Elements.Text>
                    <Elements.Text align={"right"}>{Format(tick?.price, "currency", true, 4)}</Elements.Text>
                </Layouts.Row>
                <Layouts.Row gap={0} fix>
                    <Elements.Text opacity={0.6} fit>
                        Sum Amount:
                    </Elements.Text>
                    <Elements.Text align={"right"}>
                        {Format(parseFloat(tick?.balance?.toString()) / parseFloat(tick?.price?.toString()), "currency", true, 4)}
                    </Elements.Text>
                </Layouts.Row>
                <Layouts.Row gap={0} fix>
                    <Elements.Text opacity={0.6} fit>
                        Sum Balance:
                    </Elements.Text>
                    <Elements.Text align={"right"}>{Format(tick?.balance, "currency", true, 4)}</Elements.Text>
                </Layouts.Row>
            </Layouts.Col>
        );
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
        onTooltip(
            <Elements.Tooltip
                e={e}
                color={"red"}
                vertical={"top"}
                horizon={"center"}
                // horizon={windowSize.width > Root.Device.Mobile ? 'center' : 'left'}
                padding={1}
                style={{ border: `1px solid rgb(${Root.Color("red")})` }}
                fill
            >
                <Tooltip tick={{ price: k / sum, balance: sum }} />
            </Elements.Tooltip>
        );
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
        onTooltip(
            <Elements.Tooltip
                e={e}
                color={"green"}
                vertical={windowSize.width > Root.Device.Mobile ? "bottom" : "top"}
                horizon={"center"}
                // horizon={windowSize.width > Root.Device.Mobile ? 'center' : 'right'}
                padding={1}
                style={{ border: `1px solid rgb(${Root.Color("green")})` }}
                fill
            >
                <Tooltip tick={{ price: k / sum, balance: sum }} />
            </Elements.Tooltip>
        );
    };

    return (
        <Style $responsive={props?.responsive} $guidance={guidance}>
            <Asks $show={view === 0 || view === 1}>
                {asks && asks?.length > 0 ? (
                    <AnimatePresence mode="popLayout" presenceAffectsLayout>
                        {asks?.map((ask: Tick, k: number) => (
                            <Ticks
                                key={k}
                                onClick={(e: any) => handleAsk(ask, k, e)}
                                onMouseEnter={(e: any) => handleAskHover(ask, k, e)}
                                onMouseLeave={closeTooltip}
                                as={motion.div}
                                layout
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.3 }}
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
            <Bids $show={view === 0 || view === 2}>
                {bids && bids?.length > 0 ? (
                    <AnimatePresence>
                        {bids?.map((bid: Tick, k: number) => (
                            <Ticks
                                key={k}
                                onClick={(e: any) => handleBid(bid, e)}
                                onHoverStart={(e: any) => handleBidHover(bid, k, e)}
                                onHoverEnd={closeTooltip}
                                as={motion.div}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div>
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
