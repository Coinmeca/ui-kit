export default function Data() {
    const category = ["Order", "Buy", "Sell", "Deposit", "Withdraw", "Stake", "Unstake", "Claim", "Futures", "Perpetual"];
    const state = ["Pending", "Complete", "Cancel", "Claimable", "Liquidation"];
    const colorset = ["white", "green", "red", "orange", "blue"];

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
    return { info, assets };
}
