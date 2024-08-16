"use client";
import { Contents, Controls, Layouts } from "components";
import { AnimatePresence } from "framer-motion";
import { Treasury } from "prefabs";
import type { Farm, Token } from "types";

import Data from "app/samples/treasury/data";

export interface Detail {
    asset?: Token;
    farm?: Farm;
    onBack?: Function;
    responsive?: boolean;
}

export default function Detail(props: Detail) {
    const { vault, farm } = Data();

    return (
        <Layouts.Box fit>
            <AnimatePresence>
                {props?.asset ? (
                    <Treasury.Vault.Pages.Detail
                        asset={props?.asset}
                        info={vault?.info}
                        recent={vault?.recent}
                        charts={{
                            rate: vault?.charts?.rate,
                            value: vault?.charts?.value,
                            volume: vault?.charts?.volume,
                        }}
                        responsive={props?.responsive}
                        onBack={props?.onBack}
                    />
                ) : props?.farm ? (
                    <Treasury.Farms.Pages.Detail
                        farm={props?.farm}
                        info={farm?.info}
                        recent={farm?.recent}
                        charts={{
                            apr: farm?.charts?.apr,
                            staking: farm?.charts?.staking,
                        }}
                        responsive={props?.responsive}
                        onBack={props?.onBack}
                    />
                ) : (
                    <Contents.States.Failure message={"Oops, something wrong"}>
                        <Controls.Button onClick={props?.onBack}>Go Back</Controls.Button>
                    </Contents.States.Failure>
                )}
            </AnimatePresence>
        </Layouts.Box>
    );
}
