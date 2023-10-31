import {css, styled} from 'styled-components';

const Style = styled.div<{
	$scale: number;
	$toggle: boolean;
	$active: boolean;
	$padding: boolean;
	$fit: boolean;
	$disabled: boolean;
}>`
	font-size: ${({$scale}) => $scale}em;
	font-weight: bold;
	${({$fit}) => $fit && 'max-width: max-content'};
	min-width: max-content;
	padding: 0 ${({$padding}) => ($padding ? 1 : 0.75)}em;
	cursor: pointer;
	-webkit-user-drag: none;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	transition: 0.3s ease;

	& > * {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		min-width: 2em;
		min-height: 4em;
		gap: 0.5em;

		& > span {
			font-size: 1.5em;
		}
	}

	color: rgba(var(--white), var(--o045));
	& i svg {
		fill: rgba(var(--white), var(--o045));
	}

	&:hover {
		color: rgba(var(--white), var(--o1));
		& i svg {
			fill: rgba(var(--white), var(--o1));
		}
	}

	&:active {
		background: rgba(var(--white), var(--o015));
	}

	${({$active, $toggle}) => {
		return (
			$active &&
			css`
				background: transparent;
				cursor: ${$toggle ? 'pointer' : 'default'};
				pointer-events: ${$toggle ? 'inherit' : 'none'};
				color: rgb(var(--white));
				& i svg {
					fill: rgb(var(--white));
				}
			`
		);
	}}

	${({$disabled}) => {
		return (
			$disabled &&
			css`
				// opacity: 0.45;
				cursor: initial;
				pointer-events: none !important;
			`
		);
	}}
`;

export default Style;
