"use client";
import { useEffect, useState } from "react";
import { Layouts } from "components";
import { Asset } from "prefabs";
import { Token } from "types/web3";
import Data from "./data";

export default function Page() {
    const { info, assets } = Data();
    const [selectedAsset, setSelectedAsset] = useState<Token | undefined>();

    return (
        <Layouts.Page>
            <Layouts.Box fit>
                <Layouts.Contents.SlideContainer
                    contents={[
                        {
                            active: typeof selectedAsset === "undefined",
                            children: <Asset.Pages.View info={info} assets={assets} onSelect={(a: Token | undefined) => setSelectedAsset(a)} />,
                        },
                        {
                            active: typeof selectedAsset !== "undefined",
                            children: <Asset.Pages.Detail selectedAsset={selectedAsset} assets={assets} onBack={() => setSelectedAsset(undefined)} />,
                        },
                    ]}
                />
            </Layouts.Box>
        </Layouts.Page>
    );
}
