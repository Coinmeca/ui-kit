import { Layouts } from "components";
import { Format } from "lib/utils";
import Style, { Asks, Bids, Tick as Ticks } from "./Orderbook.styled";

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
    const asks = props?.asks;
    const bids = props?.bids;

    const ask_max: number = (asks && asks?.length > 0 && Math.max(...asks?.map((o: Tick) => parseFloat(o?.balance.toString())))) || 0;
    const bid_max: number = (bids && bids?.length > 0 && Math.max(...bids?.map((o: Tick) => parseFloat(o?.balance.toString())))) || 0;

    const view = props?.view || 0;

    const handleAsk = (ask: Tick, e?: any) => {
        if (typeof props?.onClickAsk === "function") props?.onClickAsk(ask, e);
    };
    const handleBid = (bid: Tick, e?: any) => {
        if (typeof props?.onClickBid === "function") props?.onClickBid(bid, e);
    };

    return (
        <Style $responsive={props?.responsive}>
            <Asks $show={view === 0 || view === 1}>
                {asks && asks?.length > 0 ? (
                    asks?.map((ask: Tick, i: number) => (
                        <Ticks key={i} onClick={(e: any) => handleAsk(ask, e)}>
                            <div>
                                <div>
                                    <div>
                                        <span>{Format(ask?.balance, "currency", true)}</span>
                                    </div>
                                    <div
                                        style={{
                                            backgroundSize: `${
                                                (parseFloat(ask?.balance.toString()) / ask_max) * 100 > 100 ? "100" : (parseFloat(ask?.balance.toString()) / ask_max) * 100 < 0 ? "0" : (parseFloat(ask?.balance.toString()) / ask_max) * 100
                                            }% 100%`,
                                        }}
                                    >
                                        <span>{Format(ask?.price, "currency", true)}</span>
                                    </div>
                                </div>
                            </div>
                        </Ticks>
                    ))
                ) : (
                    <div>There is no asks.</div>
                )}
            </Asks>
            <Layouts.Divider responsive={props?.responsive?.device} style={{ ...(view !== 0 && { display: "none" }) }} />
            <Bids $show={view === 0 || view === 2}>
                {bids && bids?.length > 0 ? (
                    bids?.map((bid: Tick, i: number) => (
                        <Ticks key={i} onClick={(e: any) => handleBid(bid, e)}>
                            <div>
                                <div>
                                    <div>
                                        <span>{Format(bid?.balance, "currency", true)}</span>
                                    </div>
                                    <div
                                        style={{
                                            backgroundSize: `${
                                                (parseFloat(bid?.balance.toString()) / bid_max) * 100 > 100 ? "100" : (parseFloat(bid?.balance.toString()) / bid_max) * 100 < 0 ? "0" : (parseFloat(bid?.balance.toString()) / bid_max) * 100
                                            }% 100%`,
                                        }}
                                    >
                                        <span>{Format(bid?.price, "currency", true)}</span>
                                    </div>
                                </div>
                            </div>
                        </Ticks>
                    ))
                ) : (
                    <div>There is no bids yet.</div>
                )}
            </Bids>
        </Style>
    );
}
