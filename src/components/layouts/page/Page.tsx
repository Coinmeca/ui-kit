import Style from './Page.styled';

export interface Content {
	children?: any;
	style?: object;
	active?: boolean;
}

export default function Page(props: Content) {
	return (
		<Style $active={props?.active} style={props?.style}>
			{props?.children}
		</Style>
	);
}
