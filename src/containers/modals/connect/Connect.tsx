"use client";
import { useEffect, useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { Modals } from "containers";
import type { Process } from "containers/modals/process/Process";

export type Connect = Omit<Process, "process"> & {
    process?: boolean | null;
    chains?: any;
    wallets?: any;
    onClose: Function;
    onChain?: Function;
    onWallet?: Function;
    onConnect?: Function;
    onBack?: Function;
    onError?: Function;
};

export default function Connect(props: Connect) {
    const [chain, setChain] = useState<any>();
    const [wallet, setWallet] = useState<any>();

    const [process, setProcess] = useState<boolean | null>(props?.process || null);
    const [walletError, setWalletError] = useState<string>();

    useEffect(() => {
        return () => {
            setProcess(null);
            setWallet(null);
        };
    }, []);

    const chainFormatter = (data: any): any[] | undefined =>
        (typeof data === "object" ? Object.values(data) : data?.length > 0 && data)?.map((c: any) => ({
            children: <Elements.Avatar img={c?.logo} name={c?.name} />,
            onClick: (e: any) => {
                setChain(c);
                if (typeof props?.onChain === "function") props?.onChain(c, e);
            },
        }));

    const walletListFormatter = (data: any): any[] | undefined =>
        (typeof data === "object" ? Object.values(data) : data?.length > 0 && data)?.map((w: any) => ({
            children: <Elements.Avatar img={w?.logo} name={w?.name} style={{ flex: 1 }} />,
            onClick: async (e: any) => await handleConnect(e, w?.name),
        }));

    const handleBack = (e: any) => {
        setProcess(null);
        setWalletError(undefined);
        if (typeof props?.onBack === "function") props?.onBack(e);
    };

    const handleClose = (e: any) => {
        if (typeof props?.onClose === "function") props?.onClose(e);
        setProcess(null);
    };

    const handleError = (e: any, error?: any) => {
        setProcess(false);
        setWallet(null);
        setWalletError(error?.message || "");
        if (typeof props?.onError === "function") props?.onError(e, error);
    };

    const handleConnect = async (e: any, w: string) => {
        try {
            setWallet(w);
            if (typeof props?.onWallet === "function") await props?.onWallet(w, chain, e);
            if (typeof props?.onConnect === "function") await props?.onConnect(w, chain, e);
            setProcess(true);
        } catch (error: any) {
            handleError(e, error);
        }
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
                                    <Elements.Text type={"strong"} height={2} opacity={0.6} align={"center"}>
                                        Please select chain will you use.
                                    </Elements.Text>
                                    <Layouts.Contents.InnerContent style={{ justifyContent: "center" }} scroll>
                                        <Layouts.List list={chainFormatter(props?.chains)} />
                                    </Layouts.Contents.InnerContent>
                                    <Controls.Button onClick={(e: any) => handleClose(e)}>Close</Controls.Button>
                                </Layouts.Col>
                            ),
                        },
                        {
                            active: chain,
                            children: (
                                <Layouts.Col gap={2} fill>
                                    <Elements.Text type={"strong"} height={2} opacity={0.6} align={"center"}>
                                        Please select wallet will you connect. 123
                                    </Elements.Text>
                                    <Layouts.Contents.InnerContent style={{ justifyContent: "center" }} scroll>
                                        <Layouts.List list={walletListFormatter(props?.wallets)} />
                                    </Layouts.Contents.InnerContent>
                                    <Controls.Button
                                        onClick={() => {
                                            setChain(undefined);
                                            setProcess(null);
                                        }}
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
                // active: props?.process || process,
                message: walletError || props?.failure?.message || "Processing has been failed.",
                children: <Controls.Button onClick={(e: any) => handleBack(e)}>Go Back</Controls.Button>,
            }}
            loading={{
                active: props?.loading?.active || wallet,
                message: props?.loading?.message || "Please wait until the processing is complete.",
            }}
            success={{
                message: props?.loading?.message || "Processing has been succeed.",
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
            onClose={(e: any) => handleClose(e)}
            close={!wallet}
        />
    );
}
