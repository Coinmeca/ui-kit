"use client";

import { Controls, Elements, Layouts } from "components";
import { Modal } from "containers";
import { usePortal } from "hooks";
import { Capitalize, Format } from "lib/utils";
import { useEffect, useState } from "react";

interface Asset {
    type?: number;
    symbol?: string;
    amount?: number;
    value?: number;
    weight?: number;
    need?: number;
    markets?: string[];
}

interface Market {
    base: string;
    quote: string;
    name: string;
    price: number;
}

interface User {
    name?: string;
    initial?: number;
    assets: Asset[];
}

// const init = {
//     values: [
//         { symbol: "MECA", value: 1 },
//         { symbol: "ETH", value: 2 },
//         { symbol: "DAI", value: 1 },
//         { symbol: "USDT", value: 1 },
//         { symbol: "USDC", value: 1 },
//     ] as Asset[],
//     users: [
//         {
//             assets: [
//                 { symbol: "ETH", amount: 10 },
//                 { symbol: "DAI", amount: 10 },
//                 { symbol: "USDT", amount: 10 },
//             ],
//         },
//     ],
// };

interface TokenType {
    [x: number | string | symbol]: number;
}

const token: TokenType = {
    high: 0,
    medium: 1,
    low: 2,
};

const init = {
    supply: 20,
    values: [
        { type: token.high, symbol: "MECA", value: 2 },
        { type: token.high, symbol: "ETH", value: 2 },
        { type: token.high, symbol: "DAI", value: 1 },
        { type: token.high, symbol: "USDT", value: 1 },
        { type: token.high, symbol: "USDC", value: 1 },
    ],
    vault: [
        { symbol: "ETH", amount: 100, weight: 200, markets: ["ETH/DAI", "ETH/USDT"] },
        { symbol: "DAI", amount: 100, weight: 100, markets: ["ETH/DAI"] },
        { symbol: "USDT", amount: 100, weight: 100, markets: ["ETH/USDT"] },
    ],
    markets: [
        { name: "ETH/DAI", base: "ETH", quote: "DAI", price: 2 },
        { name: "ETH/USDT", base: "ETH", quote: "USDT", price: 2 },
    ],
    users: [
        {
            name: "User 0",
            assets: [{ symbol: "MECA", amount: 400 }],
        },
        {
            name: "User 1",
            assets: [
                { symbol: "SHIT", amount: 100 },
                { symbol: "DAI", amount: 100 },
                { symbol: "USDC", amount: 100 },
                { symbol: "USDT", amount: 100 },
            ],
        },
    ],
};

export default function Page() {
    const [values, setValues] = useState<Asset[]>(init.values || []);
    // let vault = (init.vault || []);
    const [vault, setVault] = useState<Asset[]>(init.vault || []);
    const [market, setMarket] = useState<Market[]>(init.markets || []);
    const [users, setUsers] = useState<User[]>(init.users || []);
    const [user, setUser] = useState<number | undefined>(0);
    const [supply, setSupply] = useState<number>(init.supply || 0);
    const [tvl, setTVL] = useState(0);
    const [last, setLast] = useState<number>(0);
    const [totalWeight, setTotalWeight] = useState<number>(0);
    const least: number = 0.000000000000000001;

    const Formatter = (props: { data?: Asset[]; vault?: boolean }) => {
        const formatter = (data: Asset[]) => {
            return (
                data &&
                data?.length > 0 &&
                data?.map((asset: Asset) => {
                    const base = [
                        {
                            align: "left",
                            children: <Elements.Text>{asset?.symbol}</Elements.Text>,
                        },
                        {
                            align: "right",
                            children: <Elements.Text>{Format(asset?.amount, "currency", { unit: 9, limit: 12, fix: 3 })}</Elements.Text>,
                        },
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
                                              <Elements.Text>{Format(asset?.need, "currency", { unit: 9, limit: 12, fix: 3 })}</Elements.Text>
                                          </>,
                                      ],
                                  typeof asset?.weight !== "undefined" &&
                                      asset?.weight > 0 && [
                                          <>
                                              <Elements.Text>Weight:</Elements.Text>
                                          </>,
                                          <>
                                              <Elements.Text>{Format(asset?.weight, "currency", { unit: 9, limit: 12, fix: 3 })}</Elements.Text>
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
                                      return {
                                          ...a,
                                          amount: (a?.amount || 0) + (asset?.amount || 0),
                                      };
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
                            : [
                                  ...state,
                                  {
                                      ...asset,
                                      amount: typeof asset?.amount === "number" ? asset?.amount : 0,
                                  },
                              ];
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
                                                return {
                                                    symbol: a?.symbol?.toUpperCase(),
                                                    amount: a?.amount! + asset?.amount!,
                                                };
                                            } else {
                                                return a;
                                            }
                                        }),
                                    ],
                                };
                            } else {
                                return {
                                    ...u,
                                    assets: [
                                        ...u?.assets,
                                        {
                                            ...asset,
                                            amount: typeof asset?.amount === "number" ? asset?.amount : 0,
                                        },
                                    ],
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

    const handleRemoveAsset = (type: "vault" | "user", asset: Asset, index?: number) => {
        switch (type) {
            case "vault":
                if (asset?.amount && asset?.amount > 0) {
                    setVault((state: Asset[]) => {
                        const exist = state?.find((a: Asset) => a?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase());
                        return exist
                            ? state?.map((a: Asset) => {
                                  if (a?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase()) {
                                      return {
                                          ...a,
                                          amount: (a?.amount || 0) - (asset?.amount || 0),
                                      };
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
                            : [
                                  ...state,
                                  {
                                      ...asset,
                                      amount: typeof asset?.amount === "number" ? asset?.amount : 0,
                                  },
                              ];
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
                                                return {
                                                    symbol: a?.symbol?.toUpperCase(),
                                                    amount: a?.amount! - asset?.amount!,
                                                };
                                            } else {
                                                return a;
                                            }
                                        }),
                                    ],
                                };
                            } else {
                                return {
                                    ...u,
                                    assets: [
                                        ...u?.assets,
                                        {
                                            ...asset,
                                            amount: typeof asset?.amount === "number" ? asset?.amount : 0,
                                        },
                                    ],
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

    const estimate = (base: string, amount: number, quote = "MECA") => {
        let token = (assets: Asset[], symbol: string) => {
            return assets?.find((f: Asset) => f?.symbol?.toUpperCase() === symbol.toUpperCase());
        };

        const b = (base === "MECA" ? token(values, base) : token(vault, base)) || token(values, base);
        const q = (quote === "MECA" ? token(values, quote) : token(vault, quote)) || token(values, quote);

        if (!b || !q) return 0;
        return typeof b?.weight === "undefined" ? (b?.amount || 0 + amount * b?.value!) / q?.value! : (b?.weight / (b?.amount || 1)) * amount;
    };

    const exchange = (base: string, amount: number, quote = "MECA") => {
        const b = (base === "MECA" ? values : vault)?.find((f: Asset) => f?.symbol?.toUpperCase() === base.toUpperCase());
        const q = (quote === "MECA" ? values : vault)?.find((f: Asset) => f?.symbol?.toUpperCase() === quote.toUpperCase());

        if (!b || !q) return undefined;
        let rate: number =
            (((b?.amount || 0) + amount) / (b?.weight || 1)) * amount * (((b?.amount || 0) + amount || 1) / ((b?.amount || 0) - (b?.need || 0) || 1));
        rate = rate * (supply / (supply + rate)) * 0.99;
        return rate;
    };

    const deposit = (...args: [Asset, number] | [Asset, number, boolean | number | undefined] | [Asset, number, boolean | number, number]) => {
        const asset: Asset = args[0];
        const user: number = args[1];
        const lp: boolean = args.length >= 3 && typeof args[2] === "boolean" ? args[2] : true;
        const weight: number | undefined =
            args.length === 4 && typeof args[3] === "number" ? args[3] : args.length === 3 && typeof args[2] === "number" ? args[2] : undefined;

        const exist = vault?.find((f: Asset) => f?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase());

        const amount = asset?.amount!;
        const mint =
            typeof weight === "number"
                ? weight
                : (typeof exist === "object" ? exchange(asset?.symbol!, asset?.amount!) : estimate(asset?.symbol!, asset?.amount!)) || 0;

        if (lp) setSupply((state: number) => state + mint);

        setVault((state: Asset[]) =>
            exist
                ? [
                      ...state?.map((f: Asset) => {
                          return f?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase()
                              ? { ...f, amount: (f?.amount || 0) + amount, need: (f?.need || 0) - amount, weight: (f?.weight || 0) + mint }
                              : f;
                      }),
                  ]
                : [...state, { ...asset, weight: mint }]
        );

        setUsers((state: User[]) =>
            state?.map((u: User, i: number) => {
                if (i === user) {
                    const exist = u?.assets?.find((f: Asset) => f?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase());
                    const meca = u?.assets?.find((f: Asset) => f?.symbol?.toUpperCase() === "MECA");
                    let assets = u?.assets;

                    assets = exist
                        ? [
                              ...assets?.map((f: Asset) => {
                                  return f?.symbol?.toUpperCase() !== exist?.symbol?.toUpperCase() ? f : { ...f, amount: (f?.amount || 0) - amount };
                              }),
                          ]
                        : [...assets, { ...asset, amount: -amount }];

                    if (lp) {
                        assets = meca
                            ? [
                                  ...assets.map((f: Asset) => {
                                      return f?.symbol?.toUpperCase() === "MECA" ? { ...f, amount: (f?.amount || 0) + mint } : f;
                                  }),
                              ]
                            : [...assets, { symbol: "MECA", amount: mint }];
                    }
                    return { ...u, assets };
                } else {
                    return u;
                }
            })
        );

        return mint;
    };

    const withdraw = (burn: number, symbol: string, user: number, lp = true) => {
        // const weight = vault?.find((f: Asset) => f?.symbol?.toUpperCase() === symbol?.toUpperCase())?.weight || 1 / burn;
        // burn = burn > weight ? weight : burn;
        console.log(burn);
        const asset = vault?.find((f: Asset) => f?.symbol?.toUpperCase() === symbol?.toUpperCase());
        const type = values?.find((f: Asset) => f?.symbol?.toUpperCase() === symbol?.toUpperCase())?.type;
        if (!asset) return;
        if (!asset?.amount || asset?.amount === 0 || !asset?.weight || asset?.weight === 0) return;

        // math
        let w = 0;
        console.log(asset?.symbol, type);

        const weight = asset?.weight || least;
        const balance = asset?.amount || least;

        let test = 3;
        switch (test) {
            case 0: {
                w = ((weight - burn || 1) / balance) * burn * ((weight - burn || 1) / weight);
                break;
            }
            case 1: {
                w = (weight / ((asset?.amount || 0) + burn)) * burn * ((weight - burn || 1) / weight);
                break;
            }
            case 2: {
                w = (balance / (weight + burn)) * burn * weight - burn * ((weight > burn ? weight - burn : 1) / weight);
                break;
            }
            case 3: {
                w = (balance / (weight + burn)) * burn * weight - burn * (weight / (weight + burn));
                break;
            }
            case 4: {
                w = (balance / (weight + burn)) * burn * weight - burn * (weight / (weight + burn));
                break;
            }
        }
        // let w = ((asset?.amount || 1) / ((asset?.weight || 0) + burn)) * burn * (((asset?.weight || 0) - burn) / (asset?.weight || 1));
        // const amount = w * 0.99;
        console.log("supply", supply);
        console.log("w", w);
        const amount = parseFloat((w * ((supply - w < 0 ? 1 : supply - w) / supply) * 0.99)?.toFixed(18));

        // console.log(!weight || !amount);
        // if (!weight || !amount) return;
        if (lp) setSupply(supply - burn);

        setVault((state: Asset[]) => [
            ...state?.map((f: Asset) => {
                return f?.symbol?.toUpperCase() !== asset?.symbol?.toUpperCase()
                    ? f
                    : {
                          ...f,
                          amount: (f?.amount || 0) - amount,
                          need: (f?.need || 0) + amount,
                          weight: type === token.high ? parseFloat((f?.weight || 0)?.toFixed(18)) - burn : parseFloat((f?.weight || 0)?.toFixed(18)) + burn,
                      };
                // : { ...f, amount: (f?.amount || 0) - amount, need: (f?.need || 0) + amount, weight: (f?.weight || 0) - burn };
                //  : { ...f, amount: (f?.amount || 0) - amount, need: (f?.need || 0) + amount, weight: (f?.weight || 0) + burn };
            }),
        ]);

        setUsers((state: User[]) => [
            ...state?.map((u: User, i: number) => {
                if (i === user) {
                    const exist = u?.assets?.find((f: Asset) => f?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase());
                    const meca = u?.assets?.find((f: Asset) => f?.symbol?.toUpperCase() === "MECA");
                    let assets = u?.assets;
                    assets = exist
                        ? [
                              ...assets?.map((f: Asset) => {
                                  return f?.symbol?.toUpperCase() !== exist?.symbol?.toUpperCase()
                                      ? f
                                      : { ...exist, amount: parseFloat((exist?.amount || 0)?.toFixed(18)) + amount };
                              }),
                          ]
                        : [...assets, { ...asset, amount: amount }];

                    if (lp) {
                        assets = meca
                            ? [
                                  ...assets.map((f: Asset) => {
                                      return f?.symbol?.toUpperCase() === "MECA" ? { ...f, amount: parseFloat((f?.amount || 0).toString()) - burn } : f;
                                  }),
                              ]
                            : [...assets, { symbol: "MECA", amount: 0 }];
                    }
                    return { ...u, assets };
                } else {
                    return u;
                }
            }),
        ]);
    };

    const AddAssetModal = (props: { type: "vault" | "user"; index?: number }) => {
        const [symbol, setSymbol] = useState<string | undefined>();
        const [amount, setAmount] = useState<number | undefined>();
        const [value, setValue] = useState<number | undefined>();
        const [tab, setTab] = useState<string>("");
        const [type, setType] = useState<string>(Object.keys(token)[0]);

        return (
            <Modal title={`Add Asset for ${Capitalize(props?.type)}${props?.index ? ` ${props?.index}` : ""}`} onClose={() => closeAddAssetModal()} close>
                <Layouts.Col gap={2}>
                    {props?.type === "vault" && (
                        <Layouts.Row>
                            <Controls.Tab active={tab === "token"} onClick={() => setTab("token")}>
                                Token
                            </Controls.Tab>
                            <Controls.Tab active={tab === "key"} onClick={() => setTab("key")}>
                                Key Token
                            </Controls.Tab>
                        </Layouts.Row>
                    )}
                    <Controls.Input
                        placeholder={" "}
                        align={"right"}
                        value={symbol}
                        onChange={(e: any, v: any) => setSymbol(v)}
                        left={{
                            children: <Elements.Text>Symbol</Elements.Text>,
                        }}
                    />
                    <Controls.Input
                        placeholder={0}
                        align={"right"}
                        // value={amount}
                        onChange={(e: any, v: any) => setAmount(parseFloat(v))}
                        left={{
                            children: <Elements.Text>Amount</Elements.Text>,
                        }}
                    />
                    {tab === "key" && (
                        <Controls.Input
                            placeholder={0}
                            align={"right"}
                            // value={value}
                            onChange={(e: any, v: any) => setValue(parseFloat(v))}
                            left={{
                                children: <Elements.Text>Value</Elements.Text>,
                            }}
                            right={{
                                children: (
                                    <Controls.Dropdown option={type} options={Object.keys(token)} onClickItem={(e: any, v: string, k: number) => setType(v)} />
                                ),
                            }}
                        />
                    )}
                    <Controls.Button
                        onClick={() => {
                            handleAddAsset(
                                props?.type,
                                {
                                    type: token[`${type}`],
                                    symbol: symbol?.toUpperCase(),
                                    amount: amount,
                                    value: value,
                                },
                                props?.index
                            );
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
        const [colors, setColors] = useState<string[]>([]);

        const handleAddFilter = (pair: Asset) => {
            if (!pair) return;
            if (pair?.symbol === "") return;
            const exist = filter?.find((f: Asset) => f?.symbol?.toUpperCase() === pair?.symbol?.toUpperCase());
            setFilter(
                exist
                    ? filter
                    : [
                          ...filter,
                          {
                              symbol: values?.find((f: Asset) => f?.symbol?.toUpperCase() === pair?.symbol?.toUpperCase())?.symbol,
                              amount: 0,
                          },
                      ]
            );
            setColors([...colors, [...Array(6)].map(() => Math.floor(Math.random() * 16).toString(16)).join("")]);
        };

        const handleChangeListingPairAmount = (v: number, t: Asset) => {
            const amount = v;
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
            let mint = 0;
            let v = vault;
            let u = users;
            let m: Market[] = [];
            let p = supply;
            filter?.map((a: Asset) => {
                if ((a?.amount || 0) > 0) {
                    const exist = v?.find((f: Asset) => f?.symbol?.toUpperCase() === a?.symbol?.toUpperCase());
                    const need = exist ? parseFloat((exist?.need || 0).toString()) : 0;
                    const hold = exist ? parseFloat((exist?.amount || 0).toString()) : 0;
                    const weight = exist ? parseFloat((exist?.weight || 0).toString()) : 0;
                    const amount = a?.amount || least;

                    // (100 / 200 + 100) * 100 * (200 + 0 + 100) / (200 + 100)
                    const n = need < 0 && Math.abs(hold) < Math.abs(need) ? least : need;

                    // let rate = exist ? (weight / (hold + amount)) * amount * ((hold + n) / (hold + amount)) : estimate(a?.symbol!, a?.amount!);
                    let rate = exist ? (weight / hold) * amount : estimate(a?.symbol!, a?.amount!);
                    // rate = rate * (p / (p + rate)) * 0.99;
                    // let rate = estimate(a?.symbol!, a?.amount!);
                    // console.log(rate);
                    // mint = rate * 0.99;
                    // mint += deposit(a, user!, exist ? undefined : estimate(a?.symbol!, a?.amount!));

                    const market = {
                        base: `${asset?.symbol}`,
                        quote: `${a?.symbol}`,
                        name: `${asset?.symbol}/${a?.symbol}`,
                        price: (a?.amount || 1) / (asset?.amount || 1),
                    };

                    m.push(market);
                    v = exist
                        ? [
                              ...v?.map((f: Asset) =>
                                  f?.symbol?.toUpperCase() === a?.symbol?.toUpperCase()
                                      ? {
                                            ...f,
                                            amount: (f?.amount || 0) + parseFloat((a?.amount || 0).toString()),
                                            weight: ((f?.weight || 0) + rate) * (supply / (supply + rate)),
                                            need: (f?.need || 0) < 0 ? (f?.need || 0) + (a?.amount || 0) : f?.need || 0,
                                            markets: f?.markets
                                                ? [...f?.markets?.filter((m: string) => m?.toLowerCase() !== market.name?.toUpperCase()), market.name]
                                                : [market.name],
                                        }
                                      : { ...f, weight: (f?.weight || 0) * (supply / (supply + rate)) }
                              ),
                          ]
                        : [
                              ...v,
                              {
                                  ...a,
                                  amount: a?.amount || 0,
                                  weight: rate,
                                  markets: a?.markets
                                      ? [...a?.markets?.filter((m: string) => m?.toLowerCase() !== market.name?.toUpperCase()), market.name]
                                      : [market.name],
                              },
                          ];

                    u = [
                        ...u?.map((s: User, i: number) => {
                            return i === user
                                ? {
                                      ...s,
                                      assets: [
                                          ...s?.assets?.map((f: Asset) =>
                                              f?.symbol?.toUpperCase() === a?.symbol?.toUpperCase() ? { ...f, amount: (f?.amount || 0) - (a?.amount || 0) } : f
                                          ),
                                      ],
                                  }
                                : s;
                        }),
                    ];
                    mint += rate * (supply / (supply + rate));
                }
            });

            const valuated = values?.find((f: Asset) => f?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase());
            setMarket((state: Market[]) => [...state, ...m]);
            setValues((state: Asset[]) =>
                valuated
                    ? state?.map((f: Asset) =>
                          f?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase()
                              ? {
                                    symbol: asset?.symbol?.toUpperCase(),
                                    value:
                                        filter?.reduce((a, b) => {
                                            const value = values?.find((f: Asset) => f?.symbol?.toUpperCase() === b?.symbol?.toUpperCase());
                                            return a + (b?.amount || 0) * (value?.value || 0);
                                        }, 0) / (asset?.amount || 1),
                                }
                              : f
                      )
                    : [
                          ...state,
                          {
                              symbol: asset?.symbol?.toUpperCase(),
                              value:
                                  filter?.reduce((a, b) => {
                                      const value = values?.find((f: Asset) => f?.symbol?.toUpperCase() === b?.symbol?.toUpperCase());
                                      return a + (b?.amount || 0) * (value?.value || 0);
                                  }, 0) / (asset?.amount || 1),
                          },
                      ]
            );
            setVault([
                ...v,
                {
                    ...asset,
                    amount: asset?.amount || 0,
                    weight: (asset?.weight || 0) + mint,
                    markets: asset?.markets
                        ? [
                              ...asset?.markets?.filter(
                                  (f: string) => f?.toLowerCase() === m?.find((r: Market) => r?.name?.toUpperCase())?.name?.toUpperCase()
                              ),
                              ...m?.map((f: Market) => f?.name?.toUpperCase()),
                          ]
                        : [...m?.map((f: Market) => f?.name?.toUpperCase())],
                },
            ]);
            // mint = mint * (filter?.length + 1);
            setUsers([
                ...u?.map((s: User, i: number) => {
                    if (i === user) {
                        const meca = s?.assets?.find((f: Asset) => f?.symbol?.toUpperCase() === "MECA");
                        return meca
                            ? {
                                  ...s,
                                  assets: [
                                      ...s?.assets?.map((f: Asset) =>
                                          f?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase()
                                              ? { ...f, amount: (f?.amount || 0) - (asset?.amount || 0) }
                                              : f?.symbol?.toUpperCase() === "MECA"
                                              ? { ...f, amount: (f?.amount || 0) + mint }
                                              : f
                                      ),
                                  ],
                              }
                            : {
                                  ...s,
                                  assets: [
                                      ...s?.assets?.map((f: Asset) =>
                                          f?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase()
                                              ? { ...f, amount: (f?.amount || 0) - (asset?.amount || 0) }
                                              : f
                                      ),
                                      { symbol: "MECA", amount: mint },
                                  ],
                              };
                    } else return s;
                }),
            ]);
            setSupply((state: number) => state + mint);
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
                users[user!]?.assets?.filter(
                    (u: Asset) =>
                        u?.symbol?.toUpperCase() !== "MECA" &&
                        u?.symbol?.toUpperCase() !== asset?.symbol?.toUpperCase() &&
                        vault?.find((f: Asset) => f?.symbol?.toUpperCase() === u?.symbol?.toUpperCase())
                )
            );
        }, [asset, filter]);

        const [list, setList] = useState<Asset[]>([]);
        useEffect(() => {
            if (typeof user !== "undefined") {
                setList(
                    users[user]?.assets?.filter((a: Asset) => {
                        const exist = vault?.find((f: Asset) => f?.symbol?.toUpperCase() === a?.symbol?.toUpperCase());
                        if (!exist && a?.symbol?.toUpperCase() !== "MECA") return a;
                        else return undefined;
                    })
                );
            }
        }, [users, user]);

        const [max, setMax] = useState<number>(1);
        useEffect(() => {
            const a = [{ asset, amount: asset?.amount! / filter.length }, ...filter];
            if (a.length > 0) {
                setMax(Math.max(...a.map((a: Asset | undefined) => a?.amount || 0)));
            }
        }, [asset, filter]);

        const condition =
            values?.filter((f: Asset) => f?.symbol?.toUpperCase() !== "MECA")?.length > 0 ||
            vault?.filter((f: Asset) => f?.type === token.high)?.length > 0 ||
            user;

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
                                            // value={asset?.amount}
                                            onChange={(e: any, v: any) => handleChangeListingAmount(v)}
                                            max={users[user]?.assets?.find((f: Asset) => f?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase())?.amount}
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
                                                                max={
                                                                    users[user]?.assets?.find(
                                                                        (f: Asset) => f?.symbol?.toLocaleUpperCase() === a?.symbol?.toUpperCase()
                                                                    )?.amount || 0
                                                                }
                                                                left={{
                                                                    children: <Elements.Text>{a?.symbol?.toUpperCase()}</Elements.Text>,
                                                                }}
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
                                    {tokens && tokens?.length > 0 && tokens?.length !== filter?.length && (
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
                                    {asset || (filter && filter?.length > 0) ? (
                                        <>
                                            <Layouts.Col gap={4}>
                                                {filter?.map((f: Asset, i: number) => (
                                                    <Layouts.Col key={i} gap={1}>
                                                        {asset && (
                                                            <Layouts.Col gap={0.5}>
                                                                <Layouts.Row>
                                                                    <Elements.Text align={"left"}>{asset?.symbol?.toUpperCase()}</Elements.Text>
                                                                    <Elements.Text type={"desc"} align={"right"} opacity={0.6}>
                                                                        {(asset?.amount || filter.length) / filter.length} {asset?.symbol?.toUpperCase()}
                                                                    </Elements.Text>
                                                                </Layouts.Row>
                                                                <div
                                                                    style={{
                                                                        height: "1em",
                                                                        backgroundImage: `linear-gradient(rgba(255,255,255,.3), rgba(255,255,255,.3))`,
                                                                        backgroundSize: `${((asset?.amount || 1) * 100) / filter?.length / max}% 100%`,
                                                                        backgroundPosition: "left center",
                                                                        backgroundRepeat: "no-repeat",
                                                                    }}
                                                                />
                                                            </Layouts.Col>
                                                        )}
                                                        <Layouts.Col key={i} gap={0.5}>
                                                            <Layouts.Row>
                                                                <Elements.Text align={"left"}>{f?.symbol?.toUpperCase()}</Elements.Text>
                                                                <Elements.Text type={"desc"} align={"right"} opacity={0.6}>
                                                                    {f?.amount || 0} {f?.symbol?.toUpperCase()}
                                                                </Elements.Text>
                                                            </Layouts.Row>
                                                            <div
                                                                style={{
                                                                    height: "1em",
                                                                    backgroundImage: `linear-gradient(#${colors[i] || "fff"}, #${colors[i] || "fff"})`,
                                                                    backgroundSize: `${((f?.amount || 1) * 100) / max}% 100%`,
                                                                    backgroundPosition: "left center",
                                                                    backgroundRepeat: "no-repeat",
                                                                }}
                                                            />
                                                        </Layouts.Col>
                                                    </Layouts.Col>
                                                ))}
                                            </Layouts.Col>
                                        </>
                                    ) : (
                                        <Layouts.Contents.InnerContent
                                            style={{
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
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

    const DepositModal = () => {
        const assets = users[user!]?.assets?.filter((f: Asset) => f?.symbol?.toUpperCase() !== "MECA");
        const [asset, setAsset] = useState<number>(0);
        const [amount, setAmount] = useState<number>(0);
        const [repeat, setRepeat] = useState<number>(1);

        const run = (lp = true) => {
            if (typeof user === "undefined") return;
            if (!assets[asset]?.amount || assets[asset]?.amount === 0) {
                console.log("deposit: not enough amount");
                return;
            }
            let u = users;
            let v = vault;
            let p = supply;
            let rate = 0;
            let mint = 0;
            let total = 0;

            const ast = { ...assets[asset], amount: parseFloat(amount.toString()) };
            const type = values?.find((f: Asset) => f?.symbol?.toUpperCase() === ast?.symbol?.toUpperCase())?.type;
            const exist = v?.find((f: Asset) => f?.symbol?.toUpperCase() === ast?.symbol?.toUpperCase());
            const balance = u?.find((u: User, i) => user === i)?.assets?.find((f: Asset) => f?.symbol?.toUpperCase() === ast?.symbol?.toUpperCase());
            let amt = amount;
            // if (type !== token.high) {
            amt = parseFloat((amount * repeat > (balance?.amount || 0) ? ((balance?.amount || least) - least || least) / repeat : amount).toString());
            // }
            console.log(ast?.symbol, type);
            [...Array(repeat)].map(() => {
                const base = ast?.symbol?.toUpperCase();
                const quote = "MECA";
                if (exist) {
                    const b = (base === "MECA" ? values : v)?.find((f: Asset) => f?.symbol?.toUpperCase() === base?.toUpperCase());
                    const q = (quote === "MECA" ? values : v)?.find((f: Asset) => f?.symbol?.toUpperCase() === quote.toUpperCase());

                    if (!b || !q) return undefined;
                    // switch (type) {
                    //     case token.high: {
                    //         rate =
                    //             (((b?.amount || 0) + amt) / (b?.weight || 1)) *
                    //             amt *
                    //             (((b?.amount || 0) + (b?.need || 0) || 1) / ((b?.amount || 0) + (b?.amount || 0) || 1));
                    //     }
                    //     case token.medium: {
                    //         rate =
                    //             (((b?.amount || 0) + amt) / (b?.weight || 1)) *
                    //             amt *
                    //             (((b?.amount || 0) + amt || 1) / ((b?.amount || 0) - (b?.need || 0) || 1));
                    //         break;
                    //     }
                    //     default: {
                    //         rate =
                    //             ((b?.weight || 1) / ((b?.amount || 0) + amt)) *
                    //             amt *
                    //             (((b?.amount || 0) + (b?.need || 0) || 1) / ((b?.amount || 0) + (b?.amount || 0) || 1));
                    //         break;
                    //     }
                    // }
                    const need = parseFloat((b?.need || 0).toString());
                    const hold = parseFloat((b?.amount || 0).toString());
                    const weight = parseFloat((b?.weight || least).toString()) * (supply / totalWeight);
                    const n = need < 0 && Math.abs(hold) < Math.abs(need) ? least : need;

                    // rate = (weight / (hold + amt)) * amt * ((hold + need + amt) / (hold + amt));
                    rate = (weight / (hold + amt)) * amt * ((hold + n) / (hold + amt));
                    // rate = (weight / (hold + amt)) * amt;
                    // mint = rate * (p / (p + rate)) * 0.99;
                    mint = rate * 0.99;
                    // console.log("mint", {
                    //     rate: ((b?.amount || 0) + amount) / (b?.weight || 1),
                    //     weight: ((b?.amount || 0) + amount || 1) / ((b?.amount || 0) - (b?.need || 0) || 1),
                    //     mint: mint,
                    // });
                    // console.log("mint", mint);
                    total += parseFloat(mint.toString());
                } else {
                    let token = (a: Asset[], symbol: string) => a?.find((f: Asset) => f?.symbol?.toUpperCase() === symbol.toUpperCase());
                    const b = (base === "MECA" ? token(values, base) : token(v, base!)) || token(values, base!);
                    const q = (quote === "MECA" ? token(values, quote) : token(v, quote)) || token(values, quote);

                    if (!b || !q) return 0;
                    return typeof b?.weight === "undefined" ? (b?.amount || 0 + amt * b?.value!) / q?.value! : (b?.weight / (b?.amount || 1)) * amt;
                }

                v = exist
                    ? [
                          ...v?.map((f: Asset) =>
                              f?.symbol?.toUpperCase() === ast?.symbol?.toUpperCase()
                                  ? {
                                        ...f,
                                        amount: parseFloat((f?.amount || 0).toString()) + amt,
                                        // need: f?.key && (f?.need || 0) < 0 ? (amount - (f?.need || 0) > 0 ? 0 : (f?.need || 0) - amount) : f?.need,
                                        need: (f?.need || 0) - amt,
                                        weight: (f?.weight || 0) * ((p + mint) / p),
                                        // weight: parseFloat((f?.weight || 0).toString()) * ((supply + parseFloat(mint?.toString())) / supply),
                                        // weight: ((f?.weight || 0) * ((f?.weight || 0) + mint)) / (f?.weight || least),
                                    }
                                  : { ...f, weight: (f?.weight || 0) * ((p + mint) / p) }
                          ),
                      ]
                    : [...v, { ...ast, weight: mint }];
                if (lp) p += mint;
            });

            u = u?.map((u: User, i: number) => {
                if (i === user) {
                    const exist = u?.assets?.find((f: Asset) => f?.symbol?.toUpperCase() === ast?.symbol?.toUpperCase());
                    const meca = u?.assets?.find((f: Asset) => f?.symbol?.toUpperCase() === "MECA");
                    let assets = u?.assets;

                    assets = exist
                        ? [
                              ...assets?.map((f: Asset) => {
                                  return f?.symbol?.toUpperCase() === exist?.symbol?.toUpperCase() ? { ...f, amount: (f?.amount || 0) - amt * repeat } : f;
                              }),
                          ]
                        : [...assets, { ...ast, amount: -(amt * repeat) }];

                    if (lp)
                        assets = meca
                            ? [
                                  ...assets.map((f: Asset) => {
                                      return f?.symbol?.toUpperCase() === "MECA" ? { ...f, amount: parseFloat((f?.amount || 0).toString()) + total } : f;
                                  }),
                              ]
                            : [...assets, { symbol: "MECA", amount: total }];

                    return { ...u, assets };
                } else {
                    return u;
                }
            });
            console.log("user", user, "-> ", parseFloat(total.toString()), "MECA");
            // setSupply((state: number) => state + mint);
            setSupply(p);
            setVault(v);
            setUsers(u);
        };

        useEffect(() => {
            if (asset && typeof assets[asset]?.amount! === "number" && typeof amount === "number") {
                assets[asset]?.amount! < amount ? setAmount(assets[asset]?.amount!) : setAmount(amount);
            }
        }, [asset, amount]);

        return (
            <Modal width={64} title={`Deposit`} onClose={() => closeDepositModal()} close>
                <Layouts.Col gap={2} fill>
                    {vault?.length > 0 ? (
                        typeof user !== "undefined" ? (
                            assets[asset] && assets?.length > 0 ? (
                                <>
                                    <Layouts.Col gap={1} fill>
                                        <Elements.Text type={"desc"} align="left">
                                            Balance: {`${assets[asset]?.amount || 0}`}
                                        </Elements.Text>
                                        <Controls.Input
                                            placeholder={"amount"}
                                            type="currency"
                                            // value={amount}
                                            onChange={(e: any, v: any) => setAmount(parseFloat(v))}
                                            max={assets[asset]?.amount}
                                            align={"right"}
                                            right={{
                                                children: (
                                                    <Controls.Dropdown
                                                        option={assets[asset]}
                                                        options={assets}
                                                        keyName={"symbol"}
                                                        onClickItem={(e: any, v: Asset, k: number) => setAsset(k)}
                                                    />
                                                ),
                                            }}
                                        ></Controls.Input>
                                    </Layouts.Col>
                                    {assets[asset] && (
                                        <>
                                            <Controls.Input
                                                placeholder={"repeat"}
                                                type="number"
                                                // value={repeat}
                                                onChange={(e: any, v: any) => setRepeat(parseFloat(v))}
                                                align={"right"}
                                                right={{
                                                    children: <Elements.Text opacity={0.6}>Repeat</Elements.Text>,
                                                }}
                                            />
                                            <Controls.Button
                                                onClick={() => {
                                                    run();
                                                    closeDepositModal();
                                                }}
                                            >
                                                Deposit
                                            </Controls.Button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Elements.Text type="strong">{`User ${user} doesn't have any asset.`}</Elements.Text>
                                    <Controls.Button onClick={closeDepositModal}>Close</Controls.Button>
                                </>
                            )
                        ) : (
                            <>
                                <Elements.Text type="p">There is no selected user.</Elements.Text>
                                <Controls.Button onClick={closeDepositModal}>Close</Controls.Button>
                            </>
                        )
                    ) : (
                        <>
                            <Elements.Text type="p">There is no asset can deposit.</Elements.Text>
                            <Controls.Button onClick={closeDepositModal}>Close</Controls.Button>
                        </>
                    )}
                </Layouts.Col>
            </Modal>
        );
    };
    const [handleDepositModal, closeDepositModal] = usePortal(<DepositModal />);

    const WithdrawModal = () => {
        const [burn, setBurn] = useState<number>(0);
        const [asset, setAsset] = useState<Asset>();
        const exist = users[user!]?.assets?.find((f: Asset) => f?.symbol?.toUpperCase() === "MECA");
        const [type, setType] = useState(0);
        const [repeat, setRepeat] = useState<number>(1);

        const run = (lp = true) => {
            // const weight = vault?.find((f: Asset) => f?.symbol?.toUpperCase() === symbol?.toUpperCase())?.weight || 1 / burn;
            // burn = burn > weight ? weight : burn;
            console.log(burn);
            const type = values?.find((f: Asset) => f?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase())?.type;
            if (!asset) return;
            if (!asset?.amount || asset?.amount === 0 || !asset?.weight || asset?.weight === 0) return;

            let u = users;
            let v = vault;
            let p = supply;
            let w = 0;
            let ast = v?.find((f: Asset) => f?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase());
            // math
            console.log(asset?.symbol, type);
            // let amt = amount;
            // if (type !== token.high) {
            //     amt =
            //         amount * repeat > (exist?.amount || 0)
            //             ? ((exist?.amount || least * 2) - least) / repeat
            //             : amount * repeat > (assets[asset]?.amount || 0)
            //             ? (assets[asset]?.amount || least) / repeat
            //             : amount;
            // }
            let total = 0;
            [...Array(repeat)].map(() => {
                ast = v?.find((f: Asset) => f?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase());
                const need = parseFloat((ast?.need || 0).toString());
                const weight = parseFloat((ast?.weight || least).toString()) * (supply / totalWeight);
                const hold = parseFloat((ast?.amount || least).toString());
                // const b = burn >= (ast?.weight || least) ? (ast?.weight || least) - least || least : burn;
                const b = parseFloat(burn.toString());
                if (b === least) return;

                let test = 3;
                // w = (hold / (weight + b || 1)) * b;
                w = (hold / (weight + b)) * b;
                // w = (b * hold) / weight;
                w = w * ((hold - w) / (hold + need));
                // w = w * (weight / (weight + burn));
                // console.log((hold - w) / (hold + need), (hold + need - w) / (hold + need));
                // w = w * ((p - b) / p) * 0.99;
                w = w * 0.99;
                // switch (test) {
                //     case 0: {
                //         w = ((weight - burn || 1) / balance) * burn * ((weight - burn || 1) / weight);
                //         break;
                //     }
                //     case 1: {
                //         w = (weight / ((asset?.amount || 0) + burn)) * burn * ((weight - burn || 1) / weight);
                //         break;
                //     }
                //     case 2: {
                //         w = (balance / (weight + burn)) * burn * weight - burn * ((weight > burn ? weight - burn : 1) / weight);
                //         break;
                //     }
                //     case 3: {
                //         w = (balance / (weight + burn)) * burn * weight - burn * (weight / (weight + burn));
                //         break;
                //     }
                //     case 4: {
                //         w = (balance / (weight + burn)) * burn * weight - burn * (weight / (weight + burn));
                //         break;
                //     }
                // }
                // // let w = ((asset?.amount || 1) / ((asset?.weight || 0) + burn)) * burn * (((asset?.weight || 0) - burn) / (asset?.weight || 1));
                // const amount = w * 0.99;
                const amount = w;
                total += amount;
                // const amount = parseFloat((w * ((supply - burn < 0 ? 1 : supply - burn) / supply) * 0.99)?.toFixed(18));

                // console.log(!weight || !amount);
                // if (!weight || !amount) return;
                // console.log(weight);
                v = v?.map(
                    (f: Asset) =>
                        f?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase()
                            ? {
                                  ...f,
                                  amount: (f?.amount || 0) - amount,
                                  need: (f?.need || 0) + amount,
                                  weight: weight * ((p - b) / p),
                                  //   weight: (f?.weight || least) * ((f?.weight || least) / ((f?.weight || 0) + burn)),
                                  // weight: (f?.weight || least) * ((hold - amount) / hold),
                                  //   weight: (f?.weight || least) * (hold / (hold + amount)),
                                  //   type === token.high ? parseFloat((f?.weight || 0)?.toFixed(18)) - burn : parseFloat((f?.weight || 0)?.toFixed(18)) + burn,
                              }
                            : { ...f, weight: (f?.weight || least) * ((p - b) / p) }
                    // : { ...f, amount: (f?.amount || 0) - amount, need: (f?.need || 0) + amount, weight: (f?.weight || 0) - burn };
                    //  : { ...f, amount: (f?.amount || 0) - amount, need: (f?.need || 0) + amount, weight: (f?.weight || 0) + burn };
                );

                u = u?.map((u: User, i: number) => {
                    if (i === user) {
                        const exist = u?.assets?.find((f: Asset) => f?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase());
                        const meca = u?.assets?.find((f: Asset) => f?.symbol?.toUpperCase() === "MECA");
                        let assets = u?.assets;
                        assets = exist
                            ? [
                                  ...assets?.map((f: Asset) => {
                                      return f?.symbol?.toUpperCase() !== exist?.symbol?.toUpperCase()
                                          ? f
                                          : { ...exist, amount: (exist?.amount || 0) + amount };
                                  }),
                              ]
                            : [...assets, { ...asset, amount: amount }];

                        if (lp) {
                            assets = meca
                                ? [
                                      ...assets.map((f: Asset) => {
                                          return f?.symbol?.toUpperCase() === "MECA" ? { ...f, amount: (f?.amount || 0) - b } : f;
                                      }),
                                  ]
                                : [...assets, { symbol: "MECA", amount: 0 }];
                        }
                        return { ...u, assets };
                    } else {
                        return u;
                    }
                });
                p = p - b;
            });
            console.log("user", user, "-> ", parseFloat(total.toString()), asset?.symbol?.toUpperCase());

            setSupply(p);
            setVault(v);
            setUsers(u);
        };

        useEffect(() => {
            setType(values?.find((f: Asset) => f?.symbol?.toUpperCase() === asset?.symbol?.toUpperCase())?.type || token.low);
        }, [asset]);

        return (
            <Modal width={64} title={`Withdraw`} onClose={() => closeWithdrawModal()} close>
                <Layouts.Col gap={2} fill>
                    {typeof exist === "object" ? (
                        <>
                            <Layouts.Col gap={0.5}>
                                <Elements.Text type="desc" align="left">
                                    Balance: {exist?.amount || 0}
                                </Elements.Text>
                                <Controls.Input
                                    placeholder={"amount"}
                                    left={{
                                        children: (
                                            <Controls.Dropdown
                                                keyName={"symbol"}
                                                options={vault.filter((f: Asset) => f?.weight && f?.weight > 0)}
                                                onClickItem={(e: any, v: Asset, k: number) => setAsset(v)}
                                            />
                                        ),
                                    }}
                                    align={"right"}
                                    type={"number"}
                                    // value={burn}
                                    onChange={(e: any, v: any) => setBurn(parseFloat(v))}
                                    max={400}
                                    right={{
                                        children: (
                                            <Elements.Text type="strong" opacity={0.6}>
                                                MECA
                                            </Elements.Text>
                                        ),
                                    }}
                                />
                            </Layouts.Col>
                            <Controls.Input
                                placeholder={"repeat"}
                                type="number"
                                // value={repeat}
                                onChange={(e: any, v: any) => setRepeat(parseFloat(v))}
                                align={"right"}
                                right={{
                                    children: <Elements.Text opacity={0.6}>Repeat</Elements.Text>,
                                }}
                            ></Controls.Input>
                            <Controls.Button
                                onClick={() => {
                                    // withdraw(amount, asset?.symbol!, user!);
                                    run();
                                    closeWithdrawModal();
                                }}
                            >
                                Withdraw
                            </Controls.Button>
                        </>
                    ) : (
                        <Elements.Text type="strong">There is no selected user.</Elements.Text>
                    )}
                </Layouts.Col>
            </Modal>
        );
    };
    const [handleWithdrawModal, closeWithdrawModal] = usePortal(<WithdrawModal />);

    const getTick = (price: number) => {
        let zero = false;
        const decimals = price.toString()?.replaceAll(",", "")?.split(".");
        return parseFloat(
            (decimals?.length > 1
                ? 10 **
                  -decimals[1]?.split("")?.reduce((a: number, b: string) => {
                      if (!zero && b === "0") {
                          return a + 1;
                      } else {
                          zero = true;
                          return a;
                      }
                  }, 1)
                : 10 ** (decimals[0]?.length - 4)
            ).toString()
        );
    };

    const convert = (amount: number, price: number, direction: boolean) => {
        return direction ? amount / price : amount * price;
    };

    const getLiquidity = (base: string, quote: string) => {
        const b = vault?.find((f: Asset) => f?.symbol?.toUpperCase() === base?.toUpperCase());
        const q = vault?.find((f: Asset) => f?.symbol?.toUpperCase() === quote?.toUpperCase());
        // return ((q?.amount || 0) * ((b?.weight || 1) / (b?.markets?.length || 1))) / (q?.weight || 1) / (q?.markets?.length || 1);
        const b_weight = (b?.weight || least) * (supply / totalWeight);
        const q_weight = (q?.weight || least) * (supply / totalWeight);
        return ((q?.amount || 0) * b_weight) / (b?.markets?.length || 0) / q_weight;
        // return ((q?.amount || 1) * (b?.weight || 1)) / (q?.weight || 1) / (q?.markets?.length || 1);
    };

    const order = (market: string, amount: number, liquidity: number, price: number, direction: boolean) => {
        let i = 0;
        let tick = getTick(price);
        let range = 0;
        let rate = 0;
        let length = 0;
        let d = 0;
        let a = 0;
        let perTick = 0;
        let tl = 0;
        if (amount >= convert(liquidity, price, !direction)) amount = convert(liquidity, price, !direction) - least;
        let amt = amount;
        let quantity = 0;

        if (convert(liquidity, price, !direction) <= 0) return;
        while (true) {
            liquidity -= perTick;
            price =
                tick?.toString()?.split(".").length > 1 && tick?.toString()?.split(".")[1]
                    ? parseFloat(price.toFixed(tick?.toString()?.split(".")[1].length))
                    : price;
            range = parseFloat((price / tick).toString());
            rate = liquidity / price;
            length = range + i;
            d = -rate * 8 + length / 2;
            a = d / (length / 2) > 1 ? 1 : d / (length / 2) < -1 ? -1 : d / (length / 2);
            perTick = ((liquidity / (3 * range)) * ((range * a - 4 * i * a) / range) + liquidity / range) * (1 + a / (3 - a));
            tl = convert(perTick, price, !direction);
            if (liquidity > 0) {
                if (amt > tl) {
                    quantity += perTick;
                    amt -= tl;
                } else {
                    quantity += convert(amt, price, !direction);
                    amt = 0;
                    break;
                }
            } else {
                break;
            }

            price = parseFloat((direction ? price + tick : price - tick).toString());
            i++;
        }
        console.log("i", i);
        amount = amount - amt;

        setMarket((state: Market[]) => state?.map((m: Market) => (m?.name?.toUpperCase() === market?.toUpperCase() ? { ...m, price: price } : m)));
        setVault((state: Asset[]) => {
            const b = market?.split("/")[0]; // ETH
            const q = market?.split("/")[1]; // USDT
            // direction ? quote amount / price = base goal amount : base amount * price = quote goal amount

            // buy = quote ↑ -> ↓ base goal amount
            const base = {
                goal: direction ? getLiquidity(direction ? b : q, direction ? q : b) / price : getLiquidity(direction ? q : b, direction ? b : q) * price,
                hold: getLiquidity(direction ? b : q, direction ? q : b),
            };
            const quote = {
                // goal: direction ? getLiquidity(direction ? q : b, direction ? b : q) * price : getLiquidity(direction ? b : q, direction ? q : b) / price,
                goal: direction ? base.goal * price : base.goal / price,
                hold: getLiquidity(direction ? q : b, direction ? b : q),
            };

            return state?.map((a: Asset) =>
                a?.symbol?.toUpperCase() === (direction ? q : b)?.toUpperCase()
                    ? {
                          ...a,
                          amount: (a?.amount || 0) - quantity,
                          need: base.goal - base.hold,
                      }
                    : a?.symbol?.toUpperCase() === (direction ? b : q)?.toUpperCase()
                    ? { ...a, amount: (a?.amount || 0) + amount, need: quote.goal - quote.hold }
                    : a
            );
        });
        quantity = quantity * 0.99;
        setUsers((state: User[]) =>
            state?.map((u: User, i) => {
                if (i === user) {
                    const exist = u?.assets?.find(
                        (a: Asset) => a?.symbol?.toUpperCase() === (direction ? market?.split("/")[0] : market?.split("/")[1])?.toUpperCase()
                    );
                    return {
                        ...u,
                        assets: exist
                            ? u?.assets?.map((a: Asset) =>
                                  a?.symbol?.toUpperCase() === (direction ? market?.split("/")[0] : market?.split("/")[1])?.toUpperCase()
                                      ? { ...a, amount: (a?.amount || 0) + quantity }
                                      : a?.symbol?.toUpperCase() === (direction ? market?.split("/")[1] : market?.split("/")[0])?.toUpperCase()
                                      ? { ...a, amount: (a?.amount || 0) - amount }
                                      : a
                              )
                            : [
                                  ...u?.assets?.map((a: Asset) =>
                                      a?.symbol?.toUpperCase() === (direction ? market?.split("/")[0] : market?.split("/")[1])?.toUpperCase()
                                          ? { ...a, amount: (a?.amount || 0) + quantity }
                                          : a?.symbol?.toUpperCase() === (direction ? market?.split("/")[1] : market?.split("/")[0])?.toUpperCase()
                                          ? { ...a, amount: (a?.amount || 0) - amount }
                                          : a
                                  ),
                                  { symbol: (direction ? market?.split("/")[0] : market?.split("/")[1]).toUpperCase(), amount: quantity },
                              ],
                    };
                } else {
                    return u;
                }
            })
        );
    };

    const BuyModal = (props: { market: Market }) => {
        const market = props?.market;
        let amount = 0;
        // const [amount, setAmount] = useState<number>(0);
        const exist = users[user!]?.assets?.find((f: Asset) => f?.symbol?.toUpperCase() === market.quote);
        return (
            <Modal width={64} title={`Buy`} onClose={closeBuyModal} close>
                <Layouts.Col gap={2} fill>
                    {typeof exist === "object" ? (
                        <>
                            <Layouts.Col gap={0.5}>
                                <Elements.Text type="desc" align="left">
                                    Balance: {exist?.amount || 0}
                                </Elements.Text>
                                <Controls.Input
                                    placeholder={"amount"}
                                    align={"right"}
                                    type={"number"}
                                    value={amount}
                                    onChange={(e: any, v: any) => (amount = parseFloat(v))}
                                    max={exist?.amount || 0}
                                    right={{
                                        children: (
                                            <Elements.Text type="strong" opacity={0.6}>
                                                {market?.quote?.toUpperCase()}
                                            </Elements.Text>
                                        ),
                                    }}
                                />
                            </Layouts.Col>
                            <Controls.Button
                                onClick={() => {
                                    order(market?.name, amount, getLiquidity(market?.quote, market?.base), market?.price, true);
                                    closeBuyModal();
                                }}
                            >
                                Order
                            </Controls.Button>
                        </>
                    ) : (
                        <Elements.Text type="strong">{`User doesn't have a quote asset for buying.`}</Elements.Text>
                    )}
                </Layouts.Col>
            </Modal>
        );
    };
    const [handleBuyModal, closeBuyModal] = usePortal(BuyModal);

    const SellModal = (props: { market: Market }) => {
        const market = props?.market;
        let amount = 0;
        // const [amount, setAmount] = useState<number>(0);
        const exist = users[user!]?.assets?.find((f: Asset) => f?.symbol?.toUpperCase() === market.base);
        return (
            <Modal width={64} title={`Sell`} onClose={closeSellModal} close>
                <Layouts.Col gap={2} fill>
                    {typeof exist === "object" ? (
                        <>
                            <Layouts.Col gap={0.5}>
                                <Elements.Text type="desc" align="left">
                                    Balance: {exist?.amount || 0}
                                </Elements.Text>
                                <Controls.Input
                                    placeholder={"amount"}
                                    align={"right"}
                                    type={"number"}
                                    value={amount}
                                    onChange={(e: any, v: any) => (amount = parseFloat(v))}
                                    max={exist?.amount || 0}
                                    right={{
                                        children: (
                                            <Elements.Text type="strong" opacity={0.6}>
                                                {market?.base?.toUpperCase()}
                                            </Elements.Text>
                                        ),
                                    }}
                                />
                            </Layouts.Col>
                            <Controls.Button
                                onClick={() => {
                                    order(market?.name, amount, getLiquidity(market?.base, market?.quote), market?.price, false);
                                    closeSellModal();
                                }}
                            >
                                Order
                            </Controls.Button>
                        </>
                    ) : (
                        <Elements.Text type="strong">{`User doesn't have a quote asset for buying.`}</Elements.Text>
                    )}
                </Layouts.Col>
            </Modal>
        );
    };
    const [handleSellModal, closeSellModal] = usePortal(SellModal);

    const handleAddNewUser = () => {
        setUsers((users: any) => [...users, { name: `User ${users.length}`, assets: [] }]);
    };

    const getUserTVL = (index: number) => {
        return users[index]?.assets?.reduce((a, b) => {
            const value = values?.find((f: Asset) => f?.symbol?.toUpperCase() === b?.symbol?.toUpperCase());
            return a + (b?.amount || 0) * (value?.value || 0);
        }, 0);
    };

    const handleSetUserAsset = (index: number) => {
        setUsers((state: User[]) => state?.map((u: User, i: number) => (i === index ? { ...u, initial: getUserTVL(index) } : u)));
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
        setValues((state: Asset[]) =>
            values?.map((a: Asset) => {
                if (a?.symbol?.toUpperCase() === "MECA") {
                    const v = { ...a, value: tvl && supply ? tvl / supply : a?.value };
                    setLast(state?.find((f: Asset) => f?.symbol?.toUpperCase() === "MECA")?.value!);
                    return v;
                }
                return a;
            })
        );
    }, [tvl, supply]);

    useEffect(() => {
        setTotalWeight(vault?.reduce((a: number, b: Asset) => a + parseFloat((b?.weight || least).toString()), 0));
    }, [vault]);

    useEffect(() => {
        setSupply(users?.reduce((a: number, b: User) => a + (b?.assets?.find((f: Asset) => f?.symbol?.toUpperCase() === "MECA")?.amount || 0), 0));
    }, [users]);

    return (
        <Layouts.Box fit>
            <Layouts.Contents.InnerContent>
                <Layouts.Col gap={2} fill>
                    <Layouts.Row gap={1}>
                        <Layouts.Row gap={0.5}>
                            <Elements.Text fix>MECA: ${values?.find((f: Asset) => f?.symbol?.toUpperCase() === "MECA")?.value?.toFixed(3)}</Elements.Text>
                            <Elements.Text
                                color={
                                    values?.find((f: Asset) => f?.symbol?.toUpperCase() === "MECA")?.value! - last > 0
                                        ? "green"
                                        : values?.find((f: Asset) => f?.symbol?.toUpperCase() === "MECA")?.value! - last < 0
                                        ? "red"
                                        : undefined
                                }
                            >
                                {values?.find((f: Asset) => f?.symbol?.toUpperCase() === "MECA")?.value! - last > 0
                                    ? "▲"
                                    : values?.find((f: Asset) => f?.symbol?.toUpperCase() === "MECA")?.value! - last < 0
                                    ? "▼"
                                    : undefined}
                                {(values?.find((f: Asset) => f?.symbol?.toUpperCase() === "MECA")?.value! - last).toFixed(3)}
                            </Elements.Text>
                        </Layouts.Row>
                        <Elements.Text>Value:</Elements.Text>
                        <Elements.Text>Weight: {vault?.reduce((a: number, b: Asset) => a + (b?.weight || 0), 0)}</Elements.Text>
                        <Elements.Text>Total Supply: {supply}</Elements.Text>
                    </Layouts.Row>
                    <Layouts.Divider />
                    <Layouts.Contents.GridContainer direction="row" width={{ min: 16 }} height={5} gap={0.5}>
                        {values
                            ?.filter((f: Asset) => f?.symbol?.toUpperCase() !== "MECA")
                            ?.map((a: Asset, i: number) => (
                                <div key={i}>
                                    <Layouts.Box
                                        padding={0.5}
                                        style={{
                                            ...(a?.type === 0
                                                ? { border: "1px solid white" }
                                                : a?.type === 0
                                                ? { border: "1px solid rgba(255,255,255,0.6)" }
                                                : {}),
                                            width: "auto",
                                            minHeight: "initial",
                                        }}
                                    >
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
                                <Layouts.Col gap={1} fill>
                                    <Layouts.Row gap={1}>
                                        <Controls.Button
                                            type={"solid"}
                                            onClick={() =>
                                                handleAddAssetModal(null, {
                                                    type: "vault",
                                                })
                                            }
                                        >
                                            Add Asset
                                        </Controls.Button>
                                        <Controls.Button type={"solid"} onClick={() => handleListingModal()}>
                                            Listing
                                        </Controls.Button>
                                        <Controls.Button type={"solid"} onClick={() => handleDepositModal()}>
                                            Deposit
                                        </Controls.Button>
                                        <Controls.Button type={"solid"} onClick={() => handleWithdrawModal()}>
                                            Withdraw
                                        </Controls.Button>
                                    </Layouts.Row>
                                    <Layouts.Contents.InnerContent>
                                        <Layouts.Col gap={1}>
                                            {vault?.map((a: Asset, i: number) => (
                                                <Layouts.Box key={i} padding={2} fit>
                                                    <Layouts.Col gap={1}>
                                                        <Layouts.Row>
                                                            <Layouts.Col gap={0}>
                                                                <Elements.Text type={"strong"}>{a?.symbol}</Elements.Text>
                                                                <Elements.Text type={"desc"} opacity={0.6}>
                                                                    1 : {Format((a?.amount || least) / (a?.weight || least), "number", { limit: 10, fix: 3 })}{" "}
                                                                    ($
                                                                    {Format(
                                                                        ((a?.amount || least) / (a?.weight || least)) *
                                                                            (values.find((f: Asset) => f?.symbol?.toUpperCase() === a?.symbol?.toUpperCase())
                                                                                ?.value || least),
                                                                        "number",
                                                                        { limit: 10, fix: 3 }
                                                                    )}
                                                                    )
                                                                </Elements.Text>
                                                            </Layouts.Col>
                                                            <Layouts.Col gap={0}>
                                                                <Elements.Text type={"strong"} align={"right"}>
                                                                    {a?.amount}
                                                                </Elements.Text>
                                                                <Elements.Text type={"desc"} align={"right"} opacity={0.45}>
                                                                    = $
                                                                    {Format(
                                                                        a?.amount! *
                                                                            (values.find((f: Asset) => f?.symbol?.toUpperCase() === a?.symbol?.toUpperCase())
                                                                                ?.value || 1),
                                                                        "number",
                                                                        true,
                                                                        8
                                                                    )}
                                                                </Elements.Text>
                                                            </Layouts.Col>
                                                        </Layouts.Row>
                                                        <Layouts.Row>
                                                            <Layouts.Col gap={0}>
                                                                <Elements.Text type={"desc"} align={"right"} opacity={0.6}>
                                                                    Need
                                                                </Elements.Text>
                                                                <Elements.Text type={"strong"} align={"right"}>
                                                                    {/* {a?.need || 0} */}
                                                                    {Format(a?.need || 0, "number", true, 8)}
                                                                </Elements.Text>
                                                            </Layouts.Col>
                                                            <Layouts.Col gap={0}>
                                                                <Elements.Text type={"desc"} align={"right"} opacity={0.6}>
                                                                    Weight
                                                                </Elements.Text>
                                                                <Elements.Text type={"strong"} align={"right"}>
                                                                    {/* {a?.weight || 0} */}
                                                                    {Format(
                                                                        parseFloat((a?.weight || 0).toString()) * (supply / totalWeight),
                                                                        "number",
                                                                        true,
                                                                        8
                                                                    )}
                                                                </Elements.Text>
                                                            </Layouts.Col>
                                                        </Layouts.Row>
                                                    </Layouts.Col>
                                                </Layouts.Box>
                                            ))}
                                        </Layouts.Col>
                                    </Layouts.Contents.InnerContent>
                                    <Layouts.Divider />
                                    <Layouts.Row gap={0.5}>
                                        <Elements.Text>TVL:</Elements.Text>
                                        <Elements.Text align={"right"}>$ {Format(tvl, "currency", { unit: 9, limit: 12, fix: 3 })}</Elements.Text>
                                    </Layouts.Row>
                                </Layouts.Col>
                            </Layouts.Contents.InnerContent>
                            <Layouts.Divider vertical />
                            <Layouts.Contents.InnerContent>
                                <Layouts.Col gap={1}>
                                    {market?.map((m: Market, i: number) => (
                                        <Layouts.Box key={i} padding={2} fit>
                                            <Layouts.Col gap={0.5}>
                                                <Layouts.Row fill>
                                                    <Elements.Text>{m?.name}</Elements.Text>
                                                    <Elements.Text align="right">
                                                        {m?.price} {m?.quote?.toUpperCase()}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                                <Layouts.Col gap={0}>
                                                    <Layouts.Row fill>
                                                        <Elements.Text opacity={0.6}>{`${m?.base?.toUpperCase()} → ${m?.quote?.toUpperCase()}`}</Elements.Text>
                                                        <Elements.Text align="right">{getLiquidity(m?.base, m?.quote)}</Elements.Text>
                                                    </Layouts.Row>
                                                    <Layouts.Row fill>
                                                        <Elements.Text opacity={0.6}>{`${m?.quote?.toUpperCase()} → ${m?.base?.toUpperCase()}`}</Elements.Text>
                                                        <Elements.Text align="right">{getLiquidity(m?.quote, m?.base)}</Elements.Text>
                                                    </Layouts.Row>
                                                </Layouts.Col>
                                                <Layouts.Row gap={1} fill>
                                                    <Controls.Button type={"solid"} color={"green"} onClick={() => handleBuyModal(null, { market: m })}>
                                                        Buy
                                                    </Controls.Button>
                                                    <Controls.Button type={"solid"} color={"red"} onClick={() => handleSellModal(null, { market: m })}>
                                                        Sell
                                                    </Controls.Button>
                                                </Layouts.Row>
                                            </Layouts.Col>
                                        </Layouts.Box>
                                    ))}
                                </Layouts.Col>
                            </Layouts.Contents.InnerContent>
                            <Layouts.Divider vertical />
                            <Layouts.Contents.InnerContent>
                                <Layouts.Col gap={1} fill>
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
                                                    style={{
                                                        border: user === i ? "1px solid white" : "1px solid transparent",
                                                    }}
                                                >
                                                    <Layouts.Box padding={2}>
                                                        <Layouts.Col gap={1}>
                                                            <Layouts.Col gap={1}>
                                                                <Layouts.Row gap={2} align="center">
                                                                    <Elements.Text align="left">{u.name}</Elements.Text>
                                                                    <Layouts.Row align="right" fit>
                                                                        <Controls.Button
                                                                            icon={"x"}
                                                                            onClick={() =>
                                                                                setUsers((state: User[]) => state.filter((f: User, k: number) => k !== i))
                                                                            }
                                                                        />
                                                                    </Layouts.Row>
                                                                </Layouts.Row>
                                                                <Layouts.Row>
                                                                    <Elements.Text>Start:</Elements.Text>
                                                                    <Elements.Text align={"right"}>
                                                                        $ {Format(u?.initial, "currency", { unit: 9, limit: 12, fix: 3 })}
                                                                    </Elements.Text>
                                                                </Layouts.Row>
                                                                <Layouts.Row>
                                                                    <Elements.Text>PNL:</Elements.Text>
                                                                    <Elements.Text align={"right"} fix>
                                                                        $ {getUserTVL(i) - (u?.initial || 0)}
                                                                        {/* $ {Format(getUserTVL(i) - (u?.initial || 0), "number", true)} */}
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
                                                                <Controls.Button
                                                                    onClick={() =>
                                                                        handleAddAssetModal(null, {
                                                                            type: "user",
                                                                            index: i,
                                                                        })
                                                                    }
                                                                >
                                                                    Add Asset
                                                                </Controls.Button>
                                                                <Controls.Button onClick={() => handleSetUserAsset(i)}>Set</Controls.Button>
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
