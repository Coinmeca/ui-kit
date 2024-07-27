'use client';
import { useCallback, useState } from 'react';
import { sort as s, type Sorting } from 'lib/utils';

interface Sort {
    sort?: Sorting;
    sorting: (list?: any[]) => any[];
    setSort: (sort: Sorting) => void;
    sortArrow: (key: Sorting | string) => 'sort' | 'sort-up' | 'sort-down';
}

export default function useSort(): Sort {
    const [sort, update] = useState<Sorting>();

    const sortArrow = useCallback(
        (key: Sorting | string): 'sort' | 'sort-up' | 'sort-down' => {
            switch (typeof key) {
                case 'string':
                    return key === sort?.key ? (sort?.direction ? 'sort-up' : 'sort-down') : 'sort';
                case 'object':
                    return key?.key === sort?.key ? (sort?.direction ? 'sort-up' : 'sort-down') : 'sort';
                default:
                    return 'sort';
            }
        },
        [sort],
    );

    const setSort = useCallback((sort: Sorting) => {
        update((state: Sorting | undefined) => {
            return {
                ...sort,
                direction: state?.key === sort?.key ? !state?.direction : undefined,
            };
        });
    }, []);

    const sorting = useCallback(
        (list?: any[]) => {
            return list ? (sort && sort?.key !== '' && sort?.key?.length > 0 ? s(list, sort?.key, sort?.type, sort?.direction) : list) : [];
        },
        [sort],
    );

    return { sort, sorting, setSort, sortArrow };
}
