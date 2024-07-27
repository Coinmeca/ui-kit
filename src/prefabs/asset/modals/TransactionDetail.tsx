// "use client";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { getQueryClient } from "api";
// import { GetMarketDetail } from "api/market";
// import { Exchange } from "components";
// import { useContracts } from "contracts";
// import { abi } from "contracts/services/market/abi";
// import { useWeb3Client } from "hooks";
// import { useState } from "react";
// import { Controls, Elements, Layouts } from "components";
// import { Modals } from "containers";
// import { Process } from "containers/modals/process/Process";
// import { format } from "lib/utils";
// import { Address } from "viem";
// import { colorMap } from "../containers/History";

// export interface TransactionDetail extends Omit<Process, "process"> {
//     process?: boolean;
//     data: any;
//     onBack?: Function;
//     onClose: Function;
// }
// export default function TransactionDetail(props: TransactionDetail) {
//     return (
//         <QueryClientProvider client={getQueryClient()}>
//             <Detail {...props} />
//         </QueryClientProvider>
//     );
// }

// function Detail(props: TransactionDetail) {
//     const [loading, setLoading] = useState<boolean>(false);
//     const [process, setProcess] = useState<boolean | null>(null);
//     const [operate, setOperate] = useState<string>("");
//     const data = props?.data;
//     const color = colorMap[data?.category];

//     const { publicClient, walletClient } = useWeb3Client();

//     const { App, Query } = useContracts(walletClient?.chain?.id);
//     const { refetch: refetchHistory } = App.getAllHistory(walletClient?.account?.address);
//     const { refetch: refetchAssets } = Query.assetsOf(walletClient?.account?.address);
//     const { refetch: refetchOrders } = Query.ordersOf(walletClient?.account?.address);

//     const { data: market } = GetMarketDetail(walletClient?.chain?.id as number, data?.market);
//     console.log("data?.market", data?.market, market);

//     const refetch = () => {
//         refetchHistory();
//         refetchAssets();
//         refetchOrders();
//     };

//     const handleBack = (e: any) => {
//         if (typeof props?.onBack === "function") props?.onBack(e);
//         setOperate("");
//         setProcess(null);
//         setLoading(false);
//     };

//     const handleClose = (e: any) => {
//         if (typeof props?.onClose === "function") props?.onClose(e);
//     };

//     const cancel = async () => {
//         console.log("key", props?.data);
//         const { request } = await publicClient!.simulateContract({
//             address: props?.data?.market as Address,
//             abi,
//             functionName: "cancel",
//             args: [props?.data?.key],
//             account: walletClient!.account,
//         });
//         await walletClient!.writeContract(request).then((hash) => {
//             // alert
//         });
//     };

//     // todo
//     const modify = async () => {
//         const { request } = await publicClient!.simulateContract({
//             address: props?.data?.market as Address,
//             abi,
//             functionName: "modify",
//             args: [props?.data?.key],
//             account: walletClient!.account,
//         });
//         await walletClient!.writeContract(request).then((hash) => {
//             // alert
//         });
//     };

//     const claim = async () => {
//         const { request } = await publicClient!.simulateContract({
//             address: props?.data?.market as Address,
//             abi,
//             functionName: "claim",
//             args: [props?.data?.key],
//             account: walletClient!.account,
//         });
//         await walletClient!.writeContract(request).then((hash) => {
//             // alert
//         });
//     };

//     const close = async () => {
//         const { request } = await publicClient!.simulateContract({
//             address: props?.data?.market as Address,
//             abi,
//             functionName: "claim",
//             args: [props?.data?.key],
//             account: walletClient!.account,
//         });
//         await walletClient!.writeContract(request).then((hash) => {
//             // alert
//         });
//     };

//     const liquidate = async () => {
//         const { request } = await publicClient!.simulateContract({
//             address: props?.data?.market as Address,
//             abi,
//             functionName: "liquidate",
//             args: [props?.data?.key],
//             account: walletClient!.account,
//         });
//         await walletClient!.writeContract(request).then((hash) => {
//             // alert
//         });
//     };

//     const handleProcess = async () => {
//         setLoading(true);
//         try {
//             if (operate === "cancel") await cancel();
//             if (operate === "modify") await modify();
//             if (operate === "claim") await claim();
//             if (operate === "close") await close();
//             if (operate === "liquidate") await liquidate();
//             setProcess(true);
//         } catch (e) {
//             console.log(e);
//             setProcess(false);
//         }
//         setLoading(false);
//         refetch();
//     };

//     return (
//         <Modals.Process
//             process={process}
//             title={
//                 operate === ""
//                     ? "Transaction Detail"
//                     : operate === "cancel"
//                     ? "Order Cancellation"
//                     : operate === "modify"
//                     ? "Order Modification"
//                     : operate === "liquidate"
//                     ? "Position Liquidation"
//                     : "Position Close "
//             }
//             content={
//                 <Layouts.Contents.SlideContainer
//                     contents={[
//                         {
//                             active: operate === "",
//                             children: (
//                                 <Layouts.Col gap={2} style={{ height: "100%" }}>
//                                     <Layouts.Contents.InnerContent
//                                         style={{
//                                             fontFeatureSettings: `'tnum' on, 'lnum' on`,
//                                         }}
//                                     >
//                                         <Layouts.Col gap={1}>
//                                             <Layouts.Row gap={1} fix>
//                                                 <Layouts.Col align={"left"} gap={0}>
//                                                     <Elements.Text height={1.5} color={color}>
//                                                         {data?.category}
//                                                     </Elements.Text>
//                                                     <Elements.Text height={1.5} opacity={data?.state === "Pending" ? 1 : 0.3}>
//                                                         {data?.state}
//                                                     </Elements.Text>
//                                                 </Layouts.Col>
//                                                 <Layouts.Col gap={0}>
//                                                     <Elements.Text height={1.5} opacity={0.3} align={"right"}>
//                                                         {data?.date}
//                                                     </Elements.Text>
//                                                     <Elements.Text height={1.5} opacity={0.3} align={"right"}>
//                                                         {data?.time}
//                                                     </Elements.Text>
//                                                 </Layouts.Col>
//                                             </Layouts.Row>
//                                             <Layouts.Divider />
//                                             <Layouts.Row gap={1} fix>
//                                                 <Elements.Text opacity={0.3} fit>
//                                                     Price
//                                                 </Elements.Text>
//                                                 <Elements.Text align={"right"}>{format(data?.price, "currency", { unit: 9, limit: 12, fix: 3 })}</Elements.Text>
//                                                 <Elements.Text opacity={0.3} align={"left"} style={{ maxWidth: "6em" }}>
//                                                     {data?.quote?.symbol}
//                                                 </Elements.Text>
//                                             </Layouts.Row>
//                                             <Layouts.Divider />
//                                             <Layouts.Row gap={1} fix>
//                                                 <Elements.Text opacity={0.3} fit>
//                                                     Amount
//                                                 </Elements.Text>
//                                                 <Elements.Text align={"right"}>
//                                                     {format(data?.amount, "currency", { unit: 9, limit: 12, fix: 3 })}
//                                                 </Elements.Text>
//                                                 <Elements.Text opacity={0.3} align={"left"} style={{ maxWidth: "6em" }}>
//                                                     {data?.quote?.symbol}
//                                                 </Elements.Text>
//                                             </Layouts.Row>
//                                             <Layouts.Row gap={1} fix>
//                                                 <Elements.Text opacity={0.3} fit>
//                                                     Quantity
//                                                 </Elements.Text>
//                                                 <Elements.Text align={"right"} color={color}>
//                                                     {format(data?.quantity, "currency", { unit: 9, limit: 12, fix: 3 })}
//                                                 </Elements.Text>
//                                                 <Elements.Text opacity={0.3} align={"left"} style={{ maxWidth: "6em" }}>
//                                                     {data?.base?.symbol}
//                                                 </Elements.Text>
//                                             </Layouts.Row>
//                                             <Layouts.Divider />
//                                             <Layouts.Row gap={1} fix>
//                                                 <Elements.Text opacity={0.3} fit>
//                                                     Fees
//                                                 </Elements.Text>
//                                                 <Elements.Text opacity={0.6} align={"right"}>
//                                                     - {format(data?.fees, "currency", { unit: 9, limit: 12, fix: 3 })}
//                                                 </Elements.Text>
//                                                 <Elements.Text opacity={0.3} align={"left"} style={{ maxWidth: "6em" }}>
//                                                     {data?.base?.symbol}
//                                                 </Elements.Text>
//                                             </Layouts.Row>
//                                             <Layouts.Row gap={1} fix>
//                                                 <Elements.Text opacity={0.3} fit>
//                                                     Total
//                                                 </Elements.Text>
//                                                 <Elements.Text align={"right"} color={color}>
//                                                     {format(data?.quantity - data?.fees, "currency", { unit: 9, limit: 12, fix: 3 })}
//                                                 </Elements.Text>
//                                                 <Elements.Text opacity={0.3} align={"left"} style={{ maxWidth: "6em" }}>
//                                                     {data?.base?.symbol}
//                                                 </Elements.Text>
//                                             </Layouts.Row>
//                                         </Layouts.Col>
//                                     </Layouts.Contents.InnerContent>
//                                     <Layouts.Row gap={2} style={{ marginTop: "2em" }} fix>
//                                         {data?.state === "Pending" && (
//                                             <>
//                                                 <Controls.Button onClick={() => setOperate("cancel")}>Cancel</Controls.Button>
//                                                 <Controls.Button onClick={() => setOperate("modify")}>Modify</Controls.Button>
//                                             </>
//                                         )}
//                                         {data?.state === "Open" && <Controls.Button onClick={() => setOperate("close")}>Closing Position</Controls.Button>}
//                                         {data?.state === "Liquidated" && <Controls.Button onClick={() => setOperate("liquidate")}>Liquidate</Controls.Button>}
//                                         <Controls.Button onClick={handleClose}>Close</Controls.Button>
//                                     </Layouts.Row>
//                                 </Layouts.Col>
//                             ),
//                         },
//                         {
//                             active: operate === "cancel",
//                             children: (
//                                 <Layouts.Col gap={2} style={{ height: "100%" }}>
//                                     <Layouts.Contents.InnerContent>
//                                         {" "}
//                                         <Layouts.Col gap={2} fill>
//                                             <Elements.Text type={"strong"} height={2} opacity={0.6} align={"center"}>
//                                                 Your order will be cancelled. Are you sure?
//                                             </Elements.Text>
//                                         </Layouts.Col>
//                                     </Layouts.Contents.InnerContent>
//                                     <Layouts.Row gap={2}>
//                                         <Controls.Button onClick={() => handleProcess()}>Yes</Controls.Button>
//                                         <Controls.Button onClick={() => setOperate("")}>No</Controls.Button>
//                                     </Layouts.Row>
//                                 </Layouts.Col>
//                             ),
//                         },
//                         {
//                             active: operate === "modify",
//                             children: (
//                                 <Layouts.Col gap={2} fill>
//                                     <Elements.Text type={"strong"} height={2} opacity={0.6} align={"center"}>
//                                         Please enter your price and amount or quantity.
//                                     </Elements.Text>
//                                     <Layouts.Col gap={2}>
//                                         <Layouts.Row gap={1} fix>
//                                             <Elements.Text align={"left"} opacity={0.3} fit>
//                                                 Market
//                                             </Elements.Text>
//                                             <Elements.Text align={"right"} fix>
//                                                 {market?.ticker}
//                                             </Elements.Text>
//                                         </Layouts.Row>
//                                         <Layouts.Divider />
//                                         <Layouts.Row>
//                                             <Elements.Text align={"left"} opacity={0.3} fit>
//                                                 Ordered Price
//                                             </Elements.Text>
//                                             <Layouts.Row gap={4} fix>
//                                                 <Elements.Text align={"right"} fix>
//                                                     {data?.price || 0}
//                                                 </Elements.Text>
//                                                 <Elements.Text align={"left"} style={{ maxWidth: "7.25em" }} fix>
//                                                     {market?.quote?.symbol}
//                                                 </Elements.Text>
//                                             </Layouts.Row>
//                                         </Layouts.Row>
//                                         <Layouts.Row>
//                                             <Elements.Text align={"left"} opacity={0.3} fit>
//                                                 Ordered Amount
//                                             </Elements.Text>
//                                             <Layouts.Row gap={4} fix>
//                                                 <Elements.Text align={"right"} fix>
//                                                     {data?.amount || 0}
//                                                 </Elements.Text>
//                                                 <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "7.25em" }} fix>
//                                                     {data?.pay?.symbol}
//                                                 </Elements.Text>
//                                             </Layouts.Row>
//                                         </Layouts.Row>
//                                         <Layouts.Divider />
//                                         <Exchange.Controls.Order gap={2} id={"buy"} mode={true} assets={[data?.base, data?.quote]} price={157.12} fee={0.1} />
//                                     </Layouts.Col>
//                                     <Layouts.Row>
//                                         <Controls.Button onClick={() => setOperate("")}>Go Back</Controls.Button>
//                                         <Controls.Button onClick={() => handleProcess()}>Modify</Controls.Button>
//                                     </Layouts.Row>
//                                 </Layouts.Col>
//                             ),
//                         },
//                         {
//                             active: operate === "close",
//                             children: (
//                                 <Layouts.Col gap={2} fill>
//                                     <Elements.Text type={"strong"} height={2} opacity={0.6} align={"center"}>
//                                         This position will be closed. Are you sure?
//                                     </Elements.Text>
//                                     <Layouts.Row>
//                                         <Controls.Button onClick={() => handleProcess()}>Yes</Controls.Button>
//                                         <Controls.Button onClick={() => setOperate("")}>No</Controls.Button>
//                                     </Layouts.Row>
//                                 </Layouts.Col>
//                             ),
//                         },
//                         {
//                             active: operate === "liquidate",
//                             children: (
//                                 <Layouts.Col gap={2} fill>
//                                     <Elements.Text type={"strong"} height={2} opacity={0.6} align={"center"}>
//                                         This position will be liquidated. Are you sure?
//                                     </Elements.Text>
//                                     <Layouts.Row>
//                                         <Controls.Button onClick={() => handleProcess()}>Yes</Controls.Button>
//                                         <Controls.Button onClick={() => setOperate("")}>No</Controls.Button>
//                                     </Layouts.Row>
//                                 </Layouts.Col>
//                             ),
//                         },
//                     ]}
//                 />
//             }
//             failure={{
//                 message: props?.failure?.message || "Processing has been failed.",
//                 children: <Controls.Button onClick={(e: any) => handleBack(e)}>Go Back</Controls.Button>,
//             }}
//             loading={{
//                 active: props?.loading?.active || loading,
//                 message: props?.loading?.message || "Please wait until the processing is complete.",
//             }}
//             success={{
//                 message: props?.success?.message || "Processing has been succeed.",
//                 children: <Controls.Button onClick={(e: any) => handleClose(e)}>OK</Controls.Button>,
//             }}
//             onClose={handleClose}
//             close
//         />
//     );
// }
