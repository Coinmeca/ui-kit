"use client";
import { useEffect, useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { Modals } from "containers";
import type { Process } from "containers/modals/process/Process";

export interface Connect extends Omit<Process, "process"> {
    process?: boolean | null;
    timer?: number;
    chains?: any;
    wallets?: any;
    config?: object;
    onClose: Function;
    onChain?: Function;
    onWallet?: Function;
    onConnect?: Function;
    onError?: Function;
    onBack?: Function;
}

export default function Connect(props: Connect) {
    const timer = props?.timer || 5000;

    const [chain, setChain] = useState<any>();
    const [wallet, setWallet] = useState<any>();

    const [process, setProcess] = useState<boolean | null>(typeof props?.process === "boolean" || props?.process === null ? props?.process : null);

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
            children: <Elements.Avatar img={w?.logo} name={w?.name} style={{ width: "-webkit-fill-available" }} />,
            onClick: async (e: any) => await handleConnect(e, w),
        }));

    const handleBack = (e: any) => {
        setProcess(null);
        setWallet(null);
        if (typeof props?.onBack === "function") props?.onBack(e);
    };

    const handleClose = (e: any) => {
        setProcess(null);
        setChain(null);
        if (typeof props?.onClose === "function") props?.onClose(e);
    };

    const handleError = async (e: any, error?: any) => {
        if (typeof props?.onError === "function") await props?.onError(e, error);
    };

    const handleConnect = async (e: any, w: any) => {
        setWallet(w);
        if (typeof props?.onWallet === "function")
            await props
                ?.onWallet(chain, w, e)
                ?.then()
                ?.catch((error: any) => handleError(e, error));
        if (typeof props?.onConnect === "function")
            await props
                ?.onConnect(chain, w, e)
                ?.then(() => {
                    setProcess(true);
                })
                ?.catch((error: any) => {
                    setProcess(false);
                    handleError(e, error);
                });
    };

    useEffect(() => {
        return () => {
            setProcess(null);
            setWallet(null);
            setChain(null);
        };
    }, []);

    useEffect(() => {
        if (typeof props.onClose === "function" && (typeof props?.process === "boolean" || props?.process === null ? props?.process : process)) {
            const close = setInterval(() => {
                props?.onClose();
            }, timer);
            return () => clearInterval(close);
        }
    }, [props?.process, process]);

    return (
        <Modals.Process
            {...props}
            title={
                !chain ? (
                    "Connect Wallet"
                ) : (
                    <Elements.Avatar scale={0.625} size={2.25} style={{ justifyContent: "center" }} img={chain.logo} name={chain.name} />
                )
            }
            process={typeof props?.process === "boolean" || props?.process === null ? props?.process : process}
            content={
                <Layouts.Contents.SlideContainer
                    contents={[
                        {
                            active: props?.chains ? !chain : false,
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
                            active: props?.chains ? chain : true,
                            children: (
                                <Layouts.Col gap={2} fill>
                                    <Elements.Text type={"strong"} height={2} opacity={0.6} align={"center"}>
                                        Please select wallet will you connect.
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
                message: props?.failure?.message || "Processing has been failed.",
                children: <Controls.Button onClick={(e: any) => handleBack(e)}>Go Back</Controls.Button>,
            }}
            loading={{
                active: props?.loading?.active || wallet,
                message: props?.loading?.message || "Please wait until the processing is complete.",
            }}
            success={{
                message: props?.success?.message || "Processing has been succeed.",
                children: <Controls.Button onClick={(e: any) => handleClose(e)}>OK</Controls.Button>,
            }}
            onClose={(e: any) => handleClose(e)}
            close={!wallet}
        />
    );
}
