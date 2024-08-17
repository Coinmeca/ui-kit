import { Asset } from "types";

export interface Volume {
    amount?: number;
    value?: number;
}

export interface Sector {
    buy?: Volume;
    sell?: Volume;
    return?: Volume;
    returnRate?: Volume;
}

export interface AccountAsset extends Omit<Omit<Omit<Asset, 'balance'>, 'staked'>, 'interest'> {
    value?: number;
    pnl?: number;
    leverage?: number;
    order?: Volume;
    balance?: Volume;
    staked?: Volume;
    interest?: Volume;
    total?: Sector;
    average?: Sector;
    count?: {
        buy?: number;
        sell?: number;
        order?: number;
        long?: number;
        short?: number;
    }
}
