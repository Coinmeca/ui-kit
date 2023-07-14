import { Elements, Layouts } from "components";
import { Avatar } from "components/elements";

export default function Page() {
    const market = {
        logo: require("/src/assets/coins/eth.png"),
        symbol: "ETH",
        market: "ETH/DAI",
        price: "4,678.05",
        change: "23.12",
        volume: "73170731",
    };

    return (
        <Layouts.Page>
            <Layouts.Box fit change={parseFloat(market?.change) > 0 ? "var(--green)" : (parseFloat(market?.change) < 0 && "var(--red)") || undefined}>
                <Layouts.Contents.InnerContent>
                    <Layouts.Row only style={{ alignItems: "center" }}>
                        <Layouts.Row only fit>
                            <Avatar img={market.logo} scale={1.3334} />
                            <Layouts.Row fit responsive={"mobile"}>
                                <Elements.Text scale={3} responsive={{ device: "mobile", scale: 1.5 }}>
                                    ETH
                                </Elements.Text>
                                <Elements.Text scale={3} responsive={{ device: "mobile", scale: 1.5 }}>
                                    Ethereum
                                </Elements.Text>
                            </Layouts.Row>
                        </Layouts.Row>
                        <Layouts.Row only align="right">
                            <Layouts.Row only fit gap={1} style={{ alignItems: "center" }}>
                                <Elements.Icon scale={1.5} icon={"caret-up"} style={{ maxHeight: "100%" }} change />
                                <Elements.Text type={"h5"} change>
                                    $ 2,164
                                </Elements.Text>
                            </Layouts.Row>
                        </Layouts.Row>
                    </Layouts.Row>
                    <Layouts.Divider margin={2} />
                </Layouts.Contents.InnerContent>
            </Layouts.Box>
        </Layouts.Page>
    );
}
