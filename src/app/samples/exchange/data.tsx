export default function Data() {
    const market = {
        logo: require("/src/assets/coins/eth.png"),
        base: {
            symbol: "eth",
            name: "ethereum",
            decimal: 18,
            balance: 9.87654321,
        },
        quote: {
            symbol: "dai",
            name: "dai",
            decimal: 18,
            balance: 9.87654321,
        },
        market: "ETH/DAI",
        price: "1510",
        change: "23.12",
        volume: "73170731",
    };

    const asks = [
        { price: 1511, balance: 800 },
        { price: 1512, balance: 1200 },
        { price: 1513, balance: 700 },
        { price: 1514, balance: 900 },
        { price: 1515, balance: 600 },
        { price: 1516, balance: 400 },
        { price: 1517, balance: 1200 },
        { price: 1518, balance: 700 },
        { price: 1519, balance: 600 },
        { price: 1521, balance: 50 },
        { price: 1522, balance: 100 },
        { price: 1523, balance: 400 },
        { price: 1524, balance: 200 },
        { price: 1525, balance: 300 },
        { price: 1526, balance: 600 },
        { price: 1527, balance: 800 },
        { price: 1528, balance: 700 },
        { price: 1529, balance: 500 },
        { price: 1530, balance: 100 },
    ];

    const bids = [
        { price: 1510, balance: 100 },
        { price: 1509, balance: 500 },
        { price: 1508, balance: 700 },
        { price: 1507, balance: 800 },
        { price: 1506, balance: 600 },
        { price: 1505, balance: 300 },
        { price: 1504, balance: 200 },
        { price: 1503, balance: 400 },
        { price: 1502, balance: 100 },
        { price: 1501, balance: 50 },
        { price: 1500, balance: 600 },
        { price: 1499, balance: 700 },
        { price: 1498, balance: 1200 },
        { price: 1497, balance: 400 },
        { price: 1496, balance: 600 },
        { price: 1495, balance: 900 },
        { price: 1494, balance: 700 },
        { price: 1493, balance: 1200 },
        { price: 1492, balance: 800 },
    ];

    const orderbook = { asks: asks, bids: bids };

    return { market, orderbook };
}
