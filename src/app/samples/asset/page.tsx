"use client";
import { useState } from "react";
import { Root } from "lib/style";
import { Controls, Elements, Layouts } from "components";
import { Capitalize, Format } from "lib/utils";
import Data from "./data";
import { Modal, Modals } from "containers";
import useWindowSize from "hooks/useWindowSize";
import usePortal from "hooks/usePortal";
import { Token } from "types/web3";
import { Asset } from "prefabs";

export default function Page() {
    const { info, assets, market } = Data();
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
                            children: <Asset.Pages.Detail assets={assets} onBack={() => setSelectedAsset(undefined)} />,
                        },
                    ]}
                />
            </Layouts.Box>
        </Layouts.Page>
    );
}
