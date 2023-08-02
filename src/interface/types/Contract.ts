// import { contractFactories } from "contracts/factories";

// export type ContractName = keyof typeof contractFactories;
// export type ContractInterface<T extends ContractName> = ReturnType<
//   (typeof contractFactories)[T]["createInterface"]
// >;
// export type ContractInstance<T extends ContractName> = ReturnType<
//   (typeof contractFactories)[T]["connect"]
// >;
// export type ContractMethodName<T extends ContractName> = Extract<
//   keyof ContractInstance<T>["functions"],
//   string
// >;
// export type ContractMethodParams<
//   T extends ContractName,
//   P extends keyof ContractInstance<T>["functions"]
// > = Parameters<ContractInstance<T>["functions"][P]>;
