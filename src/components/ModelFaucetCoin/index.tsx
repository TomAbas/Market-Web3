import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { Stack } from '@mui/material';
import { Grid } from '@mui/material';
import useTransfer from 'utils/transfer';
import { ListTokenPaymentTestNet } from 'constants/sellItem';
import { toast } from 'react-toastify';
import { Asterisk } from 'components/Forms/Common/styled';
import { useAppSelector } from 'redux/hooks';
import { selectUser } from 'redux/slices/userInfo';

interface Props {
	open: boolean;
	title: string;
	subtitle: string;
	warning: string;
	closeModal: any;
}
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
const ModalFaucetCoin: React.FC<Props> = ({ title, closeModal, open, subtitle, warning }) => {
	const userInfo = useAppSelector(selectUser);
	const { faucet, checkCoinStore, registerCoin } = useTransfer();
	const handleFaucte = async (coinType: string, decimals: number) => {
		if (!(await checkCoinStore(userInfo?.userAddress!, coinType))) {
			try {
				await registerCoin(coinType);
				await new Promise((resolve) => setTimeout(resolve, 1500));
				await faucet(coinType, decimals);
				toast.success('Faucet success');
			} catch (error) {
				toast.error('Faucet fail');
			}
		} else {
			faucet(coinType, decimals)
				.then((res) => {
					toast.success('Faucet success');
				})
				.catch((err) => {
					toast.error('Faucet fail');
				});
		}
	};

	return (
		<Modal
			open={open}
			onClose={closeModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Box sx={{ textAlign: 'center', marginBottom: '15px' }}>
					<Typography variant="h5" sx={{ fontWeight: '500' }}>
						{title}
					</Typography>
				</Box>
				<Typography
					variant="body2"
					sx={{ fontWeight: '500', textAlign: 'center', marginBottom: '15px' }}
				>
					{subtitle}
				</Typography>
				<Stack direction="row" justifyContent="center" alignItems="center">
					<Grid container>
						{ListTokenPaymentTestNet.slice(0, -1).map((token, index) => {
							return (
								<>
									<Grid item xs={6}>
										<Box
											sx={{
												display: 'flex',
												gap: '16px',
												margin: '10px 10px',
												border: '1px solid #E5E5E5',
												borderRadius: '8px',
												boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
												justifyContent: 'center',
												alignItems: 'center',
												padding: '8px 20px',
												'&:hover': {
													cursor: 'pointer',
													backgroundColor: '#F5F5F5',
												},
												'&:active': {
													backgroundColor: '#E5E5E5',
												},
											}}
											onClick={() => handleFaucte(token.type, token.decimals)}
										>
											<img
												src={token.image}
												alt="icon coint"
												style={{ width: '30px' }}
											/>
											<Typography
												variant="body1"
												sx={{ fontWeight: '500', width: '50px' }}
											>
												{token.name}
											</Typography>
										</Box>
									</Grid>
								</>
							);
						})}
					</Grid>
				</Stack>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						marginBottom: '15px',
					}}
				>
					<Asterisk />
					<Typography
						sx={{
							color: 'red',
							fontSize: '15px',
							fontWeight: '500',
						}}
						ml={0.5}
					>
						{warning}
					</Typography>
				</Box>
			</Box>
		</Modal>
	);
};
export default ModalFaucetCoin;
