/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { nftItem } from 'models/item';
import { useEffect, useState } from 'react';
import useTransfer from 'utils/transfer';
interface Props {
	itemInfo: nftItem | undefined;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	quantity: number;
}
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	borderRadius: '12px',
	boxShadow: 24,
	p: 4,
};
const ModalTransferNFT: React.FC<Props> = ({ itemInfo, setOpen, open, quantity }) => {
	const [receiver, setReceiver] = useState('');
	const [amount, setAmount] = useState<any>();
	const [error, setError] = useState('');
	const { directTransferToken, checkEnableReceivingNFT } = useTransfer();
	const handleClose = () => {
		setOpen(false);
	};
	const handleChangeAmount = (e: any) => {
		let value = e.target.value;
		if (value > quantity) {
			e.target.value = quantity;
			setAmount(quantity);
			return;
		} else if (value < 1) {
			e.target.value = 1;
			setAmount(1);
			return;
		}
		setAmount(value);
	};
	const checkReceiver = async () => {
		if (receiver === '') {
			setError('Receiver is required');
			return;
		}
		if (!/^(0x[0-9a-fA-F]{64})$/.test(receiver)) {
			setError('Receiver is invalid');
			return;
		}
		let isEnable = await checkEnableReceivingNFT(receiver);
		if (!isEnable) {
			setError('Receiver is not enable to receive NFT');
			return;
		}
		setError('');
	};
	const handleSend = async () => {
		if (itemInfo) {
			if (receiver === '') {
				setError('Receiver is required');
				return;
			}
			await directTransferToken(
				receiver,
				itemInfo.creator,
				itemInfo.collectionInfo.collectionName,
				itemInfo.itemName,
				amount
			);
			setOpen(false);
		}
	};
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Box sx={{ textAlign: 'center', marginBottom: '15px' }}>
					<Typography variant="h5" sx={{ fontWeight: '500' }}>
						Transfer Item
					</Typography>
				</Box>
				<Typography variant="body1" sx={{ fontWeight: '500' }}>
					To:
				</Typography>
				<Box
					sx={{
						border: '1.5px solid #e7e8ec',
						borderRadius: '10px',
						input: {
							borderRadius: '10px',
							border: '0px solid white',
							padding: '10px 24px',
							outline: 'none',
							fontSize: '16px',
							fontStyle: 'italic',
							width: '100%',
						},
					}}
				>
					<input
						type="text"
						value={receiver}
						onChange={(e) => setReceiver(e.target.value)}
						placeholder="Receiver"
						onBlur={checkReceiver}
					/>
				</Box>
				{error && (
					<Typography variant="body1" sx={{ fontWeight: '500', color: 'red' }}>
						{error}
					</Typography>
				)}

				<Typography variant="body1" sx={{ fontWeight: '500' }}>
					Amount:
				</Typography>
				<Box
					sx={{
						border: '1.5px solid #e7e8ec',
						borderRadius: '10px',
						input: {
							borderRadius: '10px',
							border: '0px solid white',
							padding: '10px 24px',
							outline: 'none',
							fontSize: '16px',
							fontStyle: 'italic',
							width: '100%',
						},
					}}
				>
					<input
						type="number"
						value={amount}
						onChange={handleChangeAmount}
						placeholder="Amount"
						max={quantity}
					/>
				</Box>

				{/* button center */}
				<Box sx={{ textAlign: 'center', marginTop: '15px' }}>
					<Box
						sx={{
							button: {
								padding: '8px 16px',
								border: '1.5px solid #e7e8ec',
								transition: 'all 0.4s',
								borderRadius: '12px',
								fontWeight: 500,
								background: '#fff',
								fontSize: '18px',
								cursor: 'pointer',
								fontFamily: 'Montserrat, sans-serif !important',
								fontStyle: 'italic !important',
								width: '180px',
								'&:hover': {
									background: '#007aff',
									borderColor: 'transparent',
									color: '#fff',
								},
							},
						}}
					>
						<button onClick={handleSend}>Transfer</button>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};

export default ModalTransferNFT;
