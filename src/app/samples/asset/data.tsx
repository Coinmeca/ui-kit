export default function Data() {
    const assets = [
        {
            address: "0x1234",
            symbol: "ETH",
            name: "Ethereum",
            balance: 13.2156786156,
            using: 0,
        },
        {
            address: "0x2345",
            symbol: "WETH",
            name: "Wrapped Ethereum",
            balance: 42.1897845689,
            using: 0,
        },
        {
            address: "0x3456",
            symbol: "MECA",
            name: "Coinmeca",
            balance: 16.156781564,
            using: 0,
        },
        {
            address: "0x4567",
            symbol: "USDT",
            name: "USD Tether",
            balance: 16.156781564,
            using: 0,
        },
        {
            address: "0x5678",
            symbol: "ARB",
            name: "Arbitrum",
            balance: 3261.156781564,
            using: 0,
        },
        {
            address: "0x6789",
            symbol: "AVAX",
            name: "Avalanche",
            balance: 264.2156785612,
            using: 0,
        },
    ];
    const info = {
        volume_base: "123456789",
        volume_quote: "123456789",
        open: "123123123",
        high: "123123123",
        low: "123123123",
        close: "123123123",
        change: "123123123",
        change_rate: "+123.%",
    };

    const market = {
        logo: require("/src/assets/coins/eth.png"),
        base: {
            symbol: "eth",
            name: "ethereum",
            decimal: 18,
            balance: 15000.987654321,
        },
        quote: {
            symbol: "dai",
            name: "dai",
            decimal: 18,
            balance: 15000.87654321,
        },
        market: "ETH/DAI",
        price: "1510",
        change: "23.12",
        volume: "73170731",
    };

    return { info, assets, market };
}
