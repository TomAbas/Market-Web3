import React from 'react';
import Modal from '@mui/material/Modal';
import { useAppSelector } from 'redux/hooks';
import { sellectStateGuard } from 'redux/slices/modalGuard';
import { Box } from '@mui/material';
const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	// border: '2px solid #000',
	borderRadius: '12px',
	boxShadow: 24,
	p: 4,
};
const ModalGuard = () => {
	const guardState = useAppSelector(sellectStateGuard);
	return (
		<>
			<Modal
				open={guardState}
				// onClose={closeModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<h1>Currently we only support testnet</h1>
					<h1>Please change the network on your wallet</h1>
					<h1>THANK YOU</h1>
				</Box>
			</Modal>
		</>
	);
};

export default ModalGuard;
