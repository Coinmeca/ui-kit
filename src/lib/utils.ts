export function Sort(array: Array<any>, key: string, type: string, direction: boolean) {
    switch (type) {
        case 'string': {
            return direction
                ? [...array].sort((a, b) => (a[key] > b[key] ? 1 : -1))
                : [...array].sort((a, b) => (a[key] > b[key] ? -1 : 1));
        }
        case 'number': {
            return direction
                ? [...array].sort((a, b) => parseFloat(a[key]) - parseFloat(b[key]))
                : [...array].sort((a, b) => parseFloat(a[key]) + parseFloat(b[key]));
        }
        default: {
            return [...array];
        }
    }
}

export function Search(array: Array<any>, keyword: string) {
    return array && array?.length
        ? [...array].filter((o) =>
            Object.values(o).some((v) => {
                if (typeof v === 'string') return v.toLowerCase().includes(keyword.toLowerCase());
            })
        )
        : [];
}

export function Capitalize(text: string, separator?: boolean) {
    if (!text || text === '') return '';
    const lower = text.toLowerCase();
    const cap = text.charAt(0).toUpperCase() + lower.slice(1);
    return !separator ? cap : parseFloat(cap).toLocaleString();
}

export function Format(value: any, type?: string, separator?: boolean, fix?: number, max?: any, auto?: boolean) {
    if (typeof value === 'undefined') return;
    if (typeof value !== 'string') value = value.toString();
    switch (type) {
        case 'email': {
            if (value.indexOf('@') === 1) {
                let copy: string[] = value.split('@');
                if (0 < copy.length && copy.length < 2) {
                    const domain = copy[1].split('.');
                    console.log(domain);
                } else {
                    console.log('error');
                }
            }
            return value;
        }
        case 'number':
        case 'currency': {
            value = value.toString().replaceAll(',', '');
            if (value === '') return 0;
            if ((!parseFloat(value) || parseFloat(value) === 0) && value.length <= 1 && value[value.length] !== '.')
                return 0;
            let decimals;
            if (value.indexOf('.') !== -1) {
                let copy: string[] = value.split('.');
                if (copy.length > 1) {
                    if (copy.length > 2) {
                        for (let i = 2; i < copy.length; i++) {
                            copy[1] += copy[i];
                        }
                    }
                    if (typeof fix !== 'undefined' && copy[1]?.length > fix) {
                        // fix = auto ? parseFloat(value)?.toString()?.length / 2;
                        copy[1] = copy[1].substring(0, fix);
                    }
                    copy[0] =
                        type === 'number'
                            ? parseFloat(copy[0]).toString()
                            : separator
                                ? parseFloat(copy[0]).toLocaleString()
                                : copy[0];
                    // copy[1] = parseFloat(copy[1]) === 0 ? '0' : copy[1];
                    decimals = copy[1];
                    value = copy[0] + '.' + copy[1];
                }
            }
            if (typeof max !== 'undefined') {
                max = parseFloat(max.toString().replaceAll(',', ''));
                if (parseFloat(value) > parseFloat(max)) value = max;
            }
            if (typeof decimals === 'undefined') {
                value = type === 'number' ? parseFloat(value) : separator ? parseFloat(value).toLocaleString() : value;
            }
            return value;
        }
        default: {
            return value;
        }
    }
}

export function getFees(n: string | number, fee: number, divider?: number) {
    return (parseFloat(Format(n, 'number', false)) * fee) / (divider || 10000);
}
