"use client";

import { Controls, Layouts } from "components";

export interface Market {
    list: object;
}

export default function Market(props: Market) {
    return (
        <>
            <Layouts.Row gap={1} style={{ padding: "1em" }} fix>
                <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft="sort-up">Symbol</Controls.Tab>
                    <Controls.Tab iconLeft="sort-up">Name</Controls.Tab>
                </Layouts.Row>
                <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft="sort-up">Price</Controls.Tab>
                    <Controls.Tab iconLeft="sort-up">Change</Controls.Tab>
                </Layouts.Row>
                <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft="sort-up">Volume</Controls.Tab>
                </Layouts.Row>
            </Layouts.Row>
            <Layouts.Divider strong />
            <Layouts.Contents.InnerContent scroll>
                <Layouts.Table
                    list={props?.list}
                    fallback="There is no data."
                />
            </Layouts.Contents.InnerContent>
        </>
    );
}
