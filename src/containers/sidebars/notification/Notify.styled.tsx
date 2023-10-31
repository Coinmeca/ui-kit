import {css, styled} from 'styled-components';
import * as Box from 'components/layouts/box/Box.styled';
import * as Row from 'components/layouts/row/Row.styled';
import * as Col from 'components/layouts/col/Col.styled';
import * as Button from 'components/controls/button/Button.styled';

const Style = styled.div<{$active: boolean}>`
	max-height: 100%;
	scroll-snap-align: start;
	transition: 0.3s ease;

	&:last-child {
		scroll-snap-align: end;
	}

	${Box.default} {
		background: rgba(var(--white), var(--o015));
		backdrop-filter: blur(calc(var(--unit) * 16));
		width: auto;
		transition: 0.3s ease;
		padding: 1.25em 0 1.5em;

		& > ${Col.default} {
			& > *:not(img) {
				width: calc(100% - 4em);
				padding: 0 2em;
			}

			& ${Row.default} {
				align-items: center;
			}

			& > ${Row.default} > ${Row.default} {
				& > strong {
					opacity: 0.45;
				}

				& > ${Button.default}:last-child {
					margin-right: -1em;
				}
			}
		}
	}

	${({$active}) =>
		!$active &&
		css`
			max-height: 0;
			${Box.default} {
				transform: translateX(100%);
			}
		`}
`;

export default Style;
