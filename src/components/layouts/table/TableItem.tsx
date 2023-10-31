'use client';
import Style, {Row, Cell} from './TableItem.styled';

export interface ListItem {
	children?: any;
	style?: object;
	align?: 'left' | 'center' | 'right';
	change?: string;
	active?: boolean;
	onClick?: Function;
}

export default function TableItem(props: ListItem) {
	const TableRow = (data: any) => {
		return (
			data &&
			(typeof data !== 'string' && data?.length > 0 ? (
				data?.map((info: any, i: number) => (
					<Row key={i} $change={info?.change} style={{...info?.style}} data-row={info?.align}>
						{TableCell(info?.children || info)}
					</Row>
				))
			) : (
				<span data-row={data?.align}>{data}</span>
			))
		);
	};

	const TableCell = (data: any) => {
		return (
			data &&
			(typeof data !== 'string' && data?.length > 0 ? (
				data?.map((info: any, i: number) => (
					<Cell key={i} $change={info?.change} style={data?.style} data-col={info?.align}>
						{TableRow(info?.children || info)}
					</Cell>
				))
			) : (
				<span data-col={data?.align}>{data}</span>
			))
		);
	};

	const handleClick = (e: any) => {
		if (typeof props?.onClick === 'function') props?.onClick(props, e);
	};

	return (
		<Style
			$change={props?.change}
			style={props?.style}
			onClick={(e: any) => handleClick(e)}
			$event={typeof props?.onClick === 'function' ? true : false}
			data-active={props?.active}
		>
			{TableCell(props?.children)}
		</Style>
	);
}
