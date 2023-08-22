"use client";

import { Controls, Elements, Layouts } from "@coinmeca/ui/components";
import { Modal } from "@coinmeca/ui/containers";
import { usePortal } from "@coinmeca/ui/hooks";
import { Capitalize, Format } from "@coinmeca/ui/lib/utils";
import { useEffect, useState } from "react";

interface Asset {
    key?: boolean;
    symbol?: string;
    amount?: number;
    value?: number;
    weight?: number;
    need?: number;
}

interface Market {
    name: string;
    price: number;
}

interface User {
    name?: string;
    initial?: number;
    assets: Asset[];
}

export default function Page() {
    const [vault, setVault] = useState<Asset[]>([]);
    const [values, setValues] = useState<Asset[]>([{ symbol: "MECA", value: 1 }]);
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<number | undefined>();
    const [meca, setMeca] = useState<number>(0);
    const [tvl, setTVL] = useState(0);
    const [market, setMarket] = useState<Market[]>([]);

    const Formatter = (props: { data?: Asset[]; vault?: boolean }) => {
        const formatter = (data: Asset[]) => {
            return (
                data &&
                data?.length > 0 &&
                data?.map((asset: Asset) => {
                    const base = [
                        { align: "left", children: <Elements.Text>{asset?.symbol}</Elements.Text> },
                        { align: "right", children: <Elements.Text>{asset?.amount}</Elements.Text> },
                    ];

                    return props?.vault
                        ? [
                              ...[
                                  base,
                                  typeof asset?.need !== "undefined" &&
                                      asset?.need > 0 && [
                                          <>
                                              <Elements.Text>Need:</Elements.Text>
                                          </>,
                                          <>
                                              <Elements.Text>{asset?.need}</Elements.Text>
                                          </>,
                                      ],
                                  typeof asset?.weight !== "undefined" &&
                                      asset?.weight > 0 && [
                                          <>
                                              <Elements.Text>Weight:</Elements.Text>
                                          </>,
                                          <>
                                              <Elements.Text>{asset?.weight}</Elements.Text>
                                          </>,
                                      ],
                              ],
                          ]
                        : base;
                })
            );
        };

        return (
            <Layouts.Col>
                <Layouts.List list={formatter(props?.data || [])} />
            </Layouts.Col>
        );
    };

    const handleAddAsset = (type: "vault" | "user", asset: Asset, index?: number) => {
        switch (type) {
            case "vault":
                if (asset?.amount && asset?.amount > 0) {
                    setVault((state: Asset[]) => {
                        const exist = state?.find((a: Asset) => a?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase());
                        return exist
                            ? state?.map((a: Asset) => {
                                  if (a?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase()) {
                                      return { ...a, amount: (a?.amount || 0) + (asset?.amount || 0) };
                                  } else {
                                      return a;
                                  }
                              })
                            : [...state, asset];
                    });
                }
                if (asset?.value && asset?.value > 0) {
                    setValues((state: Asset[]) => {
                        const exist = state?.find((a: Asset) => a?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase());
                        return exist
                            ? state?.map((a: Asset) => {
                                  if (a?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase()) {
                                      return { ...a, value: asset?.value };
                                  } else {
                                      return a;
                                  }
                              })
                            : [...state, { ...asset, amount: typeof asset?.amount === "number" ? asset?.amount : 0 }];
                    });
                }
                break;
            case "user":
                if (typeof index !== "number") return;
                setUsers((state: User[]) =>
                    state?.map((u: User, i: number) => {
                        if (i === index) {
                            const exist = u?.assets?.find((a) => a?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase());
                            if (exist) {
                                return {
                                    ...u,
                                    assets: [
                                        ...u?.assets?.map((a: Asset) => {
                                            if (a?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase()) {
                                                return { symbol: a?.symbol?.toUpperCase(), amount: a?.amount! + asset?.amount! };
                                            } else {
                                                return a;
                                            }
                                        }),
                                    ],
                                };
                            } else {
                                return {
                                    ...u,
                                    assets: [...u?.assets, { ...asset, amount: typeof asset?.amount === "number" ? asset?.amount : 0 }],
                                    initial: asset?.amount || 0 * (values.find((f: Asset) => f?.symbol === asset?.symbol)?.value || 0),
                                };
                            }
                        } else {
                            return u;
                        }
                    })
                );
                break;
        }
    };

    const deposit = (asset: Asset, user: number) => {
        const exist = vault?.find((f: Asset) => f?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase());
        const exchange = values?.find((f: Asset) => f?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase());
        const initial = values?.find((f: Asset) => f?.symbol?.toUpperCase() === "MECA");

        if (!exist && !exchange) return;

        const deposit = asset?.amount! * exchange?.value!;
        const amount = asset?.amount!;
        const mint = (typeof exist?.weight === "undefined" ? deposit / initial?.value! : amount / exist?.weight) * 0.99;

        setMeca(meca + mint);
        setVault((state: Asset[]) =>
            exist
                ? state?.map((a: Asset) => {
                      if (a?.symbol === asset?.symbol) {
                          return {
                              ...a,
                              amount: a?.amount || 0 + amount,
                              need: a?.need || 0 + amount,
                              weight: a?.weight || 0 + mint,
                          };
                      } else {
                          return a;
                      }
                  })
                : [...state, { ...asset, weight: asset?.weight || 0 + mint }]
        );

        setUsers((state: User[]) =>
            state?.map((u: User, i: number) => {
                if (i === user) {
                    const exist = u?.assets?.find((f: Asset) => f?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase());
                    const meca = u?.assets?.find((f: Asset) => f?.symbol?.toUpperCase() === "MECA");
                    let assets = u?.assets;

                    if (exist) {
                        assets = [...assets]?.map((a: Asset) => {
                            if (a?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase()) {
                                return { ...a, amount: a?.amount! - amount };
                            } else {
                                return a;
                            }
                        });
                    } else {
                        assets = [...assets, { ...asset, amount: -amount }];
                    }

                    if (meca) {
                        assets = [...assets]?.map((a: Asset) => {
                            if (a?.symbol?.toUpperCase() === "MECA") {
                                return { ...a, amount: a?.amount! + mint };
                            } else {
                                return a;
                            }
                        });
                    } else {
                        assets = [...assets, { symbol: "MECA", amount: mint }];
                    }

                    return { ...u, assets };
                } else {
                    return u;
                }
            })
        );
    };

    const AddAssetModal = (props: { type: "vault" | "user"; index?: number }) => {
        const [symbol, setSymbol] = useState<string | undefined>();
        const [amount, setAmount] = useState<number | undefined>();
        const [value, setValue] = useState<number | undefined>();
        const [type, setType] = useState<"token" | "key">("token");

        return (
            <Modal title={`Add Asset for ${Capitalize(props?.type)}${props?.index ? ` ${props?.index}` : ""}`} onClose={() => closeAddAssetModal()} close>
                <Layouts.Col gap={2}>
                    {props?.type === "vault" && (
                        <Layouts.Row>
                            <Controls.Tab active={type === "token"} onClick={() => setType("token")}>
                                Token
                            </Controls.Tab>
                            <Controls.Tab active={type === "key"} onClick={() => setType("key")}>
                                Key Token
                            </Controls.Tab>
                        </Layouts.Row>
                    )}
                    <Controls.Input
                        placeholder={" "}
                        align={"right"}
                        value={symbol}
                        onChange={(e: any, v: any) => setSymbol(v)}
                        left={{ children: <Elements.Text>Symbol</Elements.Text> }}
                    />
                    <Controls.Input
                        placeholder={0}
                        align={"right"}
                        value={amount}
                        onChange={(e: any, v: any) => setAmount(Format(v, "number", true) as number)}
                        left={{ children: <Elements.Text>Amount</Elements.Text> }}
                    />
                    {type === "key" && (
                        <Controls.Input
                            placeholder={0}
                            align={"right"}
                            value={value}
                            onChange={(e: any, v: any) => setValue(Format(v, "number", true) as number)}
                            left={{ children: <Elements.Text>Value</Elements.Text> }}
                        />
                    )}
                    <Controls.Button
                        onClick={() => {
                            handleAddAsset(props?.type, { symbol: symbol?.toUpperCase(), amount: amount, value: value }, props?.index);
                            closeAddAssetModal();
                        }}
                    >
                        Add
                    </Controls.Button>
                </Layouts.Col>
            </Modal>
        );
    };
    const [handleAddAssetModal, closeAddAssetModal] = usePortal((props: any) => <AddAssetModal {...props} />);

    const ListingModal = () => {
        const [filter, setFilter] = useState<Asset[]>([]);
        const [tokens, setTokens] = useState<Asset[]>(values);
        const [asset, setAsset] = useState<Asset | undefined>();
        const [value, setValue] = useState(0);

        const handleAddFilter = (pair: Asset) => {
            if (!pair) return;
            if (pair?.symbol === "") return;
            const exist = filter?.find((f: Asset) => f?.symbol?.toUpperCase() === pair?.symbol?.toUpperCase());
            setFilter(
                exist
                    ? filter
                    : [...filter, { symbol: values?.find((f: Asset) => f?.symbol?.toUpperCase() === pair?.symbol?.toUpperCase())?.symbol, amount: 0 }]
            );
        };

        const handleChangeListingPairAmount = (v: number, t: Asset) => {
            const amount = Format(v, "number", true) as number;
            const value = values?.find((a: Asset) => a?.symbol?.toUpperCase() === t?.symbol?.toUpperCase())?.value || 1;

            setFilter((state: Asset[]) =>
                state?.map((f) => {
                    if (f?.symbol?.toUpperCase() === t?.symbol?.toUpperCase()) {
                        return { ...f, amount: amount };
                    } else {
                        const other = values?.find((a: Asset) => a?.symbol?.toUpperCase() === f?.symbol?.toUpperCase())?.value || 1;
                        return { ...f, amount: (amount * value) / other };
                    }
                })
            );
        };

        const handleChangeListingAmount = (v: number) => {
            setAsset({ ...asset, amount: v });
        };

        const handleListing = () => {
            filter?.map((a: Asset) => {
                (a?.amount || 0) > 0 && deposit(a, user!);
                setMarket((state: Market[]) => [...state, { name: `${asset?.symbol}-${a?.symbol}}`, price: (a?.amount || 1) / (asset?.amount || 1) }]);
            });
            handleAddAsset("vault", asset!, user!);
            handleAddAsset("user", { ...asset, amount: -asset?.amount! }, user!);
            closeListingModal();
        };

        useEffect(() => {
            setFilter((state: Asset[]) => state?.filter((f: Asset) => f?.symbol?.toUpperCase() !== asset?.symbol?.toUpperCase()));
        }, [asset]);

        useEffect(() => {
            if (filter && filter?.length > 0)
                setValue(
                    ((filter[0]?.amount || 1) * (values?.find((f) => f?.symbol?.toUpperCase() === filter[0]?.symbol?.toUpperCase())?.value || 1)) /
                        (asset?.amount || 1)
                );
            setTokens(
                values?.filter((a: Asset) => {
                    const exist =
                        filter?.find((f: Asset) => f?.symbol?.toUpperCase() === a?.symbol?.toUpperCase()) ||
                        a?.symbol?.toUpperCase() === asset?.symbol ||
                        a?.symbol?.toUpperCase() === "MECA";
                    if (!exist) return a;
                })
            );
        }, [asset, filter]);

        const [list, setList] = useState<Asset[]>([]);
        useEffect(() => {
            if (typeof user !== "undefined") {
                setList(
                    users[user]?.assets?.filter((a: Asset) => {
                        const exist = vault?.find((f: Asset) => f?.symbol?.toUpperCase() === a?.symbol?.toUpperCase() || f?.symbol?.toUpperCase() === "MECA");
                        if (!exist) return a;
                        else return undefined;
                    })
                );
            }
        }, [users, user]);

        const condition =
            values?.filter((f: Asset) => f?.symbol?.toUpperCase() !== "MECA")?.length > 0 || vault?.filter((f: Asset) => f?.key)?.length > 0 || user;

        return (
            <Modal width={condition ? 96 : 64} title={`Listing`} onClose={() => closeListingModal()} close>
                {condition ? (
                    typeof user === "number" ? (
                        <Layouts.Col gap={2} fill>
                            <Layouts.Row gap={2} fill>
                                <Layouts.Col gap={2} fill>
                                    <Layouts.Col gap={0.5}>
                                        <Elements.Text align={"left"}>
                                            Balance:{" "}
                                            {asset
                                                ? users[user]?.assets?.find((f: Asset) => f?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase())?.amount ||
                                                  0
                                                : "-"}
                                        </Elements.Text>
                                        <Controls.Input
                                            value={asset?.amount}
                                            onChange={(e: any, v: any) => handleChangeListingAmount(v)}
                                            right={{
                                                children: (
                                                    <Controls.Dropdown keyName={"symbol"} onClickItem={(e: any, v: Asset) => setAsset(v)} options={list} />
                                                ),
                                            }}
                                        />
                                        <Elements.Text type={"desc"} align={"left"}>
                                            $ {value}
                                        </Elements.Text>
                                    </Layouts.Col>
                                    {filter &&
                                        filter?.length > 0 &&
                                        filter?.map((a: Asset, i: number) => {
                                            if (a && a?.symbol !== "") {
                                                return (
                                                    <Layouts.Col key={i} gap={0.5}>
                                                        <Elements.Text align={"left"}>
                                                            Balance:{" "}
                                                            {users[user]?.assets?.find((f: Asset) => f?.symbol?.toUpperCase() === a?.symbol?.toUpperCase())
                                                                ?.amount || 0}
                                                        </Elements.Text>
                                                        <Layouts.Row gap={1}>
                                                            <Controls.Input
                                                                placeholder={0}
                                                                value={a?.amount}
                                                                align={"right"}
                                                                onChange={(e: any, v: any) => handleChangeListingPairAmount(v, a)}
                                                                left={{ children: <Elements.Text>{a?.symbol?.toUpperCase()}</Elements.Text> }}
                                                                error={
                                                                    (users[user]?.assets?.find(
                                                                        (f: Asset) => f?.symbol?.toUpperCase() === a?.symbol?.toUpperCase()
                                                                    )?.amount || 0) < (a?.amount || 0)
                                                                }
                                                            />
                                                            <Controls.Button
                                                                icon={"x"}
                                                                onClick={() => {
                                                                    setFilter(
                                                                        filter?.filter((f: Asset) => f?.symbol?.toUpperCase() !== a?.symbol?.toUpperCase())
                                                                    );
                                                                }}
                                                                fit
                                                            />
                                                        </Layouts.Row>
                                                    </Layouts.Col>
                                                );
                                            }
                                        })}
                                    {tokens && tokens?.length > 0 && (
                                        <Controls.Dropdown
                                            placeholder={asset ? "Select Pair" : "Select your asset first"}
                                            keyName={"symbol"}
                                            options={tokens}
                                            onClickItem={(e: any, v: Asset) => handleAddFilter(v)}
                                        />
                                    )}
                                </Layouts.Col>
                                <Layouts.Divider vertical />
                                <Layouts.Box padding={2}>
                                    {filter && filter?.length > 0 ? (
                                        <>
                                            <Layouts.Col>
                                                {filter?.map((f: Asset, i: number) => (
                                                    <Layouts.Col key={i} gap={0.5}>
                                                        <Elements.Text>{f?.symbol?.toUpperCase()}</Elements.Text>
                                                        <div style={{ height: "1em", background: "white", backgroundSize: "100% 100%" }}></div>
                                                    </Layouts.Col>
                                                ))}
                                            </Layouts.Col>
                                        </>
                                    ) : (
                                        <Layouts.Contents.InnerContent style={{ alignItems: "center", justifyContent: "center" }}>
                                            <Elements.Text>There is no selected pair(s) yet.</Elements.Text>
                                        </Layouts.Contents.InnerContent>
                                    )}
                                </Layouts.Box>
                            </Layouts.Row>
                            <Controls.Button onClick={() => handleListing()}>Add</Controls.Button>
                        </Layouts.Col>
                    ) : (
                        <Elements.Text>User not selected.</Elements.Text>
                    )
                ) : (
                    <Elements.Text>No key token has been set yet.</Elements.Text>
                )}
            </Modal>
        );
    };
    const [handleListingModal, closeListingModal] = usePortal(<ListingModal />);

    const handleAddNewUser = () => {
        setUsers((users: any) => [...users, { name: `User ${users.length}`, assets: [] }]);
    };

    const handleSetUserAsset = (index: number) => {
        const initial = users[index]?.assets?.reduce((a, b) => {
            const value = values?.find((f: Asset) => f?.symbol?.toUpperCase() === b?.symbol?.toUpperCase());
            return a + (b?.amount || 0) * (value?.value || 0);
        }, 0);

        setUsers(
            users?.map((u: User, i: number) => {
                if (i === index) {
                    return { ...u, initial: initial };
                } else {
                    return u;
                }
            })
        );
    };

    useEffect(() => {
        let tvl = 0;
        vault?.map((a: Asset) => {
            const exist = values?.find((f: Asset) => f?.symbol?.toUpperCase() === a?.symbol?.toUpperCase());
            if (exist?.value) tvl += (a?.amount || 0) * exist?.value;
        });
        setTVL(tvl);
    }, [vault, values]);

    useEffect(() => {
        setValues(
            values?.map((a: Asset) => {
                if (a?.symbol?.toUpperCase() === "MECA") return { ...a, value: tvl && meca ? tvl / meca : a?.value };
                return a;
            })
        );
    }, [tvl, meca]);

    return (
        <Layouts.Box fit>
            <Layouts.Contents.InnerContent>
                <Layouts.Col gap={2} fill>
                    <Layouts.Row gap={1}>
                        <Elements.Text fix>MECA: ${values?.find((f: Asset) => f?.symbol?.toUpperCase() === "MECA")?.value}</Elements.Text>
                        <Elements.Text>Value:</Elements.Text>
                        <Elements.Text>Total Supply: {meca}</Elements.Text>
                    </Layouts.Row>
                    <Layouts.Divider />
                    <Layouts.Contents.GridContainer direction="row" width={{ min: 16 }} height={4} gap={0.5}>
                        {values
                            ?.filter((f: Asset) => f?.symbol?.toUpperCase() !== "MECA")
                            ?.map((a: Asset, i: number) => (
                                <div key={i}>
                                    <Layouts.Box padding={1}>
                                        <Layouts.Row gap={0.5}>
                                            <Elements.Text>{a?.symbol}</Elements.Text>
                                            <Elements.Text align={"right"}>$ {a?.value}</Elements.Text>
                                        </Layouts.Row>
                                    </Layouts.Box>
                                </div>
                            ))}
                    </Layouts.Contents.GridContainer>
                    <Layouts.Divider />
                    <Layouts.Contents.InnerContent>
                        <Layouts.Row gap={1} fill>
                            <Layouts.Contents.InnerContent>
                                <Layouts.Row gap={1}>
                                    <Controls.Button type={"solid"} onClick={() => handleAddAssetModal(null, { type: "vault" })}>
                                        Add Asset
                                    </Controls.Button>
                                    <Controls.Button type={"solid"} onClick={() => handleListingModal()}>
                                        Listing
                                    </Controls.Button>
                                </Layouts.Row>
                                <Layouts.Contents.InnerContent>
                                    <Formatter data={vault} vault />
                                </Layouts.Contents.InnerContent>
                                <Layouts.Divider />
                                <Layouts.Row gap={0.5}>
                                    <Elements.Text>TVL:</Elements.Text>
                                    <Elements.Text align={"right"}>$ {Format(tvl, "currency", true)}</Elements.Text>
                                </Layouts.Row>
                            </Layouts.Contents.InnerContent>
                            <Layouts.Divider vertical />
                            <Layouts.Col></Layouts.Col>
                            <Layouts.Divider vertical />
                            <Layouts.Contents.InnerContent>
                                <Layouts.Col gap={2} fill>
                                    <Controls.Button type={"solid"} onClick={handleAddNewUser}>
                                        Add New User
                                    </Controls.Button>
                                    <Layouts.Contents.InnerContent style={{ gap: "1em" }} scroll>
                                        {users &&
                                            users?.length > 0 &&
                                            users?.map((u: User, i: number) => (
                                                <div
                                                    key={i}
                                                    onClick={() => {
                                                        if (user !== i) {
                                                            setUser(i);
                                                        } else {
                                                            setUser(undefined);
                                                        }
                                                    }}
                                                    style={{ border: user === i ? "1px solid white" : "1px solid transparent" }}
                                                >
                                                    <Layouts.Box padding={2}>
                                                        <Layouts.Col gap={1}>
                                                            <Layouts.Col gap={1}>
                                                                <Layouts.Row gap={2}>
                                                                    <Elements.Text>User {i}</Elements.Text>
                                                                </Layouts.Row>
                                                                <Layouts.Row>
                                                                    <Elements.Text>Start:</Elements.Text>
                                                                    <Elements.Text align={"right"}>$ {Format(u?.initial, "currency", true)}</Elements.Text>
                                                                </Layouts.Row>
                                                                <Layouts.Row>
                                                                    <Elements.Text>PNL:</Elements.Text>
                                                                    <Elements.Text align={"right"} fix>
                                                                        ${" "}
                                                                        {Format(
                                                                            u?.assets?.reduce((a, b) => {
                                                                                const value = values?.find(
                                                                                    (f: Asset) => f?.symbol?.toUpperCase() === b?.symbol?.toUpperCase()
                                                                                );
                                                                                return a + (b?.amount || 0) * (value?.value || 0);
                                                                            }, 0) - (u?.initial || 0),
                                                                            "currency",
                                                                            true
                                                                        )}
                                                                    </Elements.Text>
                                                                </Layouts.Row>
                                                            </Layouts.Col>
                                                            {u?.assets?.length > 0 && (
                                                                <>
                                                                    <Layouts.Divider />
                                                                    <Layouts.Contents.InnerContent>
                                                                        <Formatter data={u?.assets} />
                                                                    </Layouts.Contents.InnerContent>
                                                                </>
                                                            )}
                                                            <Layouts.Divider />
                                                            <Layouts.Row gap={1}>
                                                                <Controls.Button onClick={() => handleSetUserAsset(i)}>Set</Controls.Button>
                                                                <Controls.Button onClick={() => handleAddAssetModal(null, { type: "user", index: i })}>
                                                                    Add Asset
                                                                </Controls.Button>
                                                            </Layouts.Row>
                                                        </Layouts.Col>
                                                    </Layouts.Box>
                                                </div>
                                            ))}
                                    </Layouts.Contents.InnerContent>
                                </Layouts.Col>
                            </Layouts.Contents.InnerContent>
                        </Layouts.Row>
                    </Layouts.Contents.InnerContent>
                </Layouts.Col>
            </Layouts.Contents.InnerContent>
        </Layouts.Box>
    );
}
