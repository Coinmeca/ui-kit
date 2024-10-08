export default function Data() {
    const market = {
        logo: require('../../../assets/coins/eth.png'),
        base: {
            address: '0x123456',
            symbol: 'eth',
            name: 'ethereum',
            decimals: 18,
            balance: 15000.987654321,
        },
        quote: {
            address: '0x234567',
            symbol: 'dai',
            name: 'dai',
            decimals: 18,
            balance: 15000.87654321,
        },
        market: 'ETH/DAI',
        price: '1510',
        change: '23.12',
        volume: '73170731',
    };

    const info = {
        volume_base: '123456789',
        volume_quote: '123456789',
        open: '123123123',
        high: '123123123',
        low: '123123123',
        close: '123123123',
        change: '123123123',
        change_rate: '123.21',
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
    const orderbookView = ['All', 'Ask', 'Bid'];

    const chart = {
        price: [
            {
                time: '2023-05-13',
                open: 17.5,
                high: 46.5,
                low: 34.5,
                close: 31.5,
            },
            {
                time: '2023-05-14',
                open: 31.5,
                high: 36.7,
                low: 34.5,
                close: 17.5,
            },
            {
                time: '2023-05-15',
                open: 17.5,
                high: 57.5,
                low: 27.1,
                close: 34.2,
            },
            {
                time: '2023-05-16',
                open: 34.2,
                high: 46.5,
                low: 34.5,
                close: 31.5,
            },
            {
                time: '2023-05-17',
                open: 31.5,
                high: 57.5,
                low: 27.1,
                close: 46.5,
            },
            {
                time: '2023-05-18',
                open: 46.5,
                high: 46.5,
                low: 27.1,
                close: 31.5,
            },
            {
                time: '2023-05-19',
                open: 31.5,
                high: 46.5,
                low: 38.6,
                close: 46.5,
            },
            {
                time: '2023-05-20',
                open: 46.5,
                high: 36.7,
                low: 31.5,
                close: 46.5,
            },
            {
                time: '2023-05-21',
                open: 46.5,
                high: 46.5,
                low: 34.5,
                close: 31.5,
            },
            {
                time: '2023-05-22',
                open: 31.5,
                high: 46.5,
                low: 38.6,
                close: 23.5,
            },
            {
                time: '2023-05-23',
                open: 23.5,
                high: 46.5,
                low: 34.1,
                close: 27.5,
            },
            {
                time: '2023-05-24',
                open: 27.5,
                high: 57.5,
                low: 46.5,
                close: 23.5,
            },
            {
                time: '2023-05-25',
                open: 23.5,
                high: 36.7,
                low: 31.5,
                close: 23.5,
            },
            {
                time: '2023-05-26',
                open: 23.5,
                high: 57.5,
                low: 27.1,
                close: 31.5,
            },
            {
                time: '2023-05-27',
                open: 31.5,
                high: 46.5,
                low: 46.5,
                close: 46.5,
            },
            {
                time: '2023-05-28',
                open: 46.5,
                high: 46.5,
                low: 34.5,
                close: 46.5,
            },
            {
                time: '2023-05-29',
                open: 46.5,
                high: 46.5,
                low: 38.6,
                close: 46.5,
            },
            {
                time: '2023-05-30',
                open: 46.5,
                high: 57.5,
                low: 27.1,
                close: 31.5,
            },
            {
                time: '2023-05-31',
                open: 31.5,
                high: 36.7,
                low: 24.1,
                close: 29.5,
            },
            {
                time: '2023-06-01',
                open: 29.5,
                high: 57.5,
                low: 24.5,
                close: 33.5,
            },
            {
                time: '2023-06-02',
                open: 33.5,
                high: 46.5,
                low: 24.5,
                close: 33.5,
            },
            {
                time: '2023-06-03',
                open: 33.5,
                high: 46.5,
                low: 21.8,
                close: 31.5,
            },
            {
                time: '2023-06-04',
                open: 31.5,
                high: 46.5,
                low: 24.8,
                close: 17.5,
            },
            {
                time: '2023-06-05',
                open: 17.5,
                high: 57.5,
                low: 21.8,
                close: 46.5,
            },
            {
                time: '2023-06-06',
                open: 46.5,
                high: 46.5,
                low: 27.1,
                close: 31.5,
            },
            {
                time: '2023-06-07',
                open: 31.5,
                high: 46.5,
                low: 34.5,
                close: 17.5,
            },
            {
                time: '2023-06-08',
                open: 17.5,
                high: 36.7,
                low: 34.5,
                close: 17.5,
            },
            {
                time: '2023-06-09',
                open: 17.5,
                high: 57.5,
                low: 46.5,
                close: 31.5,
            },
            {
                time: '2023-06-10',
                open: 31.5,
                high: 46.5,
                low: 27.1,
                close: 20.5,
            },
            {
                time: '2023-06-11',
                open: 20.5,
                high: 36.7,
                low: 31.5,
                close: 17.5,
            },
        ],
        volume: [
            { time: '2023-05-13', value: 24.5, type: 'SELL' },
            { time: '2023-05-14', value: 27.1, type: 'BUY' },
            { time: '2023-05-15', value: 24.3, type: 'SELL' },
            { time: '2023-05-16', value: 27.1, type: 'BUY' },
            { time: '2023-05-17', value: 32.3, type: 'SELL' },
            { time: '2023-05-18', value: 27.1, type: 'BUY' },
            { time: '2023-05-19', value: 24.5, type: 'SELL' },
            { time: '2023-05-20', value: 27.3, type: 'BUY' },
            { time: '2023-05-21', value: 27.1, type: 'BUY' },
            { time: '2023-05-22', value: 24.4, type: 'SELL' },
            { time: '2023-05-23', value: 27.3, type: 'BUY' },
            { time: '2023-05-24', value: 24.5, type: 'SELL' },
            { time: '2023-05-25', value: 24.5, type: 'SELL' },
            { time: '2023-05-26', value: 27.1, type: 'BUY' },
            { time: '2023-05-27', value: 27.3, type: 'BUY' },
            { time: '2023-05-28', value: 27.3, type: 'BUY' },
            { time: '2023-05-29', value: 32.4, type: 'SELL' },
            { time: '2023-05-30', value: 32.4, type: 'SELL' },
            { time: '2023-05-31', value: 24.1, type: 'BUY' },
            { time: '2023-06-01', value: 24.5, type: 'SELL' },
            { time: '2023-06-02', value: 18.9, type: 'SELL' },
            { time: '2023-06-03', value: 24.7, type: 'SELL' },
            { time: '2023-06-04', value: 27.2, type: 'BUY' },
            { time: '2023-06-05', value: 24.1, type: 'BUY' },
            { time: '2023-06-06', value: 18.3, type: 'SELL' },
            { time: '2023-06-07', value: 27.1, type: 'BUY' },
            { time: '2023-06-08', value: 24.1, type: 'BUY' },
            { time: '2023-06-09', value: 32.4, type: 'SELL' },
            { time: '2023-06-10', value: 24.2, type: 'SELL' },
            { time: '2023-06-11', value: 32.4, type: 'SELL' },
        ],
    };

    const history = [
        { time: 123456789, type: 'buy', price: 1500, quantity: 100 },
        { time: 123456789, type: 'sell', price: 1500, quantity: 200 },
        { time: 123456789, type: 'buy', price: 1500, quantity: 400 },
        { time: 123456789, type: 'sell', price: 1500, quantity: 800 },
        { time: 123456789, type: 'sell', price: 1500, quantity: 400 },
        { time: 123456789, type: 'buy', price: 1500, quantity: 600 },
        { time: 123456789, type: 'sell', price: 1500, quantity: 1000 },
        { time: 123456789, type: 'sell', price: 1500, quantity: 1400 },
        { time: 123456789, type: 'buy', price: 1500, quantity: 1200 },
        { time: 123456789, type: 'sell', price: 1500, quantity: 600 },
        { time: 123456789, type: 'buy', price: 1500, quantity: 100 },
        { time: 123456789, type: 'sell', price: 1500, quantity: 200 },
        { time: 123456789, type: 'buy', price: 1500, quantity: 400 },
        { time: 123456789, type: 'sell', price: 1500, quantity: 800 },
        { time: 123456789, type: 'sell', price: 1500, quantity: 400 },
        { time: 123456789, type: 'buy', price: 1500, quantity: 600 },
        { time: 123456789, type: 'sell', price: 1500, quantity: 1000 },
        { time: 123456789, type: 'sell', price: 1500, quantity: 1400 },
        { time: 123456789, type: 'buy', price: 1500, quantity: 1200 },
        { time: 123456789, type: 'sell', price: 1500, quantity: 600 },
        { time: 123456789, type: 'buy', price: 1500, quantity: 100 },
        { time: 123456789, type: 'sell', price: 1500, quantity: 200 },
        { time: 123456789, type: 'buy', price: 1500, quantity: 400 },
        { time: 123456789, type: 'sell', price: 1500, quantity: 800 },
        { time: 123456789, type: 'sell', price: 1500, quantity: 400 },
        { time: 123456789, type: 'buy', price: 1500, quantity: 600 },
        { time: 123456789, type: 'sell', price: 1500, quantity: 1000 },
        { time: 123456789, type: 'sell', price: 1500, quantity: 1400 },
        { time: 123456789, type: 'buy', price: 1500, quantity: 1200 },
        { time: 123456789, type: 'sell', price: 1500, quantity: 600 },
    ];

    return { market, orderbook, info, orderbookView, chart, history };
}
