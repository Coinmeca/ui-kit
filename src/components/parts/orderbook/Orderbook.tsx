import { Layouts } from "components";
import Style, { Asks, Bids, Tick as Ticks } from "./Orderbook.styled";

export interface Orderbook {
    asks?: Tick[];
    bids?: Tick[];
    ask_show?: boolean;
    bid_show?: boolean;
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

    return (
        <Style>
            {ask_show && (
                <Asks>
                    {asks && asks.length > 0 ? (
                        asks.map((ask: Tick, i: number) => (
                            <Ticks>
                                <div>
                                    <div>
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
                                            <span>{ask.balance}</span>
                                        </div>
                                        <div>
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
            <Layouts.Divider />
            {bid_show && (
                <Bids>
                    {bids && bids.length > 0 ? (
                        bids.map((bid: Tick, i: number) => (
                            <Ticks>
                                <div>
                                    <div>
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
                                            <span>{bid.balance}</span>
                                        </div>
                                        <div>
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
