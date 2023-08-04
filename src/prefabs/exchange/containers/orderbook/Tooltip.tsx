import { Elements, Layouts } from "components";
import { Root } from "lib/style";
import { Format } from "lib/utils";

export interface OrderbookTooltip {
    base: string;
    quote: string;
    price?: number;
    amount?: number;
    balance?: number;
}

export default function Tooltip(props: any) {
    return (
        <Elements.Tooltip
            e={props?.e}
            color={props?.color}
            vertical={props?.vertical}
            horizon={props?.horizon}
            padding={1}
            style={{ border: `1px solid rgb(${Root.Color(props?.color)})` }}
            fill
        >
            <Layouts.Col gap={0.25}>
                {props?.price && (
                    <Layouts.Row gap={0} fix>
                        <Elements.Text opacity={0.6} fit>
                            Avg Price:
                        </Elements.Text>
                        <Elements.Text align={"right"}>{Format(props?.price, "currency", true, 4)}</Elements.Text>
                    </Layouts.Row>
                )}
                {props?.amount && (
                    <Layouts.Row gap={0} fix>
                        <Elements.Text opacity={0.6} fit>
                            Sum {props?.quote?.toUpperCase()}:
                        </Elements.Text>
                        <Elements.Text align={"right"}>{Format(props?.amount, "currency", true, 4)}</Elements.Text>
                    </Layouts.Row>
                )}
                {props?.balance && (
                    <Layouts.Row gap={0} fix>
                        <Elements.Text opacity={0.6} fit>
                            Sum {props?.base?.toUpperCase()}:
                        </Elements.Text>
                        <Elements.Text align={"right"}>{Format(props?.balance, "currency", true, 4)}</Elements.Text>
                    </Layouts.Row>
                )}
            </Layouts.Col>
        </Elements.Tooltip>
    );
}
