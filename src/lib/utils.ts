export interface Sorting {
	key: string;
	type: string;
	direction?: boolean | undefined;
}

export interface RGBColor {
	r: number;
	g: number;
	b: number;
}

export function sort(array: any[] = [], key: string, type: string, direction: boolean | undefined = false) {
	if (!Array.isArray(array)) return [];
	const depth = (a: any, b: any) => {
		let x: any = a;
		let y: any = b;
		if (typeof a === 'object' && typeof b === 'object') {
			const keys = key?.split('.');
			if (keys?.length > 1) {
				keys.forEach((k) => { x = x[k]; y = y[k]; });
			} else {
				x = x[key];
				y = y[key];
			}
		}
		return { x, y };
	}

	switch (type) {
		case 'string': {
			return typeof direction === 'undefined'
				? [...array]
				: direction
					? [...array].sort((a, b) => {
						const { x, y } = depth(a, b);
						return x.localeCompare(y);
					})
					: [...array].sort((a, b) => {
						const { x, y } = depth(a, b);
						return y.localeCompare(x);
					});
		}
		case 'number': {
			return typeof direction === 'undefined'
				? [...array]
				: direction
					? [...array].sort((a, b) => {
						const { x, y } = depth(a, b);
						return parseFloat(x) - parseFloat(y);
					})
					: [...array].sort((a, b) => {
						const { x, y } = depth(a, b);
						return parseFloat(y) - parseFloat(x);
					});
		}
		default: {
			return [...array];
		}
	}
}

export function filter(array: any[] = [], keyword?: string) {
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

export function capitalize(text: string) {
	if (!text || text === '') return '';
	const lower: string = text.toLowerCase();
	const cap: string = text.charAt(0).toUpperCase() + lower.slice(1);
	return cap;
}

const pattern = {
	email: /^[a-zA-Z0-9+]*$/,
	number: /^[0-9+]*$/,
	currency: /^[,.0-9]*$/
};

type input = 'email' | 'number' | 'currency' | 'date' | string;

interface format {
	display?: boolean | number;
	limit?: number;
	unit?: boolean | number;
	fix?: number | 'auto';
	max?: number;
	sign?: boolean;
	decimals?: number;
}

export function unit(value: number | string, upper?: number) {
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

export function format(value?: number | string, type?: input, option?: boolean | number | format, fix?: number | 'auto', max?: number, decimals?: number): string {
	let display = (typeof option === 'object' && typeof option?.display !== 'undefined') || !!option;
	let limit = (typeof option === 'object' && typeof option?.limit === 'number') ? option?.limit : typeof option === 'number' ? option : undefined;
	let unit = typeof option === 'object' && (typeof option?.unit === 'boolean' ? option?.unit : (typeof option?.unit === 'number' ? true : false));
	let upper = (typeof option === 'object' && typeof option?.unit === 'number') ? option?.unit : 0;
	let signs = (typeof option === 'object' && typeof option?.sign === 'boolean') ? option?.sign : true;
	decimals = (typeof option === 'object' && typeof option?.decimals === 'number') ? option?.decimals : decimals;
	fix = typeof option === 'object' ? option?.fix : fix === 'auto' ? 3 : fix;
	max = typeof option === 'object' ? option?.max : max;

	switch (type) {
		case 'email': {
			if (typeof value === 'undefined') return '';
			if (typeof value !== 'string') value = value.toString();
			if (value.indexOf('@') === 1) {
				let copy: string[] = value.split('@');
				if (0 < copy?.length && copy?.length < 2) {
					const domain = copy[1]?.split('.');
					console.log('domain', domain);
				} else {
					console.log('error');
				}
			}
			return value;
		}
		case 'number':
		case 'numberic':
		case 'currency': {
			if (value === undefined || value === null) return display ? '-' : '';
			value = value?.toString()?.replaceAll(',', '');
			if (value === '.' || value === '0.') return display ? '0' : '0.';
			if (value === '' || value === 'NaN' || value?.length <= 0) return display ? '0' : '';
			if (typeof value === 'number' && isNaN(value)) return display ? '-' : '';
			let sig = (signs && sign(value) === "-" && '-') || '';

			let copy: any = [value];
			let point = false;
			let num = false;
			let zero = 0;
			let multiplier = 0;
			let u = '';

			if (value?.includes('T')) {
				copy = value.split('T');
				multiplier = 12;
			} else if (value?.includes('B')) {
				copy = value.split('B');
				multiplier = 9;
			} else if (value?.includes('M')) {
				copy = value.split('M');
				multiplier = 6;
			} else if (value?.includes('K')) {
				copy = value.split('K');
				multiplier = 3;
			}
			value = copy[0].replaceAll(' ', '') as string;

			const e = value?.split('e');
			copy = e[0]?.split('.');
			if (e?.length > 0 && !isNaN(parseFloat(e[1]))) multiplier += parseFloat(e[1]);
			if (decimals && decimals > 0) multiplier -= decimals;

			const m = Math.abs(multiplier);
			const n = copy[0]?.length;
			const d = copy[1]?.length || 0;

			if (multiplier < 0) {
				if (copy?.length > 1) {
					if (m > d) {
						value = copy[0] + copy[1] + '0'.repeat(m - d);
					} else {
						value = copy[0] + copy[1]?.substring(0, m - d) + '.' + copy[1]?.substring(m - d, copy[1]?.length);
					}
				} else {
					if (m > n) {
						value = '0.' + '0'.repeat(m - n) + copy[0] + (copy[1] || '');
					} else {
						value = copy[0]?.substring(0, n - m) + '.' + copy[0]?.substring(n - m, copy[0].length) + (copy[1] || '');
					}
				}
			} else if (multiplier > 0) {
				if (copy?.length > 1) {
					if (m > d) {
						value = copy[0] + copy[1] + '0'.repeat(m - d);
					} else {
						value = copy[0] + copy[1]?.substring(0, d - m) + '.' + copy[1]?.substring(d - m, copy[1]?.length);
					}
				} else {
					value = copy[0] + '0'.repeat(m);
				}
			}

			copy = (value as string)?.split('.');
			if (unit && copy[0].length > upper) {
				let cut = copy.length;
				if (copy[0].length > 12) {
					u = 'T'
					cut = 12;
				} else if (copy[0].length > 9) {
					u = 'B'
					cut = 9;
				} else if (copy[0].length > 6) {
					u = 'M'
					cut = 6;
				} else if (copy[0].length > 3) {
					u = 'K'
					cut = 3;
				}
				cut = copy[0].length - cut;
				value = copy[0].substring(0, cut) + '.' + copy[0].substring(cut, copy[0].length) + (copy[1] || '');
			}

			point = false;
			copy = '';
			for (let i = 0; i < value?.length; i++) {
				if ((!display && !point && value[i] === '0') || (!point && value[i] === '.') || !isNaN(parseInt(value[i]))) {
					if (display && point && num && value[i] === '0') break;
					if (point && !num && value[i] === '0') zero++;
					if (point && value[i] !== '0') num = true;
					if (!point && value[i] === '.') point = true;
					copy += value[i];
				}
			}

			if (max) {
				const m = parseFloat(max?.toString()?.replaceAll(',', ''));
				copy = (parseFloat(copy) >= m ? max : copy).toString();
			}

			copy = copy?.split('.');
			if (display) {
				if (copy[0] === '') copy[0] = 0;
				copy[0] = parseInt(copy[0]);
				if (!num && (copy[0] === 0)) { point = false; copy = [0]; };
				if (type === 'currency') copy[0] = copy[0].toLocaleString();
			} else if (type === 'currency') {
				let number: string = '';
				for (let i = 0; i < copy[0].length; i++) {
					number += copy[0][i];
					if (i !== copy[0].length - 1 && (copy[0].length - i) % 3 === 1) number += ',';
				}
				copy[0] = number;
			}

			let dec: string | number = '';
			num = false;
			point = false;
			if (copy?.length > 1) {
				point = true;
				if (copy?.length > 2) {
					for (let i = 2; i < copy?.length; i++) {
						copy[1] += copy[i].toString();
					}
					copy[1] = copy[1]?.toString();
				}

				if (limit) {
					let l = limit - copy[0].length;
					l = l > (copy[1]?.length || 0) ? copy[1]?.length : l;
					if (l > 0) copy[1] = copy[1]?.substring(0, l);
				}

				for (let i = 0; i < copy[1]?.length; i++) {
					if (typeof fix === 'number' && !isNaN(fix) && i === fix && fix > zero) break;
					if (!isNaN(parseInt(copy[1][i]))) {
						if (display && copy[1][i] === '0' && num) break;
						if (copy[1][i] !== '0') num = true;
						dec += copy[1][i].toString();
						if (display && typeof fix === 'number' && !isNaN(fix) && !isNaN(copy[1][i]) && copy[1][i] !== '0' && fix <= zero) break;
					}
				}

				if (display && (copy[1]?.length === 0 || !num)) {
					dec = '';
					point = false;
				}
			}

			const result = copy[0] + (point ? '.' : '') + dec;
			return sig + (unit ? result + ' ' + u : result);
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
			return value.toString();
		}
	}
};

export function parseNumber(value?: number | string, decimals?: number | string, max?: number): number {
	return parseFloat(format(value, "number", true, undefined, max, typeof decimals === 'number' ? decimals : typeof decimals === 'string' ? parseInt(decimals) : undefined));
}


export function sign(value?: number | string): string {
	if (typeof value === 'undefined') return '';
	else {
		value = parseFloat(value?.toString());
		if (isNaN(value)) return '';
		return value > 0 ? '+' : value < 0 ? '-' : '';
	}
}

export function getFees(n: number | string, fee: number, divider?: number) {
	return (parseFloat(format(n, 'number').toString()) * fee) / (divider || 10000);
}

export function getAverageRGB(pixels: Uint8ClampedArray): RGBColor {
	let r = 0, g = 0, b = 0;

	for (let i = 0; i < pixels.length; i += 4) {
		r += pixels[i];
		g += pixels[i + 1];
		b += pixels[i + 2];
		// Skip alpha channel pixels[i + 3] if not needed
	}

	const numPixels = pixels.length / 4;
	r = Math.floor(r / numPixels);
	g = Math.floor(g / numPixels);
	b = Math.floor(b / numPixels);

	return { r, g, b };
}

export function rgbToHex(r: number, g: number, b: number): string {
	return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

export function componentToHex(c: number): string {
	const hex = c.toString(16);
	return hex.length === 1 ? '0' + hex : hex;
}


export async function getDominantColor(src: string) {
	if (!src || src === '') return '#fff';
	try {
		// Create an Image object
		const img = new Image();
		img.crossOrigin = "Anonymous";
		img.src = src;

		// Wait for the image to load
		await new Promise((resolve, reject) => {
			img.onload = resolve;
			img.onerror = reject;
		});

		// Create a canvas element
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		// Ensure ctx is not null before proceeding
		if (!ctx) {
			throw new Error('Failed to get 2D context from canvas');
		}

		// Set canvas dimensions to match the image
		canvas.width = img.width;
		canvas.height = img.height;

		// Draw the image to the canvas
		ctx.drawImage(img, 0, 0);

		// Get the image data from the canvas
		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const pixels = imageData.data;

		// Calculate the average color
		const averageColor = getAverageRGB(pixels);

		// Return the dominant color as hex value
		return rgbToHex(averageColor.r, averageColor.g, averageColor.b);

	} catch (error) {
		console.error('Error:', error);
		return '#FFFFFF'; // Default white color in case of error
	}
};

export function HexToColor(address: string) {
	if (address === '' || address?.length === 0) return '';
	const HEX = '0123456789abcdef';
	let t = BigInt(address);
	let o = 136;
	t >>= BigInt(o);

	let b = new Array(6);
	for (let i = b.length; i > 0; i--) {
		b[i - 1] = HEX[Number(t & BigInt(0xf))];
		t >>= BigInt(4);
	}
	return b.join('');
}