export interface Sorting {
	key: string;
	type: string;
	direction?: boolean | undefined;
}

export function Sort(array: Array<any>, key: string, type: string, direction: boolean | undefined = false) {
	switch (type) {
		case 'string': {
			return direction ? [...array].sort((a, b) => (a[key] > b[key] ? -1 : 1)) : [...array].sort((a, b) => (a[key] > b[key] ? 1 : -1));
		}
		case 'number': {
			return typeof direction === 'undefined'
				? [...array]
				: direction
					? [...array].sort((a, b) => (Format(a[key], 'number', true) as number) - (Format(b[key], 'number', true) as number))
					: [...array].sort((a, b) => (Format(b[key], 'number', true) as number) - (Format(a[key], 'number', true) as number));
		}
		default: {
			return [...array];
		}
	}
}

export function Filter(array: Array<any>, keyword?: string) {
	return array && array?.length > 0
		? !keyword || keyword === '' || keyword.length === 0
			? [...array]
			: [...array].filter((o) =>
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
	currency: /^[,.0-9]*$/
};

type input = 'email' | 'number' | 'currency' | 'date' | string;

interface format {
	display?: boolean | number,
	limit?: number;
	unit?: boolean | number,
	fix?: number | 'auto',
	max?: number
}

export function Unit(value: number | string, upper?: number) {
	value = value?.toString()?.replaceAll(',', '').split('.')[0];
	upper = upper || 0;

	let copy: any = value.split(' ');
	let multiplier = 0;
	if (copy[1] && copy[1]?.length > 0) {
		if (copy[1]?.includes('T')) {
			multiplier = 12;
		} else if (copy[1]?.includes('M')) {
			multiplier = 9;
		} else if (copy[1]?.includes('B')) {
			multiplier = 6;
		} else if (copy[1]?.includes('K')) {
			multiplier = 3;
		}
	}
	value = copy[0] as string;

	let e = value?.split('e');
	if (e[1] && e[1]?.length > 0 && !isNaN(parseFloat(e[1]))) {
		copy = e[0]?.split('.');
		multiplier += parseFloat(e[1]) + copy[0].length + 1;
		if (multiplier < (copy[0].length + (copy[1]?.length || 0))) {
			multiplier + copy[0].length - value.substring(0, multiplier).length
		}
	}

	let unit = '';
	if (multiplier > 12 && 12 > upper) {
		unit = 'T';
	} else if (multiplier > 9 && 9 > upper) {
		unit = 'B';
	} else if (multiplier > 6 && 6 > upper) {
		unit = 'M';
	} else if (multiplier > 3 && 3 > upper) {
		unit = 'K';
	}
	return unit;
}

export function Format(value?: number | string, type?: input, option?: boolean | format | number, fix?: number | 'auto', max?: number): number | string {
	let display = (typeof option === 'object' && typeof option?.display !== 'undefined') || typeof option !== 'undefined';
	let limit = (typeof option === 'object' && typeof option?.display === 'number') ? option?.display : typeof option === 'number' ? option : undefined;
	let unit = (typeof option === 'object' && typeof option?.unit !== 'undefined');
	let upper = (typeof option === 'object' && typeof option?.unit === 'number') ? option?.unit : 0;
	fix = typeof option === 'object' ? option?.fix : fix === 'auto' ? 3 : fix;
	max = typeof option === 'object' ? option?.max : max;

	switch (type) {
		case 'email': {
			if (typeof value === 'undefined') return '';
			if (typeof value !== 'string') value = value.toString();
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
			if (typeof value === 'undefined') return 0;
			value = value?.toString()?.replaceAll(',', '');
			if (value === '' || value?.length <= 0) return display ? 0 : '';

			let copy: any = value.split(' ');
			let multiplier = 0;
			if (copy[1] && copy[1]?.length > 0) {
				if (copy[1]?.includes('T')) {
					multiplier = 12;
				} else if (copy[1]?.includes('M')) {
					multiplier = 9;
				} else if (copy[1]?.includes('B')) {
					multiplier = 6;
				} else if (copy[1]?.includes('K')) {
					multiplier = 3;
				}
			}
			value = copy[0] as string;

			let e = value?.split('e');
			if (e[1] && e[1]?.length > 0 && !isNaN(parseFloat(e[1]))) {
				copy = e[0]?.split('.');
				multiplier += parseFloat(e[1]) + 1;
				if (multiplier < 0) {
					if (copy.length < Math.abs(multiplier)) {
						value = '0.' + '0'.repeat(Math.abs(multiplier + 2)) + e[0]?.replaceAll('.', '');
					} else {
						multiplier = Math.abs(multiplier);
						value = (copy[0] + copy[1]) as string;
						value = (parseFloat(value.substring(0, multiplier) + '.' + value.substring(multiplier, value.length)) * (10 ** multiplier)).toString();
					}
				} else if (multiplier < (copy[0].length + (copy[1]?.length || 0))) {
					value = (copy[0] + copy[1]) as string;
					value = (parseFloat(value.substring(0, multiplier) + '.' + value.substring(multiplier, value.length)) * (10 ** (multiplier + copy[0].length - value.substring(0, multiplier).length))).toString();
				} else {
					value = (parseFloat(e[0]) * (10 ** multiplier)).toString();
				}
			} else {
				value = (parseFloat(value) * (10 ** multiplier)).toString();
			}

			let point = false;
			let num = false;
			let zero = 0;
			copy = '';
			for (let i = 0; i < value?.length; i++) {
				if ((!point && value[i] === '.') || !isNaN(parseInt(value[i]))) {
					if (point && num && value[i] === '0') break;
					if (point && !num && value[i] === '0') zero++;
					if (point && value[i] !== '0') num = true;
					if (!point && value[i] === '.') point = true;
					copy += value[i];
				}
			}

			if (max) {
				max = parseFloat(max.toString().replaceAll(',', ''));
				if (parseFloat(copy) > parseFloat(max.toString())) return type === 'currency' ? copy.toLocaleString() : max;
			}

			copy = copy.split('.');
			copy[0] = copy[0] === '' ? '0' : copy[0];

			let u = '';
			if (copy[0].length > 3 && unit) {
				let n: any = parseFloat(copy[0]);

				if (copy[0]?.length > 12 && 12 > upper) {
					n = n / (10 ** 12);
					u = 'T';
				} else if (copy[0]?.length > 9 && 9 > upper) {
					n = n / (10 ** 9);
					u = 'B';
				} else if (copy[0]?.length > 6 && 6 > upper) {
					n = n / (10 ** 6);
					u = 'M';
				} else if (copy[0]?.length > 3 && 3 > upper) {
					n = n / (10 ** 3);
					u = 'K';
				}

				n = n?.toString()?.split('.');
				copy[0] = n[0];
				copy[1] = (n[1] || '') + (copy[1] || '');
			}

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

			let decimals: string | number = '';
			num = false;
			if (copy.length > 1) {
				if (copy.length > 2) {
					for (let i = 2; i < copy.length; i++) {
						copy[1] += copy[i].toString();
					}
					copy[1] = copy[1].toString();
				}

				for (let i = 0; i < copy[1]?.length; i++) {
					if (typeof fix === 'number' && !isNaN(fix) && i === fix && fix > zero) break;
					if (!isNaN(parseInt(copy[1][i]))) {
						if (copy[1][i] === '0' && num) break;
						if (copy[1][i] !== '0') num = true;
						decimals += copy[1][i].toString();
						if (typeof fix === 'number' && !isNaN(fix) && !isNaN(copy[1][i]) && copy[1][i] !== '0' && fix <= zero) break;
					}
				}

				if (limit) {
					let l = (limit - copy[0].length) > 0 ? (limit - copy[0].length) : 0;
					if (l > 0) decimals = decimals.toString().substring(0, l);
				}

				if (copy[1].length > 0) point = true;
			}
			copy[0] = value?.startsWith('-') ? '-' + copy[0] : copy[0];

			const result = copy[0] + (point ? '.' : '') + decimals;
			// return u !== '' ? result + ' ' + u : display ? parseFloat(result) : result;
			return u !== '' ? result + ' ' + u : display && type === 'number' ? parseFloat(result) : result;
		}
		case 'date':
			if (typeof value === 'undefined') return '-';
			if (typeof value !== 'string') value = value.toString();
			if (value?.length > 10) value = value.substring(0, 10);

			let copy: any = '';
			for (let i = 0; i < value?.length; i++) {
				if (!isNaN(parseInt(value[i]))) {
					copy += value[i];
				}
			}

			const d = new Date(copy * 1000);
			const date = ('0' + d.getDate()).slice(-2) + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + d.getFullYear().toString().substring(2, 4);
			const time = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2);
			return date + ' ' + time;
		default: {
			if (typeof value === 'undefined') return '';
			return value;
		}
	}
}

export function Sign(value?: number | string): string {
	if (typeof value === 'undefined') return '';
	value = parseFloat(value?.toString());
	if (isNaN(value)) return '';
	return value > 0 ? '+' : value < 0 ? '-' : '';
}

export function getFees(n: number | string, fee: number, divider?: number) {
	return (parseFloat(Format(n, 'number').toString()) * fee) / (divider || 10000);
}
