"use client";
import { Controls, Layouts } from "components";
import { Icon, Button } from "components/controls";

export default function Exchange() {
    const list = [
        {
            value: "item 1",
        },
        {
            value: "item 2",
        },
        {
            value: "item 3",
        },
    ];

    return (
        <Layouts.Box>
            <div>
                exchange
                <Layouts.Col>
                    <Layouts.Row>
                        <Icon scale={0.5} icon={"swap"} title={"swap"} />
                        <Icon scale={1} icon={"account"} />
                        <Icon color={"#6080FF"} scale={2} icon={"bank"} />
                        <Icon color={"yellow"} scale={3} icon={"chevron-left"} />
                        <Icon color={"red"} scale={4} icon={"chart-area"} />
                    </Layouts.Row>
                    <Layouts.Row>
                        <Button iconLeft="bank">Button</Button>
                        <Button color="blue" icon="money" fit />
                        <Button color="orange" iconLeft="swap" title="Let's swap">
                            Button
                        </Button>
                        <Button color="green" iconLeft="swap" iconRight="identity" click={() => alert("1")}>
                            Button
                        </Button>
                    </Layouts.Row>
                    <Button type="glass" color="black">
                        Button
                    </Button>
                    <Button type="line" color="red" iconLeft="money">
                        Make money
                    </Button>
                    <Button type="line" iconLeft="swap" disabled>
                        Button
                    </Button>
                    <Button type="glass" iconRight="swap" fit>
                        Button
                    </Button>
                    <Button type="solid" icon="swap" fit />
                    <Controls.Dropdown options={list} />
                </Layouts.Col>
            </div>
        </Layouts.Box>
    );
}
