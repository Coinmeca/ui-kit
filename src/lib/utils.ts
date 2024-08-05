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
	let display = ((typeof option === 'object' && typeof option?.display === 'boolean') && option?.display) || !!option;
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
			value = value.toString().replace(/,/g, '');
			if (value === '.' || value === '0.') return display ? '0' : '0.';
			if (value === '' || value === 'NaN' || value.length <= 0) return display ? '0' : '';
			if (typeof value === 'number' && isNaN(value)) return display ? '-' : '';

			let sig = (signs && sign(value) === "-" && '-') || '';
			let multiplier = 0;
			let u = '';

			const unitMap = { T: 12, B: 9, M: 6, K: 3 };
			for (let key in unitMap) {
				if (value.includes(key)) {
					[value] = value.split(key);
					multiplier = unitMap[key as 'T' | 'B' | 'M' | 'K'];
					break;
				}
			}
			value = value.replace(/ /g, '');

			const e = value.split('e');
			let [integer, decimal = ''] = e[0].split('.');
			if (e.length > 1 && !isNaN(parseFloat(e[1]))) multiplier += parseFloat(e[1]);
			if (decimals && decimals > 0) multiplier -= decimals;

			const m = Math.abs(multiplier);
			const n = integer.length, d = decimal.length;

			if (multiplier < 0) {
				if (decimal.length) {
					if (m > d) {
						value = integer + decimal + '0'.repeat(m - d);
					} else {
						value = integer + decimal.substring(0, m) + '.' + decimal.substring(m);
					}
				} else {
					if (m > n) {
						value = '0.' + '0'.repeat(m - n) + integer;
					} else {
						value = integer.substring(0, n - m) + '.' + integer.substring(n - m);
					}
				}
			} else if (multiplier > 0) {
				if (decimal.length) {
					if (m > d) {
						value = integer + decimal + '0'.repeat(m - d);
					} else {
						value = integer + decimal.substring(0, d - m) + '.' + decimal.substring(d - m);
					}
				} else {
					value = integer + '0'.repeat(m);
				}
			}

			[integer, decimal = ''] = value.split('.');
			if (unit && integer.length > upper) {
				let cut = 0;
				if (integer.length > 12) {
					u = 'T';
					cut = 12;
				} else if (integer.length > 9) {
					u = 'B';
					cut = 9;
				} else if (integer.length > 6) {
					u = 'M';
					cut = 6;
				} else if (integer.length > 3) {
					u = 'K';
					cut = 3;
				}
				cut = integer.length - cut;
				value = integer.substring(0, cut) + '.' + integer.substring(cut) + (decimal || '');
				[integer, decimal = ''] = value.split('.');
			}

			if (max) {
				const maxValue = parseFloat(max.toString().replace(/,/g, ''));
				value = (parseFloat(value) >= maxValue ? max : value).toString();
				[integer, decimal = ''] = value.split('.');
			}

			if (typeof fix === 'number') {
				if (fix < decimal.length) {
					decimal = decimal.slice(0, fix);
				}
				if (fix > decimal.length) {
					decimal = decimal + '0'.repeat(fix - decimal.length);
				}
			}
			decimal = decimal.replace(/0+$/, "");
			if (limit && integer.length > limit) {
				integer = integer.slice(0, limit);
			}

			if (display) {
				integer = parseInt(integer).toLocaleString();
			} else if (type === 'currency') {
				integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}

			let result = integer + (decimal ? '.' + decimal : '');

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
	return parseFloat(format(value || 0, "number", true, undefined, max, typeof decimals === 'number' ? decimals : typeof decimals === 'string' ? parseInt(decimals) : undefined));
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