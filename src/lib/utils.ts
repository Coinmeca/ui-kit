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

export function Capitalize(text: string) {
    if (!text || text === '') return '';
    const lower: string = text.toLowerCase();
    const cap: string = text.charAt(0).toUpperCase() + lower.slice(1);
    return cap;
}

const format = {
    email: /^[a-zA-Z0-9+]*$/,
    number: /^[0-9+]*$/,
    currency: /^[,.0-9]*$/,
};

export function Format(value: number | string, type?: 'email' | 'number' | 'currency' | string, display?: boolean, fix?: number | 'auto', max?: number | string, auto?: boolean): number | string {
    if (typeof value === 'undefined') return '';
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

            if (value === '' || value?.length <= 0) return display ? 0 : '';

            let copy: any = '';
            let point = false;

            for (let i = 0; i < value?.length; i++) {
                if ((!point && value[i] === '.') || !isNaN(parseInt(value[i]))) {
                    if (!point && value[i] === '.') point = true;
                    copy += value[i]
                };
            }

            if (max) {
                max = parseFloat(max.toString().replaceAll(',', ''));
                if (parseFloat(copy) > parseFloat(max.toString())) return type === 'currency' ? copy.toLocaleString() : max;
            }

            copy = value.split('.');
            copy[0] = copy[0] === '' ? '0' : copy[0];

            if (display) {
                copy[0] = parseInt(copy[0]);
                if (type === 'currency') copy[0] = copy[0].toLocaleString();
            } else if (type === 'currency') {
                let number: string = '';
                for (let i = 0; i < copy[0].length; i++) {
                    number += copy[0][i];
                    if (i !== copy[0].length - 1 && (copy[0].length - i) % 3 === 1) number += ',';
                }
                copy[0] = number;
            }

            let decimals: string = '';
            if (copy.length > 1) {
                if (copy.length > 2) {
                    for (let i = 2; i < copy.length; i++) {
                        copy[1] += copy[i];
                    }
                    copy[1] = copy[1].toString();
                }

                if (!isNaN(parseInt(copy[1]))) {
                    copy[1] = (typeof fix === 'number' && !isNaN(fix) && copy[1]?.length > fix) ? copy[1].substring(0, fix) : copy[1];
                    copy[1] = display ? parseInt(copy[1]) : copy[1];
                }
                decimals = '.' + copy[1];
            }

            return copy[0] + decimals;
        }
        default: {
            return value;
        }
    }
}

export function getFees(n: number | string, fee: number, divider?: number) {
    return (parseFloat(Format(n, 'number', false).toString()) * fee) / (divider || 10000);
}
