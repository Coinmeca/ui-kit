import {memo} from 'react';
import Style from './SlideContent.styled';

export interface SlideContent {
	name?: string;
	active?: boolean;
	children?: any;
	style?: object;
}

function SlideContent(props: SlideContent) {
	const active = props?.active || false;

	return (
		<Style style={props?.style} data-active={active}>
			{props?.children}
		</Style>
	);
}

export default memo(SlideContent);
