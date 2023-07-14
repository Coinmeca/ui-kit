import { Layouts } from "components";
import Style, { Asks, Bids, Tick as Ticks } from "./Orderbook.styled";

export interface Orderbook {
    asks?: Tick[];
    bids?: Tick[];
    ask_show?: boolean;
    bid_show?: boolean;
    onClickAsk?: Function;
    onClickBid?: Function;
    responsive?: "desktop" | "laptop" | "tablet" | "mobile";
}

export interface Tick {
    price: number | string;
    balance: number | string;
}

export default function Ordrebook(props: Orderbook) {
    const asks = props?.asks;
    const bids = props?.bids;

    const ask_max: number = (asks && asks.length > 0 && Math.max(...asks.map((o: Tick) => parseFloat(o?.balance.toString())))) || 0;
    const bid_max: number = (bids && bids.length > 0 && Math.max(...bids.map((o: Tick) => parseFloat(o?.balance.toString())))) || 0;

    const ask_show = props?.ask_show || true;
    const bid_show = props?.bid_show || true;

    const onClickAsk = (ask: Tick, e?: any) => {
        if (typeof props?.onClickAsk === "function") props?.onClickAsk(ask, e);
    };
    const onClickBid = (bid: Tick, e?: any) => {
        if (typeof props?.onClickBid === "function") props?.onClickBid(bid, e);
    };

    return (
        <Style $responsive={props?.responsive}>
            {ask_show && (
                <Asks>
                    {asks && asks.length > 0 ? (
                        asks.map((ask: Tick, i: number) => (
                            <Ticks key={i} onClick={(e: any) => onClickAsk(ask, e)}>
                                <div>
                                    <div>
                                        <div>
                                            <span>{ask.balance}</span>
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
                                            <span>{ask.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </Ticks>
                        ))
                    ) : (
                        <div>There is no asks.</div>
                    )}
                </Asks>
            )}
            <Layouts.Divider responsive={props?.responsive} />
            {bid_show && (
                <Bids>
                    {bids && bids.length > 0 ? (
                        bids.map((bid: Tick, i: number) => (
                            <Ticks key={i} onClick={(e: any) => onClickBid(bid, e)}>
                                <div>
                                    <div>
                                        <div>
                                            <span>{bid.balance}</span>
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
                                            <span>{bid.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </Ticks>
                        ))
                    ) : (
                        <div>There is no asks.</div>
                    )}
                </Bids>
            )}
        </Style>
    );
}
