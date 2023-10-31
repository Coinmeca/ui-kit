import {useEffect, useState} from 'react';
import {Controls} from 'components';
import {Numberpad} from 'parts';
import type {Numberpad as Pad} from 'parts/numberpads/Numberpad';
import type {Button} from 'components/controls/button/Button';
import {Format} from 'lib/utils';

export interface CurrencyPad extends Pad {
	step?: number;
	button?: Button;
}

export default function Currency(props: CurrencyPad) {
	const step = props?.step || 1;
	const [value, setValue] = useState(props?.value || '');

	useEffect(() => {
		if (props?.value) setValue(props?.value?.toString() || '');
	}, [props?.value]);

	const handleClick = (e: any) => {
		if (typeof props?.button?.onClick === 'function') props?.button?.onClick(e, value);
	};

	const handleChange = (e: any, v: string) => {
		let input: number | string = '';
		if (v === 'plus') {
			const number: number = value === '' ? 0 : parseFloat(Format(value, 'number').toString());
			input = number + step;
		} else if (v === 'minus') {
			const number: number = value === '' ? 0 : parseFloat(Format(value, 'number').toString());
			input = number - step;
			if (input <= 0) input = '0';
		} else input = v;
		if (v === '.') {
			input = value === '' ? '0.' : value + '.';
		}
		if (typeof props?.onChange === 'function') props?.onChange(e, input);
		setValue(input);
	};

	return (
		<Numberpad
			{...props}
			value={value}
			onChange={(e: any, v: string) => handleChange(e, v)}
			right={{
				children: (
					<>
						<Controls.Button onClick={(e: any) => handleChange(e, 'plus')} icon={'plus-small-bold'} scale={0.875} />
						<Controls.Button onClick={(e: any) => handleChange(e, 'minus')} icon={'minus-small-bold'} scale={0.875} />
						<Controls.Button onClick={(e: any) => handleChange(e, '.')} icon={'dot'} scale={0.875} />
						<Controls.Button
							{...props?.button}
							onClick={(e: any) => handleClick(e)}
							color={props?.button?.color}
							style={{
								...props?.button?.style,
								...(props?.reverse && {order: -1})
							}}
						>
							{props?.button?.children || 'OK'}
						</Controls.Button>
					</>
				)
			}}
		/>
	);
}
