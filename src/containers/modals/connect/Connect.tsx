"use client";
import { useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { Modals } from "containers";
import type { Process } from "containers/modals/process/Process";

export interface Connect extends Process {
    chains?: any;
    wallets?: any;
    onClose: Function;
    onChain: Function;
    onWallet: Function;
}

export default function Connect(props: any) {
    const [chain, setChain] = useState<any>();
    const [wallet, setWallet] = useState<any>();

    const [process, setProcess] = useState<boolean | null>(
        props?.process || null
    );
    const [loading, setLoading] = useState<boolean>(
        props?.loading?.active || false
    );

    const handleClose = (e: any) => {
        if (typeof props?.onClose === "function") props?.onClose(e);
    };

    const chainFormatter = (data: any): any[] | undefined => {
        const chains =
            typeof data === "object"
                ? Object.values(data)
                : data?.length > 0 && data;

        return chains?.map((c: any) => {
            return {
                children: <Elements.Avatar img={c?.logo} name={c?.name} />,
                onClick: (e: any) => {
                    setChain(c);
                    if (typeof props?.onChain === "function")
                        props?.onChain(c, e);
                },
            };
        });
    };

    const walletFormatter = (data: any): any[] | undefined => {
        const wallets =
            typeof data === "object"
                ? Object.values(data)
                : data?.length > 0 && data;
        return wallets?.map((w: any) => {
            return {
                children: (
                    <Elements.Avatar img={w.strategy.image} name={w?.name} />
                ),
                onClick: (e: any) => {
                    setWallet(w);
                    if (typeof props?.onWallet === "function")
                        props?.onWallet(w, e);
                },
            };
        });
    };

    return (
        <Modals.Process
            {...props}
            title={"Connect Wallet"}
            process={process}
            content={
                <Layouts.Contents.SlideContainer
                    contents={[
                        {
                            active: typeof chain === "undefined",
                            children: (
                                <Layouts.Col gap={2} fill>
                                    <Elements.Text
                                        type={"strong"}
                                        height={2}
                                        opacity={0.6}
                                        align={"center"}
                                    >
                                        Please select chain will you use.
                                    </Elements.Text>
                                    <Layouts.Contents.InnerContent
                                        style={{ justifyContent: "center" }}
                                        scroll
                                    >
                                        <Layouts.List
                                            list={chainFormatter(props?.chains)}
                                        />
                                    </Layouts.Contents.InnerContent>
                                    <Controls.Button>Close</Controls.Button>
                                </Layouts.Col>
                            ),
                        },
                        {
                            active: chain,
                            children: (
                                <Layouts.Col gap={2} fill>
                                    <Elements.Text
                                        type={"strong"}
                                        height={2}
                                        opacity={0.6}
                                        align={"center"}
                                    >
                                        Please select chain will you use.
                                    </Elements.Text>
                                    <Layouts.Contents.InnerContent
                                        style={{ justifyContent: "center" }}
                                        scroll
                                    >
                                        <Layouts.List
                                            list={walletFormatter(
                                                props?.wallets
                                            )}
                                        />
                                    </Layouts.Contents.InnerContent>
                                    <Controls.Button
                                        onClick={() => setChain(undefined)}
                                    >
                                        Back
                                    </Controls.Button>
                                </Layouts.Col>
                            ),
                        },
                    ]}
                />
            }
            failure={{
                message:
                    props?.failure?.message || "Processing has been failed.",
                children: (
                    <Controls.Button
                        onClick={(e: any) => {
                            setProcess(null);
                        }}
                    >
                        Go Back
                    </Controls.Button>
                ),
            }}
            loading={{
                active: loading,
                message:
                    props?.loading?.message ||
                    "Please wait until the processing is complete.",
                children: (
                    <Controls.Button
                        onClick={(e: any) => {
                            setProcess(true);
                        }}
                    >
                        {`Let's Finish`}
                    </Controls.Button>
                ),
            }}
            success={{
                message:
                    props?.loading?.message || "Processing has been succeed.",
                children: (
                    <Controls.Button
                        onClick={(e: any) => {
                            handleClose(e);
                            setProcess(null);
                            setLoading(false);
                        }}
                    >
                        OK
                    </Controls.Button>
                ),
            }}
            onClose={(e: any) => {
                handleClose(e);
            }}
            close={!loading}
        />
    );
}
