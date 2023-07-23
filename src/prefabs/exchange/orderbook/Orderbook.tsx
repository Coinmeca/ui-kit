'use client';
import { Elements, Layouts } from "components";
import { AnimatePresence, motion } from "framer-motion";
import { Format, Sort } from "lib/utils";
import useTooltip from "hooks/useTooltip";
import Style, { Asks, Bids, Tick as Ticks } from "./Orderbook.styled";
import { Root } from "lib/style";

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
}

export interface Tick {
    price: number | string;
    balance: number | string;
}

export default function Ordrebook(props: Orderbook) {
    const { onTooltip, close } = useTooltip();

    const asks = props?.asks ? Sort(props?.asks, 'price', 'number', true) : [];
    const bids = props?.bids ? Sort(props?.bids, 'price', 'number', false) : [];

    const ask_max: number = (asks && asks?.length > 0 && Math.max(...asks?.map((o: Tick) => parseFloat(o?.balance?.toString())))) || 0;
    const bid_max: number = (bids && bids?.length > 0 && Math.max(...bids?.map((o: Tick) => parseFloat(o?.balance?.toString())))) || 0;

    const view = props?.view || 0;

    const handleAsk = (ask: Tick, k: number, e?: any) => {
        if (typeof props?.onClickAsk === "function") props?.onClickAsk(ask, k, e);
    };

    const handleBid = (bid: Tick, k: number, e?: any) => {
        if (typeof props?.onClickBid === "function") props?.onClickBid(bid, k, e);
    };

    const Tooltip = ({ tick }: { tick: Tick }) => {
        return <Layouts.Row gap={2} fix>
            <Layouts.Col gap={0.25}>
                <Elements.Text opacity={0.6}>Price:</Elements.Text>
                <Elements.Text opacity={0.6}>Balance:</Elements.Text>
            </Layouts.Col>
            <Layouts.Col gap={0.25}>
                <Elements.Text align={"right"}>{Format(tick?.price, 'currency', true)}</Elements.Text>
                <Elements.Text align={"right"}>{Format(tick?.balance, 'currency', true)}</Elements.Text>
            </Layouts.Col>
        </Layouts.Row>
    }

    const handleAskHover = (ask: Tick, e: any) => {
        onTooltip(<Elements.Tooltip e={e} color={'red'} vertical={'top'} horizon={'left'} padding={1} style={{ border: `1px solid rgb(${Root.Color('red')})` }}>
            <Tooltip tick={ask} />
        </Elements.Tooltip>);
    }
    const handleBidHover = (bid: Tick, e: any) => {
        onTooltip(<Elements.Tooltip e={e} color={'green'} vertical={'top'} horizon={'right'} padding={1} style={{ border: `1px solid rgb(${Root.Color('green')})` }}>
            <Tooltip tick={bid} />
        </Elements.Tooltip>);
    }

    return (
        <Style $responsive={props?.responsive}>
            <Asks $show={view === 0 || view === 1}>
                {asks && asks?.length > 0 ? (
                    <AnimatePresence mode="popLayout" presenceAffectsLayout>
                        {asks?.map((ask: Tick, k: number) => (
                            <Ticks key={k} onClick={(e: any) => handleAsk(ask, k, e)} onHoverStart={(e: any) => handleAskHover(ask, e)} onHoverEnd={close}
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
                                                backgroundSize: `${(parseFloat(ask?.balance.toString()) / ask_max) * 100 > 100 ? "100" : (parseFloat(ask?.balance.toString()) / ask_max) * 100 < 0 ? "0" : (parseFloat(ask?.balance.toString()) / ask_max) * 100
                                                    }% 100%`
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
                        style={{ direction: 'ltr' }}
                    >
                        <Elements.Text type={'desc'} opacity={0.6}>
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
                            <Ticks key={k} onClick={(e: any) => handleBid(bid, e)} onHoverStart={(e: any) => handleBidHover(bid, e)} onHoverEnd={close}
                                as={motion.div}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.3 }}>
                                <div>
                                    <div>
                                        <div>
                                            <span>{Format(bid?.balance, "currency", true)}</span>
                                        </div>
                                        <div
                                            style={{
                                                backgroundSize: `${(parseFloat(bid?.balance.toString()) / bid_max) * 100 > 100 ? "100" : (parseFloat(bid?.balance.toString()) / bid_max) * 100 < 0 ? "0" : (parseFloat(bid?.balance.toString()) / bid_max) * 100
                                                    }% 100%`
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
                        <Elements.Text type={'desc'} opacity={0.6}>
                            There is no bids.
                        </Elements.Text>
                    </motion.div>
                )}
            </Bids>
        </Style >
    );
}
