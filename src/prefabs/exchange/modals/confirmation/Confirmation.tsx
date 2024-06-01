'use client';
import { Controls, Elements, Layouts } from 'components';
import { Modals } from 'containers';
import { Format } from 'lib/utils';
import { useEffect, useState } from 'react';
import type { Order as O } from 'types/order';

export interface Confirmation {
	mode?: boolean;
	color?: { buy?: string; sell?: string };
	order: O;
	onProcess: Function;
	onClose: Function;
}

export default function Confirmation(props: any) {
	const [process, setProcess] = useState<boolean | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const mode = typeof props?.mode === 'undefined' ? true : props?.mode;
	const color = {
		buy: props?.color?.buy || 'green',
		sell: props?.color?.sell || 'red',
	};

	const gap = {
		row: 2,
		space: {
			small: { padding: '0 0.5em' },
		},
	};

	const text = {
		height: 1.5,
		opacity: 0.45,
		label: { flex: 0 },
		setting: { fontFeatureSettings: `"tnum" on,"lnum" on` },
		width: { width: '100%', maxWidth: `${4}em` },
		align: 'right' as 'right',
	};

	const handleError = async (e: any, error?: any) => {
		if (typeof props?.onError === 'function') await props?.onError(e, error);
	};

	const handleConfirm = async (e: any) => {
		setLoading(true);
		if (typeof props?.onProcess === 'function')
			await props
				?.onProcess(props?.order, e)
				?.then(() => {
					setProcess(true);
				})
				?.catch((error: any) => {
					setProcess(false);
					handleError(e, error);
				});
		setLoading(false);
	};

	const handleBack = (e: any) => {
		setProcess(null);
		if (typeof props?.onBack === 'function') props?.onBack(e);
	};

	const handleClose = (e: any) => {
		setProcess(null);
		if (typeof props?.onClose === 'function') props?.onClose(e);
	};

	useEffect(() => {
		return () => setProcess(null);
	}, []);

	return (
		<Modals.Process
			process={process}
			title={`${mode ? 'Buy' : 'Sell'} Confirmation`}
			content={
				<Layouts.Col gap={2} style={{ height: '100%' }}>
					<Layouts.Contents.InnerContent style={{ justifyContent: 'center', ...text?.setting }}>
						<Layouts.Col gap={1}>
							<Layouts.Row gap={gap.row} style={gap.space.small} fix>
								<Elements.Text height={text.height} opacity={text.opacity} fit>
									Price
								</Elements.Text>
								<Layouts.Row gap={gap.row} fix>
									<Elements.Text color={mode ? color.buy : color.sell} height={text.height} align={text.align}>
										{Format(props?.order?.price, 'currency', {
											unit: 9,
											limit: 12,
											fix: 3,
										})}
									</Elements.Text>
									<Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
										{mode ? props?.order?.pay?.symbol : props?.order?.item?.symbol}
									</Elements.Text>
								</Layouts.Row>
							</Layouts.Row>
							<Layouts.Divider />
							<Layouts.Row gap={gap.row} style={gap.space.small} fix>
								<Elements.Text height={text.height} opacity={text.opacity} fit>
									Amount
								</Elements.Text>
								<Layouts.Row gap={gap.row} fix>
									<Elements.Text height={text.height} align={text.align}>
										{Format(props?.order?.amount, 'currency', {
											unit: 9,
											limit: 12,
											fix: 3,
										})}
									</Elements.Text>
									<Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
										{props?.order?.pay?.symbol}
									</Elements.Text>
								</Layouts.Row>
							</Layouts.Row>
							<Layouts.Row gap={gap.row} style={gap.space.small} fix>
								<Elements.Text height={text.height} opacity={text.opacity} fit>
									Quantity
								</Elements.Text>
								<Layouts.Row gap={gap.row} fix>
									<Elements.Text color={mode ? color.buy : color.sell} height={text.height} align={text.align}>
										{Format(props?.order?.quantity, 'currency', {
											unit: 9,
											limit: 12,
											fix: 3,
										})}
									</Elements.Text>
									<Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
										{props?.order?.item?.symbol}
									</Elements.Text>
								</Layouts.Row>
							</Layouts.Row>
							<Layouts.Divider />
							<Layouts.Row gap={gap.row} style={gap.space.small} fix>
								<Elements.Text height={text.height} opacity={text.opacity} fit>
									Fees
								</Elements.Text>
								<Layouts.Row gap={gap.row} fix>
									<Elements.Text opacity={0.45} height={text.height} align={text.align}>
										-{' '}
										{Format(props?.order?.fees, 'currency', {
											unit: 9,
											limit: 12,
											fix: 3,
										})}
									</Elements.Text>
									<Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
										{props?.order?.item?.symbol}
									</Elements.Text>
								</Layouts.Row>
							</Layouts.Row>
							<Layouts.Row gap={gap.row} style={gap.space.small} fix>
								<Elements.Text height={text.height} opacity={text.opacity} fit>
									Total
								</Elements.Text>
								<Layouts.Row gap={gap.row} fix>
									<Elements.Text color={mode ? color.buy : color.sell} height={text.height} align={text.align}>
										{Format(props?.order?.total as number, 'currency', {
											unit: 9,
											limit: 12,
											fix: 3,
										})}
									</Elements.Text>
									<Elements.Text height={text.height} opacity={text.opacity} style={text.width}>
										{props?.order?.item?.symbol}
									</Elements.Text>
								</Layouts.Row>
							</Layouts.Row>
						</Layouts.Col>
					</Layouts.Contents.InnerContent>
					<Controls.Button onClick={handleConfirm}>Confirm</Controls.Button>
				</Layouts.Col>
			}
			failure={{
				message: 'Your order has been failed to processing.',
				children: <Controls.Button onClick={(e: any) => handleBack(e)}>Go Back</Controls.Button>,
			}}
			loading={{
				active: loading,
				message: 'Please wait to done your transaction processing.',
			}}
			success={{
				message: 'Your order has been successfully completed.',
				children: <Controls.Button onClick={(e: any) => handleClose(e)}>OK</Controls.Button>,
			}}
			onClose={(e: any) => handleClose(e)}
			close={!loading}
		/>
	);
}
