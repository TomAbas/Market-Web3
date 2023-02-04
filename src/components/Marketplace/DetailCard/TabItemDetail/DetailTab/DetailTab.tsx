import React from 'react';
import { TabWrapper, DetailTitle } from './styled';
import { Stack, Typography } from '@mui/material';
interface Props {
	userAmountOfItem: string;
}
const DetailTab: React.FC<Props> = ({ userAmountOfItem }) => {
	return (
		<>
			<TabWrapper>
				<Stack direction="row" spacing={2}>
					{/* Title */}
					<DetailTitle spacing={1}>
						<Typography variant="body1">Blockchain:</Typography>
						<Typography variant="body1">Owned Quantity:</Typography>
					</DetailTitle>

					{/* Value */}
					<Stack spacing={1} sx={{ minWidth: 0 }}>
						<Typography variant="body1">{2}</Typography>
						<Typography variant="body1">{userAmountOfItem}</Typography>
					</Stack>
				</Stack>
			</TabWrapper>
		</>
	);
};

export default DetailTab;
