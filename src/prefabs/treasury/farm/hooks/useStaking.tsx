"use client";
import { useCallback, useMemo, useState } from "react";
import { Staking } from "types";

export interface Farm {
    staked: number;
    interest?: number;
    value?: {
        stake?: number;
        earn?: number;
    };
    start?: number;
    end?: number;
}

export default function useStaking(type: boolean, initial: Staking, available?: number, farm?: Farm) {
    const [staking, setStaking] = useState<Staking>({
        pay: initial?.pay || { address: "", name: "", symbol: "", decimals: 0 },
        amount: initial?.amount || 0,
    });

    const now = Math.floor(Date.now() / 1000);

    const remain = useMemo(() => (farm?.end && farm?.end > now) ? (farm?.end - now) : 0, [farm?.end]);

    const days = useMemo(() => remain / 86400, [remain])

    const interest = useMemo(
        () => (
            farm?.interest && farm?.interest > 0 &&
            farm?.start && farm?.start > 0 &&
            farm?.end && farm?.end > 0 &&
            farm?.start < farm?.end &&
            (farm?.end - farm?.start) > 0
        )
            ? farm?.interest * (farm?.end - now) / (farm?.end - farm?.start) : 0
        , [farm?.interest])

    const apr = useCallback(
        (amount: number): number =>
            (amount && farm?.staked)
                ? type
                    ? (interest / (farm?.staked + amount) / days)
                    : ((farm?.value?.stake && farm?.value?.earn) && ((interest * farm?.value?.earn) / (farm?.staked * farm?.value?.stake + amount * farm?.value.stake) / days)) || 0
                : 0
        ,
        [type, interest, farm?.staked, farm?.value],
    );

    const share = useCallback(
        (amount: number) => (!amount || !farm?.staked) ? 0 : (amount * 100) / farm?.staked,
        [farm?.staked],
    );

    const getAmount = (amount: number): number => {
        return available && available < amount ? available : amount;
    };

    const maxAmount = (): number | undefined => {
        return available || staking?.amount;
    };

    const amount = (amount: number) => {
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
        share,
        interest,
        days,
        apr
    };
}
