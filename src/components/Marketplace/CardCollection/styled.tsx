import { styled, Box } from '@mui/material';

export const ItemImage = styled(Box)(({ theme }) => ({
	position: 'relative',
	width: '100%',
	paddingTop: '100%',
	borderRadius: '12px',
	overflow: 'hidden',

	'.main-img img, video': {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		// maxHeight: '100%',
		// maxWidth: '100%',
		width: '100%',
		borderRadius: '10px',
	},
}));
