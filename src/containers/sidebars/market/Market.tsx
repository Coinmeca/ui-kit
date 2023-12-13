"use client";

import { Controls, Layouts } from "components";
import { useSort } from "hooks";

export interface Market {
    list: object;
}

export default function Market(props: Market) {
    const { sort, setSort, sortArrow } = useSort();

    const sorts = {
        symbol: { key: "symbol", type: "string" },
        name: { key: "name", type: "string" },
        price: { key: "price", type: "number" },
        change: { key: "change", type: "number" },
        volume: { key: "volume", type: "number" },
    };

    return (
        <>
            <Layouts.Row gap={1} style={{ padding: "1em" }} fix>
                <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft={sortArrow(sorts.symbol)} onClick={() => setSort(sorts.symbol)}>
                        Symbol
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.name)} onClick={() => setSort(sorts.name)}>
                        Name
                    </Controls.Tab>
                </Layouts.Row>
                <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft={sortArrow(sorts.price)} onClick={() => setSort(sorts.price)}>
                        Price
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.change)} onClick={() => setSort(sorts.change)}>
                        Change
                    </Controls.Tab>
                </Layouts.Row>
                <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft={sortArrow(sorts.volume)} onClick={() => setSort(sorts.volume)}>
                        Volume
                    </Controls.Tab>
                </Layouts.Row>
            </Layouts.Row>
            <Layouts.Divider strong />
            <Layouts.Contents.InnerContent scroll>
                <Layouts.Table list={props?.list} sort={sort} fallback="There is no data." />
            </Layouts.Contents.InnerContent>
        </>
    );
}
