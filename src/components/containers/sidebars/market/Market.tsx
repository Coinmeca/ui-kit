"use client";

import { Controls, Layouts } from "components";

export interface Market {
    list: object;
}

export default function Market(props: Market) {
    return (
        <>
            <Layouts.Row gap={1} style={{ padding: "1em" }} only>
                <Layouts.Row gap={0} only>
                    <Controls.Tab iconLeft="sort-up">Symbol</Controls.Tab>
                    <Controls.Tab iconLeft="sort-up">Name</Controls.Tab>
                </Layouts.Row>
                <Layouts.Row gap={0} only>
                    <Controls.Tab iconLeft="sort-up">Price</Controls.Tab>
                    <Controls.Tab iconLeft="sort-up">Change</Controls.Tab>
                </Layouts.Row>
                <Layouts.Row gap={0} only>
                    <Controls.Tab iconLeft="sort-up">Volume</Controls.Tab>
                </Layouts.Row>
            </Layouts.Row>
            <Layouts.Divider />
            <Layouts.Contents.InnerContent scroll>
                <Layouts.Table list={props?.list} noData="There is no data." />
            </Layouts.Contents.InnerContent>
        </>
    );
}
