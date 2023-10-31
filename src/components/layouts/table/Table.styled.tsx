'use client';
import {styled} from 'styled-components';

export const NoData = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
`;

const Style = styled.div`
	font-size: 1em;

	display: table;
	border-collapse: collapse;
	width: 100%;
	overflow: hidden auto;
	scroll-snap-type: y mandatory;
	-webkit-overflow-scrolling: touch;
`;

export default Style;
