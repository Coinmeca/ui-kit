"use client";
// import { Vault } from "components/treasury";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { Modals } from "containers";
import { useMobile, usePortal, useTheme, useWindowSize } from "hooks";
import { Root } from "lib/style";
import { format, HexToColor, parseNumber } from "lib/utils";

export interface Listing {
    standard?: any;
    tokens?: any[];
    keyTokens?: any[];
    onAsset?: Function;
    onProcess?: Function;
    onRefetch?: Function;
    onBack?: Function;
    onClose: Function;
    close?: boolean;
}

interface Validate {
    state?: boolean;
    message?: string;
}

export default function Listing(props: Listing) {
    const { windowWidth } = useWindowSize();
    const { isMobile } = useMobile();
    const { theme } = useTheme();

    const [asset, setAsset] = useState<any>();
    const [pair, setPair] = useState<any[]>([]);
    const [address, setAddress] = useState("");
    const [currentValue, setCurrentValue] = useState(0);

    const [validate, setValidate] = useState<Validate | undefined>({ state: false });
    const [loading, setLoading] = useState<boolean>(false);
    const [process, setProcess] = useState<boolean | null>(null);
    const [fetching, setFetching] = useState(false);

    const keyTokens = useMemo(
        () =>
            props?.keyTokens?.filter(
                ({ address: k }) => !pair?.find(({ address: p }) => k?.toLowerCase() === p?.toLowerCase()),
            ) || [],
        [props?.keyTokens, pair],
    );

    const tokens = useMemo(
        () =>
            pair?.map((p) => ({
                ...props?.tokens?.find(({ address }: any) => address?.toLowerCase() === p?.address?.toLowerCase()),
                ...p,
            })),
        [props?.tokens, pair],
    );

    const max =
        (pair &&
            pair?.length > 0 &&
            asset?.amount &&
            Math.max(
                ...[
                    ...pair,
                    {
                        ...asset,
                        amount: parseNumber(asset?.amount || 0) / pair?.length,
                    },
                ]?.map((p) => parseNumber(p?.amount || 0, "number")),
            )) ||
        0;

    const estimate = useMemo(() => {
        const target = {
            ...asset,
            ...(props?.tokens &&
                props?.tokens?.length > 0 &&
                props?.tokens?.find(({ address }: any) => address?.toLowerCase() === asset?.address?.toLowerCase())),
        };
        return pair?.reduce((a, b) => {
            const token = tokens?.find(({ address }) => address === b?.address);
            const quote = {
                amount: parseNumber(token?.amount),
                weight: parseNumber(token?.weight),
                locked: parseNumber(token?.locked),
            };
            const base = {
                amount: parseNumber(target?.amount),
                weight: parseNumber(target?.weight),
                locked: parseNumber(target?.locked),
            };
            return (
                a +
                (quote?.weight > 0
                    ? (quote?.amount * quote?.weight) / quote?.locked
                    : base?.weight > 0
                    ? (base?.amount * base?.weight) / base?.locked
                    : 0)
            );
        }, 0);
    }, [props?.tokens, tokens, asset, pair]);

    const handleTokenValidate = (address?: string) => {
        if (address === asset?.address && validate?.state) return;
        let check: Validate = { state: false };
        if (!!address && address !== "" && address !== "0" && address !== "0x") {
            const pattern = /^[a-zA-Z0-9]+$/;
            if (!address?.startsWith("0x"))
                check = { state: true, message: "The typed address form of a Token Contract is Invalid." };
            else if (!pattern.test(address))
                check = { state: true, message: "The unacceptable charater is used in address form." };
            else if (address?.length < 42) check = { state: true, message: "The address is too short." };
            else if (address?.length > 42) check = { state: true, message: "The address is too long." };
        }
        setValidate(check);
        if (address !== asset?.address) setAsset(() => ({ address }));
    };

    const handleAddPair = (v: any) => {
        setPair((state: any[]) => [...(state && state), { ...v, amount: 0 }]);
    };

    const handleRemovePair = (target: any) => {
        setPair((state) => state?.filter(({ address }: any) => address !== target));
    };

    const maxValue = useCallback(() => {
        const pairs = pair?.map((p) => {
            const value = parseNumber(p?.value);
            const balance = parseNumber(p?.balance?.amount);
            return {
                address: p?.address?.toLowerCase(),
                total: balance * value,
                value,
            };
        });
        const max_value = Math.max(...pairs?.map(({ total }) => total));
        const min_value = Math.min(...pairs?.map(({ total }) => total));
        return min_value > 0 && min_value < max_value ? min_value : max_value;
    }, [pair]);

    const maxAmount = useCallback(
        (address: string) => {
            const target = pair?.find((p) => p?.address?.toLowerCase() === address?.toLowerCase());
            const max = maxValue();
            return max && !isNaN(max) ? max / parseNumber(target?.value) : undefined;
        },
        [pair, maxValue],
    );

    const handleChangeAmount = (address: string, amount: string) => {
        const max_amount = maxAmount(address);
        const a = parseNumber(amount);
        const v = parseNumber(pair?.find((p) => p?.address?.toLowerCase() === address?.toLowerCase())?.value);
        const c = a * v;
        if (!(max_amount && a > max_amount)) setCurrentValue(c);
        setPair((state) =>
            state?.map((s) => ({
                ...s,
                amount:
                    s?.address?.toLowerCase() === address?.toLowerCase()
                        ? max_amount && a > max_amount
                            ? max_amount
                            : amount
                        : max_amount && a > max_amount
                        ? maxAmount(s?.address)
                        : c / parseNumber(s?.value),
            })),
        );
    };

    const validating = () => {
        if (!asset?.amount) return false;
        const quantity = parseNumber(asset?.amount);
        if (isNaN(quantity)) return false;
        if (quantity <= 0) return false;
        let validate = true;
        let pairs = pair;
        pair?.map((p) => {
            const amount = parseNumber(p?.amount);
            if (p?.address?.toLowerCase() === asset?.address?.toLowerCase() || !p?.amount || isNaN(amount) || amount <= 0) {
                validate = false;
                pairs = pairs?.map((s: any) =>
                    s?.address?.toLowerCase() === p?.address?.toLowerCase()
                        ? { ...s, amount: parseNumber(amount), error: true, message: "Invalid amount." }
                        : s,
                );
            }
        });
        if (!validate) {
            setPair(pairs);
            return false;
        }
        return true;
    };

    const handleListing = async (e: any) => {
        if (!validating()) return;
        setLoading(true);
        try {
            if (typeof props?.onProcess === "function") await props?.onProcess(e);
        } catch {
            setProcess(false);
        }
        setLoading(false);
    };

    const handleBack = (e: any) => {
        if (typeof props?.onBack === "function") props?.onBack(e);
        setLoading(false);
        setProcess(null);
    };

    const handleClose = (e: any) => {
        if (typeof props?.onClose === "function") props?.onClose(e);
        setLoading(false);
        setProcess(null);
    };

    useEffect(() => {
        if (!!address && address !== "" && address !== "0" && address !== "0x" && address.length === 42)
            (async () => {
                let error: string | undefined;
                try {
                    setFetching(true);
                    if (typeof props?.onAsset === "function") await props?.onAsset();
                } catch (e: any) {
                    setValidate({
                        state: true,
                        message: error || "This token cannot used to be listing.",
                    });
                } finally {
                    setFetching(false);
                }
            })();
    }, [asset?.address]);

    const [handleAmountPad, closeAmountPad, resetAmountPad] = usePortal(({ title, asset, onChange }: any) => (
        <></>
        // <Vault.BottomSheets.OrderPad
        //     placeholder={"0"}
        //     label={title}
        //     value={asset?.amount}
        //     unit={asset?.symbol}
        //     max={asset?.balance?.amount}
        //     button={{
        //         children: "OK",
        //         onClick: () => closeAmountPad(),
        //     }}
        //     onChange={(e: any, v: any) => typeof onChange === "function" && onChange(e, v)}
        //     onClose={() => closeAmountPad()}
        //     zIndex={200}
        // />
    ));

    return (
        <Modals.Process
            width={
                process === null && !loading && asset?.validate && pair?.length > 0
                    ? windowWidth > Root.Device.Tablet
                        ? 96
                        : 64
                    : 64
            }
            title={"Listing"}
            process={process}
            content={
                <Layouts.Col gap={2} fill>
                    <Elements.Text height={2} opacity={0.6} align={"center"}>
                        {asset?.validate ? "Please input amount to be list" : "Please enter the token address to be list."}
                    </Elements.Text>
                    <Layouts.Contents.InnerContent scroll>
                        <Layouts.Row responsive={"tablet"} fix>
                            <Layouts.Col
                                gap={2}
                                style={{
                                    ...(asset?.validate &&
                                        pair?.length > 0 &&
                                        windowWidth <= Root.Device.Tablet && { flex: "initial" }),
                                }}>
                                <Layouts.Col gap={1}>
                                    <Elements.Text type={"desc"} align={"left"}>
                                        Token Address
                                    </Elements.Text>
                                    <Controls.Input
                                        placeholder={"0xA1z2b3Y4C5x6d7E8..."}
                                        onChange={(e: any, v: string) => handleTokenValidate(v)}
                                        value={asset?.address}
                                        error={validate?.state}
                                        message={{
                                            color: "red",
                                            children: validate?.message,
                                        }}
                                        left={
                                            fetching || asset?.validate
                                                ? {
                                                      children: (
                                                          <Elements.Icon
                                                              icon={
                                                                  asset?.validate
                                                                      ? "check-bold"
                                                                      : validate?.state
                                                                      ? "x"
                                                                      : "loading"
                                                              }
                                                              color={asset?.validate && "green"}
                                                              style={{
                                                                  ...(!asset?.validate &&
                                                                      !validate?.state && { opacity: 0.45 }),
                                                              }}
                                                          />
                                                      ),
                                                  }
                                                : {
                                                      style: { maxWidth: 0, opacity: 0 },
                                                  }
                                        }
                                        right={
                                            asset?.address &&
                                            asset?.address?.length > 0 && {
                                                style: { pointerEvents: "initial" },
                                                children: (
                                                    <Controls.Button
                                                        icon={"x"}
                                                        onClick={() => {
                                                            setAsset({});
                                                            setPair([]);
                                                        }}
                                                    />
                                                ),
                                            }
                                        }
                                        autoFocus
                                        lock={fetching || asset?.validate}
                                    />
                                </Layouts.Col>
                                {asset?.validate && asset?.balance?.amount > 0 && (
                                    <>
                                        <Layouts.Col gap={1}>
                                            <Layouts.Row gap={1} fix>
                                                <Elements.Text type={"desc"} fit>
                                                    Balance:{" "}
                                                </Elements.Text>
                                                <Elements.Text type={"desc"} align={"right"} opacity={1} fix>
                                                    {format(asset?.balance?.amount || 0, "currency", {
                                                        unit: 9,
                                                        limit: 12,
                                                    })}
                                                </Elements.Text>
                                            </Layouts.Row>
                                            <Controls.Input
                                                type={"currency"}
                                                align={"right"}
                                                placeholder={"0"}
                                                value={asset?.amount}
                                                max={asset?.balance?.amount}
                                                onChange={(e: any, v: any) =>
                                                    setAsset((state: any) => ({ ...state, amount: v }))
                                                }
                                                // onFocus={() => isMobile &&
                                                //     handleAmountPad({
                                                //         asset,
                                                //         title: 'Quantity',
                                                //         onChange: (e: any, v: any) => setAsset((state: any) => ({ ...state, amount: v }))
                                                //     })
                                                // }
                                                // inputMode={isMobile ? 'none' : undefined}
                                                left={{
                                                    children: <span>Quantity</span>,
                                                }}
                                                right={{
                                                    width: 10,
                                                    children: (
                                                        <Elements.Text style={{ justifyContent: "flex-start" }}>
                                                            {asset?.symbol || "???"}
                                                        </Elements.Text>
                                                    ),
                                                }}
                                                autoFocus
                                            />
                                            {asset?.amount && asset?.amount !== "" && (
                                                <Layouts.Row gap={1} fix>
                                                    <Elements.Text type={"desc"} fit>
                                                        Value:{" "}
                                                    </Elements.Text>
                                                    <Elements.Text type={"desc"} align={"right"} opacity={1} fix>
                                                        ${" "}
                                                        {format(
                                                            asset?.value
                                                                ? parseNumber(asset?.amount) * parseNumber(asset?.value)
                                                                : currentValue > 0
                                                                ? currentValue * (pair?.length || 1)
                                                                : 0,
                                                            "currency",
                                                            {
                                                                unit: 9,
                                                                limit: 12,
                                                            },
                                                        )}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                            )}
                                        </Layouts.Col>
                                        {pair?.length > 0 && (
                                            <>
                                                <Layouts.Divider gap={1}>
                                                    <Elements.Icon icon={"plus-small"} scale={0.75} />
                                                </Layouts.Divider>
                                                {pair?.map((p: any, i: number) => (
                                                    <Layouts.Col key={p?.address || i} gap={1}>
                                                        <Layouts.Row gap={1} fix>
                                                            <Elements.Text type={"desc"} fit>
                                                                Balance:{" "}
                                                            </Elements.Text>
                                                            <Elements.Text type={"desc"} align={"right"} opacity={1} fix>
                                                                {format(p?.balance?.amount || 0, "currency", {
                                                                    unit: 9,
                                                                    limit: 12,
                                                                })}
                                                            </Elements.Text>
                                                        </Layouts.Row>
                                                        <Controls.Input
                                                            type={"currency"}
                                                            align={"right"}
                                                            placeholder={"0"}
                                                            value={p?.amount}
                                                            max={maxAmount(p?.address)}
                                                            onChange={(e: any, v: string) => {
                                                                address?.toLowerCase() === p?.address?.toLowerCase() &&
                                                                    handleChangeAmount(p?.address, v);
                                                            }}
                                                            onFocus={() => setAddress(p?.address)}
                                                            left={{
                                                                style: { paddingLeft: ".5em" },
                                                                children: <Elements.Avatar size={2.5} img={p?.logo} />,
                                                            }}
                                                            right={{
                                                                width: 10,
                                                                children: (
                                                                    <Layouts.Row gap={0} align={"center"} fix>
                                                                        <Elements.Text
                                                                            align={"left"}
                                                                            opacity={0.6}
                                                                            style={{ paddingLeft: ".5em" }}
                                                                            fix>
                                                                            {p?.symbol}
                                                                        </Elements.Text>
                                                                        <Controls.Button
                                                                            icon={"x"}
                                                                            onClick={() => handleRemovePair(p?.address)}
                                                                            fit
                                                                        />
                                                                    </Layouts.Row>
                                                                ),
                                                            }}
                                                            error={p?.error}
                                                            message={{
                                                                color: "red",
                                                                children: p?.message,
                                                            }}
                                                            autoFocus
                                                        />
                                                        {/* {(p?.amount && p?.amount !== '') && (
                                                            <Layouts.Row gap={1} fix>
                                                                <Elements.Text type={'desc'} fit>
                                                                    Value:{' '}
                                                                </Elements.Text>
                                                                <Elements.Text type={'desc'} align={'right'} opacity={1} fix>
                                                                    $ {format(parseNumber(p?.amount) * parseNumber(p?.value), 'currency', {
                                                                        unit: 9,
                                                                        limit: 12,
                                                                    })}
                                                                </Elements.Text>
                                                            </Layouts.Row>
                                                        )} */}
                                                    </Layouts.Col>
                                                ))}
                                            </>
                                        )}
                                        {keyTokens?.length > 0 && (
                                            <>
                                                <Layouts.Divider />
                                                <Controls.Dropdown
                                                    keyName={"symbol"}
                                                    imgName={"logo"}
                                                    option={{ icon: "plus-small-bold", symbol: "Select Key Token to Pair" }}
                                                    options={keyTokens}
                                                    onClickItem={(e: any, v: any, k: number) => handleAddPair(v)}
                                                    theme={theme === "light" ? "dark" : "light"}
                                                />
                                            </>
                                        )}
                                    </>
                                )}
                            </Layouts.Col>
                            {asset?.validate && pair?.length > 0 && (
                                <Layouts.Box
                                    padding={1}
                                    style={{
                                        background: "rgba(var(--white),var(--o0045))",
                                        height: "0",
                                        maxHeight: "max-content",
                                        ...(windowWidth > Root.Device.Tablet && { maxWidth: "calc(50% - 4em)" }),
                                        ...(asset?.validate &&
                                            pair?.length > 0 &&
                                            windowWidth <= Root.Device.Tablet && { minHeight: "initial" }),
                                    }}>
                                    <Layouts.Col gap={1} fill>
                                        <Layouts.Contents.InnerContent>
                                            <Layouts.Col gap={1} fill>
                                                <Elements.Text type={"desc"} fit>
                                                    Pairs
                                                </Elements.Text>
                                                <Layouts.Contents.InnerContent scroll>
                                                    <Layouts.Col gap={1} fill>
                                                        {pair?.map((p: any, i: number) => (
                                                            <Controls.Card
                                                                key={p?.address || i}
                                                                padding={1}
                                                                style={{ background: "rgba(var(--white),var(--o0045))" }}>
                                                                <Layouts.Col gap={1}>
                                                                    <Layouts.Col gap={0.5}>
                                                                        <Layouts.Row gap={1}>
                                                                            <Elements.Text type={"desc"} fit>
                                                                                {asset?.symbol}
                                                                            </Elements.Text>
                                                                            <Elements.Text type={"desc"} align={"right"}>
                                                                                {parseNumber(asset?.amount || 0) / pair?.length}
                                                                            </Elements.Text>
                                                                        </Layouts.Row>
                                                                        <div
                                                                            style={{
                                                                                height: "1em",
                                                                                width: `${Math.max(
                                                                                    1,
                                                                                    ((parseNumber(asset?.amount || 0) /
                                                                                        pair?.length) *
                                                                                        100) /
                                                                                        max,
                                                                                )}%`,
                                                                                backgroundColor: `#${HexToColor(
                                                                                    asset?.address,
                                                                                )}`,
                                                                                transition: ".3s ease",
                                                                            }}
                                                                        />
                                                                    </Layouts.Col>
                                                                    <Layouts.Col gap={0.5}>
                                                                        <Layouts.Row gap={1}>
                                                                            <Elements.Text type={"desc"} fit>
                                                                                {p?.symbol || "???"}
                                                                            </Elements.Text>
                                                                            <Elements.Text type={"desc"} align={"right"}>
                                                                                {p?.amount || 0}
                                                                            </Elements.Text>
                                                                        </Layouts.Row>
                                                                        <div
                                                                            style={{
                                                                                height: "1em",
                                                                                width: `${
                                                                                    Math.max(
                                                                                        1,
                                                                                        parseNumber(p?.amount || 0) * 100,
                                                                                    ) / max
                                                                                }%`,
                                                                                backgroundColor: `#${HexToColor(p?.address)}`,
                                                                                transition: ".3s ease",
                                                                            }}
                                                                        />
                                                                    </Layouts.Col>
                                                                </Layouts.Col>
                                                            </Controls.Card>
                                                        ))}
                                                    </Layouts.Col>
                                                </Layouts.Contents.InnerContent>
                                            </Layouts.Col>
                                        </Layouts.Contents.InnerContent>
                                        <Layouts.Divider />
                                        <Layouts.Col gap={1}>
                                            <Elements.Text type={"desc"} align={"left"}>
                                                Estimate earning reward:
                                            </Elements.Text>
                                            <Layouts.Row gap={1} align={"center"} style={{ padding: ".5em" }} fix>
                                                <Elements.Avatar
                                                    img={props?.standard?.logo}
                                                    name="MECA"
                                                    character={1}
                                                    hideName
                                                    size={2.5}
                                                />
                                                <Layouts.Row gap={2} fix>
                                                    <Elements.Text align={"right"} fix>
                                                        {estimate ? format(estimate, "currency") : "Cannot Estimate"}
                                                    </Elements.Text>
                                                    <Elements.Text align={"left"} opacity={0.3} fit>
                                                        MECA
                                                    </Elements.Text>
                                                </Layouts.Row>
                                            </Layouts.Row>
                                        </Layouts.Col>
                                    </Layouts.Col>
                                </Layouts.Box>
                            )}
                        </Layouts.Row>
                    </Layouts.Contents.InnerContent>
                    <Layouts.Row gap={windowWidth <= Root.Device.Tablet ? 2 : undefined} fix>
                        <Controls.Button onClick={(e: any) => handleClose(e)}>Close</Controls.Button>
                        {asset?.validate && pair?.length > 0 && (
                            <Controls.Button onClick={(e: any) => handleListing(e)}>Listing</Controls.Button>
                        )}
                    </Layouts.Row>
                </Layouts.Col>
            }
            failure={{
                message: "Processing has failed.",
                children: <Controls.Button onClick={(e: any) => handleBack(e)}>Go Back</Controls.Button>,
            }}
            loading={{
                active: loading,
                message: "Please wait until the processing is complete.",
            }}
            success={{
                message: "Processing succeeded.",
                children: <Controls.Button onClick={(e: any) => handleClose(e)}>OK</Controls.Button>,
            }}
            onClose={(e: any) => handleClose(e)}
            close
        />
    );
}
