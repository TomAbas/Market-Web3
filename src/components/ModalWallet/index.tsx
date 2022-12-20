import React from 'react';

import { Box, Stack, Typography } from '@mui/material';
import { listWalletAvailable } from '../../constants';

import { useUserInfo } from '../../redux/actions/userAction';

const ModalWallet: React.FC = () => {
	const { connectWalletFunc } = useUserInfo();
	return (
		<>
			{' '}
			{listWalletAvailable.map((wallet, idx) => {
				return (
					<Box my={1} sx={{ cursor: 'pointer', userSelect: 'none' }} key={idx}>
						<Stack direction="row" justifyContent="space-between" alignItems="center">
							<Stack
								direction="row"
								gap={2}
								alignItems="center"
								onClick={() => connectWalletFunc(wallet.connector)}
							>
								<img
									style={{
										width: '48px',
										height: '48px',
									}}
									src={wallet.image}
									alt={wallet.name}
								/>
								<Typography fontStyle="italic" style={{ marginBottom: 0 }}>
									{wallet.name}
								</Typography>
							</Stack>
						</Stack>
					</Box>
				);
			})}
		</>
	);
};

export default ModalWallet;
