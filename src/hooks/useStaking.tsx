"use client";
import { useCallback, useState } from "react";
import { Staking } from "types";

export interface Farm {
    staked: number;
    interest?: number;
    value?: {
        stake?: number;
        earn?: number;
    };
    end?: number;
}

export default function useStaking(mode: boolean, initial: Staking, available?: number, farm?: Farm) {
    const [staking, setStaking] = useState<Staking>({
        pay: initial?.pay || { address: "", name: "", symbol: "", decimals: 0 },
        amount: initial?.amount || 0,
    });

    const apr = useCallback(
        (amount: number) => {
            const now = Math.floor(Date.now() / 1000);
            if (amount && farm?.staked && farm?.interest && farm?.end && farm?.end > now) {
                const days = (farm?.end - now) / 86400;
                if (mode) {
                    return farm?.interest / (farm?.staked + amount) / days;
                } else if (farm?.value?.stake && farm?.value?.earn) {
                    return (farm?.interest * farm?.value?.earn) / (farm?.staked * farm?.value?.stake + amount * farm?.value.stake) / days;
                }
            }
            return 0;
        },
        [mode, farm?.end, farm?.staked, farm?.interest, farm?.value?.stake, farm?.value?.earn],
    );

    const share = useCallback(
        (amount: number) => {
            if (!amount || !farm?.staked) return 0;
            return (amount * 100) / farm?.staked;
        },
        [farm?.staked],
    );

    const getAmount = (amount: number): number => {
        return available && available < amount ? available : amount;
    };

    const maxAmount = (): number | undefined => {
        return available || staking?.amount;
    };

    const amount = (amount: number, price?: number) => {
        let s: Staking;

        if (!amount) {
            s = {
                ...staking,
                amount: 0,
                share: 0,
                apr: 0,
            };
            setStaking(s);
            return s;
        }

        s = {
            ...staking,
            amount: getAmount(amount),
            share: share(amount),
            apr: apr(amount),
        };
        setStaking(s);
        return s;
    };

    const reset = () =>
        setStaking({
            ...staking,
            amount: 0,
            share: 0,
            apr: 0,
        });

    return {
        staking,
        amount,
        reset,
        maxAmount,
    };
}
