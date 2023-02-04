import React from 'react';
import { Box } from '@mui/material';
import FilterPrice from 'components/Marketplace/FilterItem/FilterPrice/';
import FilterStatus from 'components/Marketplace/FilterItem/FilterStatus/FilterStatus';

const FilterItem = () => {
	return (
		<>
			<Box sx={{ display: 'flex', width: '300px' }}>
				<FilterPrice />
				<FilterStatus />
			</Box>
		</>
	);
};

export default FilterItem;
