"use client";
import { useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { Modals } from "containers";
import type { Process } from "containers/modals/process/Process";

export interface Connect extends Process {
    chains?: any;
    wallets?: any;
    onClose: Function;
    onChain?: Function;
    onWallet?: Function;
    onConnect?: Function;
}

export default function Connect(props: any) {
    const [chain, setChain] = useState<any>();
    const [wallet, setWallet] = useState<any>();

    const [process, setProcess] = useState<boolean | null>(
        props?.process || null
    );
    const [walletError, setWalletError] = useState<string>();

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

    const walletListFormatter = (data: any): any[] | undefined => {
        const wallets =
            typeof data === "object"
                ? Object.values(data)
                : data?.length > 0 && data;
        return wallets?.map((w: any) => {
            return {
                children: (
                    <Elements.Avatar img={w?.strategy.image} name={w?.name} />
                ),
                onClick: (e: any) => {
                    if (typeof props?.onWallet === "function")
                        props?.onWallet(w, e);
                    setWallet(w);
                    handleConnect(w);
                },
            };
        });
    };

    const handleConnect = async (wallet?: any) => {
        try {
            if (!wallet) throw Error;
            if (typeof props?.onConnect === "function")
                props?.onConnect(wallet);
            await wallet?.adapter();
            setProcess(true);
        } catch (e: any) {
            setProcess(false);
            setWallet(null);
            setWalletError(e.toString());
        }
    };

    const handleBack = (e: any) => {
        setProcess(null);
        setWalletError(undefined);
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
                                            list={walletListFormatter(
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
                    walletError ||
                    props?.failure?.message ||
                    "Processing has been failed.",
                children: (
                    <Controls.Button onClick={(e: any) => handleBack(e)}>
                        Go Back
                    </Controls.Button>
                ),
            }}
            loading={{
                active: wallet,
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
                            setWallet(null);
                        }}
                    >
                        OK
                    </Controls.Button>
                ),
            }}
            onClose={(e: any) => {
                handleClose(e);
            }}
            close={!wallet}
        />
    );
}
