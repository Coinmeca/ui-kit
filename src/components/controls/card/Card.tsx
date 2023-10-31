import Style from './Card.styled';

export interface Card {
	children?: any;
	scale?: number;
	gap?: number;
	padding?: number;
	onClick?: Function;
}

export default function Card(props: Card) {
	const scale = props?.scale || 1;
	const padding = props?.padding || 2;
	const gap = props?.gap || 1;

	return (
		<Style $scale={scale} $padding={padding} $gap={gap} $event={typeof props?.onClick === 'function' ? true : false}>
			<div>{props?.children}</div>
		</Style>
	);
}
