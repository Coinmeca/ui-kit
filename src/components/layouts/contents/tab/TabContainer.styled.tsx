'use client';
import {styled} from 'styled-components';

const Style = styled.div<{$scroll?: boolean}>`
	position: relative;
	width: 100%;
	height: 100%;
	overflow: ${({$scroll}) => ($scroll ? 'auto' : 'hidden')};
`;

export default Style;
