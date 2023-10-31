'use client';
import {useState} from 'react';
import {Root} from 'lib/style';
import {Layouts} from 'components';
import {Treasury} from 'prefabs';
import {Token} from 'types/web3';
import useWindowSize from 'hooks/useWindowSize';
import Data from './data';

export default function Page() {
	const {windowSize} = useWindowSize();

	const [page, setPage] = useState<'vault' | 'farm' | undefined>('vault');
	const [asset, setAsset] = useState<Token | undefined>();
	const [farm, setFarm] = useState<Token | undefined>();

	const Dummy = Data();
	const props = {
		assets: Dummy.assets,
		responsive: windowSize.width <= Root.Device.Mobile,
		asset: asset,
		charts: {
			value: Dummy.value,
			volume: Dummy.volume
		}
	};

	return (
		<Layouts.Page style={{background: 'rgb(var(--dim))'}}>
			<Layouts.Contents.SlideContainer
				contents={[
					{
						active: !asset,
						children: (
							<Treasury.View
								assets={props?.assets}
								page={page}
								charts={props?.charts}
								onPage={(page?: 'vault' | 'farm') => setPage(page)}
								onSelect={(a?: Token, f?: any) => {
									setAsset(a);
									setFarm(f);
								}}
								responsive={props?.responsive}
							/>
						)
					},
					{
						active: !!asset,
						children: (
							<Treasury.Detail
								asset={asset}
								onBack={() => {
									setAsset(undefined);
									setFarm(undefined);
								}}
								responsive={props?.responsive}
							/>
						)
					}
				]}
			/>
		</Layouts.Page>
	);
}
