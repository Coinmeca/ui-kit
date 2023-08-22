import Style from "./Row.styled";

export interface Row {
	children?: any;
	style?: object;
	gap?: number;
	change?: string | false;
	align?: "left" | "center" | "right" | "stretch";
	show?: "desktop" | "laptop" | "tablet" | "mobile";
	hide?: "desktop" | "laptop" | "tablet" | "mobile";
	responsive?: "desktop" | "laptop" | "tablet" | "mobile";
	reverse?: boolean;
	fill?: boolean;
	fit?: boolean;
	fix?: boolean;
}

export default function Row(props: Row) {
	const gap = props?.gap === 0 ? 0 : props?.gap || 4;
	const fill = props?.fill || false;
	const fit = props?.fit || false;
	const fix = props?.fix || false;
	const reverse = props?.reverse || false;

	return (
		<Style
			style={props?.style}
			$gap={gap}
			$change={props?.change || undefined}
			$fill={fill}
			$fix={fix}
			$fit={fit}
			$responsive={props?.responsive}
			$reverse={reverse}
			data-row={props?.align}
			data-show={props?.show}
			data-hide={props?.hide}
		>
			{props.children}
		</Style>
	);
}
