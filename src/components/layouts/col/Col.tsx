import Style from './Col.styled';

export interface Col {
	children?: any;
	gap?: number;
	align?: 'left' | 'center' | 'right' | 'stretch';
	style?: object;
	fit?: boolean;
	fill?: boolean;
	show?: 'desktop' | 'laptop' | 'tablet' | 'mobile';
	hide?: 'desktop' | 'laptop' | 'tablet' | 'mobile';
	responsive?: 'desktop' | 'laptop' | 'tablet' | 'mobile';
	reverse?: boolean;
}

export default function Col(props: Col) {
	const gap = props?.gap === 0 ? 0 : props?.gap || 4;
	const fit = props?.fit || false;
	const fill = props?.fill || false;
	const reverse = props?.reverse || false;

	return (
		<Style
			style={props?.style}
			$gap={gap}
			$fit={fit}
			$fill={fill}
			$responsive={props?.responsive}
			$reverse={reverse}
			data-col={props?.align}
			data-show={props?.show}
			data-hide={props?.hide}
		>
			{props.children}
		</Style>
	);
}
