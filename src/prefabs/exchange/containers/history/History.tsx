"use client";

import { Elements, Layouts } from "components";
import { Tick } from "../orderbook/Orderbook.styled";
import { AnimatePresence, motion } from "framer-motion";
import { Format } from "lib/utils";

export interface History {
    data?: MarketHistory[];
    view?: number;
}

export interface MarketHistory {
    time: number | string;
    type: "buy" | "sell";
    price: number | string;
    quantity: number | string;
}

export default function History(props: History) {
    const view = props?.view || 0;
    const data = props?.data?.filter((f: MarketHistory) => (view === 1 ? f?.type === "sell" : view === 2 ? f?.type === "buy" : f)) || [];
    const max: number =
        (data && data?.length > 0 && Math.max(...data?.map((d: MarketHistory) => Format(d?.quantity?.toString(), "number", true) as number))) || 0;

    return (
        <Layouts.Contents.InnerContent scroll>
            <AnimatePresence key="trades" mode="popLayout">
                {data && data?.length > 0 ? (
                    data?.map((d: MarketHistory, k: number) => (
                        <Tick
                            key={d?.time}
                            // onClick={(e: any) => handleBid(bid, e)}
                            // onMouseEnter={(e: any) => handleBidHover(bid, k, e)}
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
                                        <span style={{ left: 0, minWidth: "max-content" }}>{(Format(d?.time, "date", true) as string)?.split(" ")[1]}</span>
                                    </div>
                                    <div
                                        style={{
                                            paddingRight: "0.5em",
                                            backgroundImage: `linear-gradient(rgba(var(--${d?.type === "buy" ? "green" : "red"}),0.15),rgba(var(--${
                                                d?.type === "buy" ? "green" : "red"
                                            }),0.15))`,
                                            backgroundSize: `${
                                                ((Format(d?.quantity.toString(), "number", true) as number) / max) * 100 > 100
                                                    ? "100"
                                                    : ((Format(d?.quantity?.toString(), "number", true) as number) / max) * 100 < 0
                                                    ? "0"
                                                    : ((Format(d?.quantity?.toString(), "number", true) as number) / max) * 100
                                            }% 100%`,
                                        }}
                                    >
                                        <span style={{ color: `${d?.type === "buy" ? "green" : "red"}` }}>{Format(d?.quantity, "currency", true)}</span>
                                    </div>
                                    <span style={{ display: "table-cell", padding: "0.5em 1em" }}>
                                        <span>{Format(d?.price, "currency", true)}</span>
                                    </span>
                                </div>
                            </div>
                            {/* <div>
                                    <Controls.Button>Order</Controls.Button>
                                </div> */}
                        </Tick>
                    ))
                ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Elements.Text type={"desc"} opacity={0.6}>
                                There is no record of trades yet in this market.
                            </Elements.Text>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Layouts.Contents.InnerContent>
    );
}
