import {Montserrat, Noto_Sans_KR, Noto_Sans_JP} from 'next/font/google';

export const en = Montserrat({
	subsets: ['latin-ext'],
	variable: '--font-en',
	display: 'swap'
});

export const kr = Noto_Sans_KR({
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '700', '900'],
	variable: '--font-kr',
	display: 'swap'
});

export const jp = Noto_Sans_JP({
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '700', '900'],
	variable: '--font-jp',
	display: 'swap'
});
