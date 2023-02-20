/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { transferItem } from 'api/items/itemsApi';
import { nftItem } from 'models/item';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useEffect, useState } from 'react';
import { selectUser } from 'redux/slices/userInfo';
import { toast } from 'react-toastify';
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
	const userInfo = useAppSelector(selectUser);
	const [receiver, setReceiver] = useState('');
	const [amount, setAmount] = useState<any>();
	const [error, setError] = useState<any>({});
	const { directTransferToken, checkEnableReceivingNFT } = useTransfer();
	const handleClose = () => {
		setOpen(false);
	};
	const handleChangeAmount = (e: any) => {
		let value = e.target.value;
		if (value < 0) {
			e.target.value = 1;
			setAmount(1);
			return;
		} else if (value > quantity) {
			e.target.value = quantity;
			setAmount(quantity);
			return;
		}
		setAmount(e.target.value);
	};
	const checkInput = async () => {
		let error = {};
		if (receiver === '') {
			error = { ...error, receiver: 'Receiver is required' };
		} else if (!/^(0x[0-9a-fA-F]{64})$/.test(receiver)) {
			error = { ...error, receiver: 'Receiver is invalid' };
		} else {
			let isEnable = await checkEnableReceivingNFT(receiver);
			if (!isEnable) {
				error = { ...error, receiver: 'Receiver is not enable to receive NFT' };
			}
		}
		if (!amount) {
			error = { ...error, amount: 'Amount is required' };
		} else if (amount > quantity) {
			error = { ...error, amount: 'Amount is invalid' };
		}
		setError(error);
		return error;
	};
	const handleSend = async () => {
		if (itemInfo) {
			let error = await checkInput();
			if (Object.keys(error).length > 0) {
				return;
			}
			await directTransferToken(
				receiver,
				itemInfo.creator,
				itemInfo.collectionInfo.collectionName,
				itemInfo.itemName,
				amount
			)
				.then((res) => {
					let data = {
						itemId: itemInfo._id,
						quantity: amount,
						receive: receiver,
						send: userInfo?.userAddress!,
						txHash: res.hash,
					};
					transferItem(data);
					toast.success('Successfully transfer');
				})
				.catch((err) => {
					toast.error(err.message);
				});
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
						onBlur={checkInput}
					/>
				</Box>
				{error && (
					<Typography variant="body1" sx={{ fontWeight: '500', color: 'red' }}>
						{error?.receiver}
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
				{error && (
					<Typography variant="body1" sx={{ fontWeight: '500', color: 'red' }}>
						{error?.amount}
					</Typography>
				)}

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
