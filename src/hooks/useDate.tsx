"use client";
import { useCallback, useMemo, useState } from "react";

export type Time = 'secs' | 'days' | 'weeks' | 'months' | 'years';
export type Duration = [duration: number, type?: Time] | [start: number, end: number, type?: Time];

export type Date = {
    [key in Time]: number;
};

type TimeFunctions = {
    [key in Time]: (time: number) => Date;
};

type UseDate = TimeFunctions & {
    date: Date;
    now: number;
    end: number;
    when: number;
    sec: (...args: Duration) => Date;
    day: (...args: Duration) => Date;
    week: (...args: Duration) => Date;
    month: (...args: Duration) => Date;
    year: (...args: Duration) => Date;
};

export default function useDate(initial?: Date): UseDate {
    const [date, setDate] = useState<Date>({
        secs: initial?.secs || 0,
        days: initial?.days || 0,
        weeks: initial?.weeks || 0,
        months: initial?.months || 0,
        years: initial?.years || 0,
    });

    const times = useMemo(() => ({
        day: 86_400,
        week: 604_800,
        month: 2_628_000,
        year: 31_536_000,
    }), [])

    const resolve = useCallback((time: number, type?: Time) => {
        switch (type) {
            case 'days': {
                return time *= times.day;
            }
            case 'weeks': {
                return time *= times.week;
            }
            case 'months': {
                return time *= times.month;
            }
            case 'years': {
                return time *= times.year;
            }
            default: return time;
        }
    }, [times])

    const sec = useCallback((...args: Duration) => {
        const secs = resolve(
            (args?.length > 1 && typeof args[1] === 'number') ? args[1] - args[0] : args[0],
            (args?.length === 3 && typeof args[2] === 'string') ? args[2] : (args?.length === 2 && typeof args[1] === 'string') ? args[1] : undefined
        );
        return {
            secs,
            days: secs / times.day,
            weeks: secs / times.week,
            months: secs / times.month,
            years: secs / times.year,
        }
    }, [resolve])

    const day = useCallback((...args: Duration): Date => ({ ...sec(...args) }), [sec, times.day]);
    const week = useCallback((...args: Duration): Date => ({ ...sec(...args) }), [sec, times.day]);
    const month = useCallback((...args: Duration): Date => ({ ...sec(...args) }), [sec, times.day]);
    const year = useCallback((...args: Duration): Date => ({ ...sec(...args) }), [sec, times.day]);

    const set = useCallback((time: number, type?: Time) => {
        const date: Date = sec(time, type);
        setDate(date);
        return date;
    }, [resolve, day, week, month, year])

    const secs = useCallback((time: number) => set(time), [set]);
    const days = useCallback((time: number) => set(time, 'days'), [set]);
    const weeks = useCallback((time: number) => set(time, 'weeks'), [set]);
    const months = useCallback((time: number) => set(time, 'months'), [set]);
    const years = useCallback((time: number) => set(time, 'years'), [set]);

    const now = Math.floor(Date.now() / 1000);
    const end = useMemo(() => now + date.secs, [now, date]);
    const when = useMemo((...args: Duration) => now + sec(...args).secs, [now, date]);

    return {
        date,
        now,
        end,
        when,
        sec,
        secs,
        day,
        days,
        week,
        weeks,
        month,
        months,
        year,
        years,
    }
}