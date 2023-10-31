'use client';
import {useEffect} from 'react';
import useToast from 'hooks/useToast';
import type {Notify} from 'hooks/useToast';
import {Controls, Layouts} from 'components';
import {Text} from 'components/elements';
import Image from 'next/image';
import Style from './Notify.styled';

export default function Notify(props: Notify) {
	const {RemoveNotify} = useToast();

	const timer = props?.timer || 3000;
	const active = props?.id ? true : false;

	useEffect(() => {
		const timeOut: any = setTimeout(
			() => {
				RemoveNotify(props?.id);
			},
			props?.importance ? timer * 2 : timer
		);
		timeOut;
	}, [active]);

	const handleRemove = (id?: string | number) => {
		id && RemoveNotify(id);
	};

	return (
		<Style $active={active}>
			<Layouts.Box>
				<Layouts.Col gap={1}>
					<Layouts.Row fix>
						<Text size={1.25} weight={'bold'}>
							{props?.title}
						</Text>
						<Layouts.Row fix gap={1} style={{minWidth: 'max-content'}}>
							<Text type={'desc'} align={'right'} weight={'bold'}>
								{/* "YYYY-MM-DD HH:mm:ss" */}
								{props?.date?.toLocaleString()}
							</Text>
							<Controls.Button scale={0.75} icon={'x'} fit onClick={() => handleRemove(props?.id)} />
						</Layouts.Row>
					</Layouts.Row>
					{props?.img && <Image src={props?.img} width={0} height={0} alt={''} />}
					{props?.message && (
						<span>
							<Text type={'p'}>{props?.message}</Text>
						</span>
					)}
				</Layouts.Col>
			</Layouts.Box>
		</Style>
	);
}
