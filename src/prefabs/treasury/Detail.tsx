"use client";
import { Contents, Controls, Layouts } from "components";
import { AnimatePresence } from "motion/react";
import { Treasury } from "prefabs";
import type { Farm, Token, Vault } from "types";

export interface Detail {
    asset?: Token;
    vault?: Vault & { info?: any; recent?: any; charts?: { rate: any; value: any; volume: any }; [x: string]: any };
    farm?: Farm & { info?: any; recent?: any; charts?: { apr: any; staking: any }; [x: string]: any };
    onBack?: Function;
    responsive?: boolean;
}

export default function Detail(props: Detail) {
    const vault = props?.vault;
    const farm = props?.farm;

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
