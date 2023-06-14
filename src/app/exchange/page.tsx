import { Icon, Button } from "components/controls";

export default function Exchange() {
    return (
        <div>
            exchange
            <Icon scale={0.5} icon={"swap"} />
            <Icon scale={1} icon={"account"} />
            <Icon color={"#6080FF"} scale={2} icon={"bank"} />
            <Icon color={"yellow"} scale={3} icon={"chevron-left"} />
            <Icon color={"red"} scale={4} icon={"chart-area"} />
            <Button>Button</Button>
            <Button icon="money" />
            <Button iconLeft="swap">Button</Button>
            <Button iconLeft="swap" iconRight="identity">
                Button
            </Button>
        </div>
    );
}
