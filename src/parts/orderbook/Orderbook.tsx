export interface Orderbook{
    asks?: Tick[];
    bids?: Tick[];
}

export interface Tick{
    price: number | string;
    balance: number | string;
}

export default function Ordrebook(props: Orderbook) {

    return <></>
}