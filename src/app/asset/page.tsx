"use client";
import { useEffect, useState } from "react";
import { Layouts } from "@coinmeca/ui/dist/components";
import { Asset } from "@coinmeca/ui/dist/prefabs";
import { Token } from "@coinmeca/ui/dist/types/web3";
import { Root } from "@coinmeca/ui/dist/lib/style";
import useWindowSize from "@coinmeca/ui/dist/hooks/useWindowSize";
import Data from "./data";

export default function Page() {
    const Dummy = Data();
    const props: any = {
        info: Dummy?.info,
        assets: Dummy?.assets,
        history: Dummy?.history,
        positions: Dummy?.positions,
    };

    const { windowSize } = useWindowSize();
    const [asset, setAsset] = useState<Token | undefined>();
    const [history, setHistory] = useState(Dummy?.history);

    useEffect(() => {}, [props?.assets, props?.history]);

    return (
        <Layouts.Page>
            <Layouts.Box fit>
                <Layouts.Contents.SlideContainer
                    contents={[
                        {
                            active: typeof asset === "undefined",
                            children: (
                                <Asset.Pages.View
                                    info={props?.info}
                                    assets={props?.assets}
                                    onSelect={(a: Token | undefined) => setAsset(a)}
                                    responsive={windowSize.width < Root.Device.Mobile}
                                />
                            ),
                        },
                        {
                            active: typeof asset !== "undefined",
                            children: (
                                <Asset.Pages.DetailNFT
                                    info={props?.info}
                                    assets={props?.assets}
                                    asset={asset}
                                    history={history}
                                    positions={props?.positions}
                                    onBack={() => setAsset(undefined)}
                                    responsive={windowSize.width <= Root.Device.Mobile}
                                />
                            ),
                        },
                    ]}
                />
            </Layouts.Box>
        </Layouts.Page>
    );
}
