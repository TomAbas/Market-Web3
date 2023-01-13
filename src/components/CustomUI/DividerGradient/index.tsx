import React from 'react';
import { styled } from '@mui/material';

const DividerGradientStyle = styled('div')(({ theme }) => ({
	width: '100%',
	height: '1.5px',
	margin: 'auto',
	...(theme.palette.mode === 'light'
		? {
				background: '#E7E8EC',
		  }
		: {
				// backgroundImage: theme.palette.gradients.line,
		  }),
}));

export interface DividerGradientProps {
	sx?: object;
}

export default function DividerGradient({ sx }: DividerGradientProps) {
	return <DividerGradientStyle sx={sx}></DividerGradientStyle>;
}
