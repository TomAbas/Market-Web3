import React from 'react';
import { Box } from '@mui/material';
import FilterPrice from 'components/Marketplace/FilterItem/FilterPrice/';

const FilterItem = () => {
	return (
		<>
			<Box sx={{ display: 'flex', width: '300px' }}>
				<FilterPrice />
			</Box>
		</>
	);
};

export default FilterItem;
