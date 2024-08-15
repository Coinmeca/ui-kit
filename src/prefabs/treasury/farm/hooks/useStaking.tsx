"use client";
import { isNumber, parseNumber } from "lib/utils";
import { Staking } from "types";
import { useCallback, useMemo, useState } from "react";

export interface Farm {
    type?: boolean;
    start?: number;
    duration?: number;
    period?: number;
    end?: number;
    staked: number;
    interest?: number;
    value?: {
        stake?: number;
        earn?: number;
    };
}

export default function useStaking(mode: boolean, available?: number, farm?: Farm) {
    const [staking, setStaking] = useState<Staking>({
        amount: 0,
        share: 0,
        apr: 0,
    });

    const type = farm?.type || true;

    const now = Math.floor(Date.now() / 1000);
    const start = parseNumber(farm?.start || 0);
    const end = parseNumber(farm?.end || 0);
    const period = parseNumber(farm?.period || 0);

    // const extra = period > (end - now) ? period - (end - now) : period;
    const remain = end && now < end ? end - now : period;
    const duration = useMemo(() => {
        const d = parseNumber(farm?.duration);
        return (d && end > now ? d : period) || end - start || 0;
    }, [now, start, end, period, farm?.duration]);
    const days = useMemo(() => duration / 86400, [duration]);
    const next = useMemo(() => period / 86400, [period]);

    const staked = useMemo(() => parseNumber(farm?.staked) || 0, [farm?.staked]);
    const yields = useMemo(() => parseNumber(farm?.interest) || 0, [farm?.interest]);
    const interest = useMemo(() => (yields ? (yields * (remain / duration)) / next : 0), [yields, remain, duration, next]);
    const value = useMemo(
        () => ({
            stake: type ? 1 : parseNumber(farm?.value?.stake) || 1,
            earn: type ? 1 : parseNumber(farm?.value?.earn) || 1,
        }),
        [type, farm?.value],
    );

    const apr = useCallback(
        (amount: number, staking?: number | boolean) =>
            isNumber(amount)
                ? (((interest * value.earn) / days) * 100) /
                  (((isNumber(staking) ? ((staking as number) || 0) + (mode ? amount : -amount || 0) : amount) + staked) *
                      value.stake)
                : 0,
        [mode, staked, interest, value, days],
    );

    const share = useCallback(
        (amount: number, staking?: number | boolean) =>
            (!mode && (!staking || staking === 0)) || !isNumber(amount)
                ? 0
                : ((isNumber(staking) && (staking as number) > 0
                      ? (staking as number) + (mode ? amount : -amount || 0)
                      : amount) *
                      100) /
                  (staked ? staked + (staking === true ? 0 : mode ? amount : -amount) : amount),
        [mode, staked],
    );

    const getAmount = useCallback(
        (amount: number): number => {
            return available && available < amount ? available : amount;
        },
        [available],
    );

    const maxAmount = useMemo((): number | undefined => {
        return available || staking?.amount;
    }, [available, staking.amount]);

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

        amount = getAmount(amount);
        const avail = !mode && available;

        s = {
            ...staking,
            amount,
            share: share(amount, avail),
            apr: apr(amount, avail),
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
        maxAmount,
        interest,
        share,
        apr,
        days,
        reset,
    };
}
