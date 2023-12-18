"use client";
import { useState } from "react";
import { Root } from "lib/style";
import { Layouts } from "components";
import { Treasury } from "prefabs";
import { Farm, Token } from "types/web3";
import { useWindowSize } from "hooks";
import Data from "./data";

export default function Page() {
    const { windowSize } = useWindowSize();

    const [page, setPage] = useState<"vault" | "farm" | undefined>("vault");
    const [asset, setAsset] = useState<Token | undefined>();
    const [farm, setFarm] = useState<Farm | undefined>();

    const Dummy = Data();
    const props = {
        responsive: windowSize.width <= Root.Device.Mobile,
        assets: Dummy.assets,
        farms: Dummy.farms,
        asset: asset,
        charts: {
            value: Dummy.value,
            volume: Dummy.volume,
        },
    };

    return (
        <Layouts.Page style={{ background: "rgb(var(--dim))" }}>
            <Layouts.Contents.SlideContainer
                contents={[
                    {
                        active: !asset && !farm,
                        children: (
                            <Treasury.View
                                assets={props?.assets}
                                farms={props?.farms}
                                page={page}
                                charts={props?.charts}
                                onPage={(page?: "vault" | "farm") => setPage(page)}
                                onSelect={(select?: Token | Farm) => {
                                    if (page === "vault") {
                                        setFarm(undefined);
                                        setAsset(select as Token);
                                    } else {
                                        setAsset(undefined);
                                        setFarm(select as Farm);
                                    }
                                }}
                                responsive={props?.responsive}
                            />
                        ),
                    },
                    {
                        active: !!asset || !!farm,
                        children: (
                            <Treasury.Detail
                                asset={asset}
                                farm={farm}
                                onBack={() => {
                                    if (page === "vault") {
                                        setAsset(undefined);
                                    } else {
                                        setFarm(undefined);
                                    }
                                }}
                                responsive={props?.responsive}
                            />
                        ),
                    },
                ]}
            />
        </Layouts.Page>
    );
}
