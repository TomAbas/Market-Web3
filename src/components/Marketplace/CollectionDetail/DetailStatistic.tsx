import React, { useContext } from 'react';
import { DetailStatistic, StatisticBox, StatisticNumber, StatisticTitle } from './styled';
import { SizeContext } from 'contexts/SizeObserver';

interface Props {
	numberItems: number;
	numberOwners: number;
	floorPrice: number;
	volumeTrades: number;
}

export const DetailCollectionStatistic = (props: Props) => {
	const { innerWidth } = useContext(SizeContext);
	const listStatistic = [
		{ title: 'Items', number: props.numberItems },
		{ title: 'Owners', number: props.numberOwners },
		{ title: 'Floor Price', number: props.floorPrice },
		{ title: 'Volume Traded', number: props.volumeTrades },
	];
	return (
		<DetailStatistic>
			{innerWidth > 600
				? listStatistic.map((item: any, index: number) => (
						<StatisticBox key={index}>
							<StatisticNumber variant="body1">{item.number}</StatisticNumber>
							<StatisticTitle variant="caption">{item.title}</StatisticTitle>
						</StatisticBox>
				  ))
				: listStatistic
						.map((item: any, index: number) => {
							if (index % 2 === 0) {
								return (
									<StatisticBox key={index}>
										<StatisticNumber variant="body1">
											{listStatistic[index].number}
										</StatisticNumber>
										<StatisticTitle variant="caption">
											{listStatistic[index].title}
										</StatisticTitle>

										<StatisticNumber variant="body1" sx={{ mt: 2 }}>
											{listStatistic[index + 1].number}
										</StatisticNumber>
										<StatisticTitle variant="caption">
											{listStatistic[index + 1].title}
										</StatisticTitle>
									</StatisticBox>
								);
							} else return null;
						})
						.filter((item: any) => item !== null)}
		</DetailStatistic>
	);
};
