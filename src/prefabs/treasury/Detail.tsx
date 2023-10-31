'use client';
import {Contents, Controls, Layouts} from 'components';
import {Treasury} from 'prefabs';
import {AnimatePresence} from 'framer-motion';
import type {Token} from 'types/web3';

import Data from 'app/samples/treasury/data';

export interface Detail {
	asset?: Token;
	farm?: any;
	onBack?: Function;
	responsive?: boolean;
}

export default function Detail(props: Detail) {
	const {vault} = Data();

	return (
		<Layouts.Box fit>
			<AnimatePresence>
				{props?.asset && props?.asset?.symbol !== '' ? (
					<Treasury.Vault.Pages.Detail
						asset={props?.asset}
						info={vault?.info}
						history={vault?.history}
						charts={{
							rate: vault?.charts?.rate,
							value: vault?.charts?.value,
							volume: vault?.charts?.volume
						}}
						responsive={props?.responsive}
						onBack={props?.onBack}
					/>
				) : props?.asset && props?.asset?.symbol !== '' ? (
					<></>
				) : (
					<Contents.States.Failure message={'Oops, something wrong'}>
						<Controls.Button onClick={props?.onBack}>Go Back</Controls.Button>
					</Contents.States.Failure>
				)}
			</AnimatePresence>
		</Layouts.Box>
	);
}
