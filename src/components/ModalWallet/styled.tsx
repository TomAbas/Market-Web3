import { styled, Stack } from '@mui/material';

export const DropDownContent = styled(Stack)(() => ({
	position: 'absolute',
	fontWeight: '300',
	right: 0,
	minWidth: 180,
	borderRadius: 12,
	zIndex: 100,
	top: '130%',
	animation: 'smoothAppear 0.5s',
	backgroundColor: 'rgba(177, 218, 255, 0.45)',
	color: '#fff',
	fontFamily: '',
}));
