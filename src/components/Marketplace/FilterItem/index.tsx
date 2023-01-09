import { Stack } from '@mui/material';
import React from 'react';
import Blockchain from './Blockchain';

export default function FilterItem() {
	return (
		<>
			<Stack direction="row" gap="10px">
				<Blockchain />
			</Stack>
		</>
	);
}
