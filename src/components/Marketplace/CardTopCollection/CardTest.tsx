import React from 'react';
import { CollectionTop as Collection } from 'models/collection';
import {
	CollectionAvatar,
	CollectionInfo,
	CollectionItem,
	CollectionRank,
	LinkWrapper,
	NameInfo,
	TotalInfo,
} from './styled';
import { Box, Tooltip } from '@mui/material';
// import VerifiedIcon from '../../../assets/icons/icon-verify-check.svg';
import VerifiedIcon from '../../../assets/icons/icon-verify-check.svg';
import { sliceString } from 'utils/function';
interface Props {
	idx: number;
	collection: Collection;
	filter: string;
}
const CardTest: React.FC<Props> = ({ idx, collection, filter }) => {
	const getVolumeTrade = (type: string, collection: Collection) => {
		if (type === '1 day') {
			return (collection.volume24Hour / 10 ** 7).toFixed(2);
		} else if (type === '7 days') {
			return (collection.volume7Days / 10 ** 7).toFixed(2);
		} else return (collection.volume30Days / 10 ** 7).toFixed(2);
	};
	return (
		<>
			{' '}
			<LinkWrapper>
				<CollectionItem direction="row" alignItems="center">
					<CollectionRank>
						<div>{idx + 1}</div>
					</CollectionRank>
					<Box
						sx={{
							position: 'absolute',
							left: '6px',
							top: '40px',
							zIndex: 2,
							width: '24px',
							height: '24px',
							padding: '4px',
							background: '#007aff',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: '50%',
							border: '2px solid #fff',
						}}
					>
						<Tooltip title="Collection verified" placement="top" arrow>
							<img src={VerifiedIcon} alt="icon verified" />
						</Tooltip>
					</Box>
					<CollectionAvatar src={collection.logo} alt="avatar" />
					<CollectionInfo>
						<NameInfo variant="body1" noWrap>
							{sliceString(collection.collectionName!, 15)}
						</NameInfo>
						{collection.volumeTrade !== 0 && (
							<TotalInfo variant="body2">
								$ {getVolumeTrade(filter, collection)}
							</TotalInfo>
						)}
					</CollectionInfo>
				</CollectionItem>
			</LinkWrapper>
		</>
	);
};

export default CardTest;
