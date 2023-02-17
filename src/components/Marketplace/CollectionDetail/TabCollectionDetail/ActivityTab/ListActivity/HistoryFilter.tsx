/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import iconMint from '../../../../../../assets/icons/iconMint.svg';
import iconMintWhite from '../../../../../../assets/icons/iconMint-white.svg';
import iconCancel from '../../../../../../assets/icons/iconCancel.svg';
import iconCancelWhite from '../../../../../../assets/icons/iconCancel-white.svg';
import iconListing from '../../../../../../assets/icons/iconListing.svg';
import iconListingWhite from '../../../../../../assets/icons/iconListing-white.svg';
import iconOrder from '../../../../../../assets/icons/iconOrder.svg';
import iconOrderWhite from '../../../../../../assets/icons/iconOrder-white.svg';
import IconSearch from '../../../../../../assets/icons/icon-search-black.svg';
import { FilterButton } from '../styled';
interface Props {
	currentHistoryType: any;
	setCurrentHistoryType: any;
	setInputSearch: any;
}
const HistoryFilter: React.FC<Props> = ({
	setCurrentHistoryType,
	currentHistoryType,
	setInputSearch,
}) => {
	// const [currentHistoryType, setCurrentHistoryType] = useState<string | undefined>('');
	const [isShowMore, setIsShowMore] = useState<boolean>(false);
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					marginBottom: 2,
					gap: '10px',
					padding: '12px 16px',
					border: '1px solid #E7E8EC',
					background: '#fff',
					borderRadius: '12px',
					img: {
						width: '20px',
					},
					input: {
						outline: 'none',
						border: 0,
						width: '100%',
						fontStyle: 'italic',
						'::placeholder': {
							fontStyle: 'italic',
						},
					},
				}}
			>
				<img src={IconSearch} alt="search icon" />
				<input
					placeholder="Search name..."
					onChange={(e) => {
						setInputSearch(e.target.value);
					}}
				/>
			</Box>

			<Typography variant="h6" fontWeight="600">
				FilterNft
			</Typography>

			<Stack direction="row" alignItems="center" gap={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
				{Object.keys(currentHistoryType).map((historyType: string, index: number) => {
					// just show 6 activity when !isShowMore
					if (!isShowMore && index > 6) return null;

					const { active, icon, iconActive } = currentHistoryType[historyType];

					return (
						<FilterButton
							key={index}
							onClick={() => {
								setCurrentHistoryType({
									...currentHistoryType,
									[historyType]: {
										...currentHistoryType[historyType],
										active: !active,
									},
								});
							}}
							className={active ? 'active' : ''}
						>
							<Box>
								<img src={active ? iconActive : icon} alt={historyType} />
							</Box>
							<Typography fontSize={12} fontWeight={500}>
								{historyType}
							</Typography>
						</FilterButton>
					);
				})}

				{/* <FilterButton
					onClick={() => {
						setIsShowMore(!isShowMore);
					}}
				>
					<Typography fontSize={12} color="#007aff" fontWeight={500}>
						{isShowMore ? 'Clear All' : 'Clear All'}
					</Typography>
				</FilterButton> */}
			</Stack>
		</>
	);
};

export default HistoryFilter;
