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
	backgroundColor: '#fff',
	color: '#000',
	fontFamily: '',
}));
