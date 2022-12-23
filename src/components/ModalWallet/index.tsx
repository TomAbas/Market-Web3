import React from 'react';

import { Box, Stack, Typography } from '@mui/material';
import { connectorsByName, listWalletAvailable } from '../../constants';

import { useUserInfo } from '../../redux/actions/userAction';
declare let window: any;
const ModalWallet: React.FC = () => {
	const { connectWalletFunc } = useUserInfo();
	return (
		<>
			{' '}
			{listWalletAvailable.map((wallet, idx) => {
				const isMetamask = window.ethereum && window.ethereum.isMetaMask;
				if (wallet.connector === connectorsByName.Injected) {
					//check is metamask
					if (!(window.web3 || window.ethereum)) {
						if (wallet.name === 'Metamask') {
							return (
								<Box
									my={1}
									sx={{ cursor: 'pointer', userSelect: 'none' }}
									key={idx}
								>
									<Stack
										direction="row"
										justifyContent="space-between"
										alignItems="center"
									>
										<a
											href="https://metamask.io"
											target="_blank"
											rel="noreferrer noopener"
											style={{
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												textDecoration: 'none',
												gap: '16px',
											}}
										>
											<Stack>
												<img
													style={{
														width: '48px',
														height: '48px',
													}}
													src={wallet.image}
													alt={wallet.name}
												/>
											</Stack>

											<Typography
												fontStyle="italic"
												style={{
													marginBottom: 0,
													textDecoration: 'none',
													color: '#fff',
												}}
											>
												Install {wallet.name}
											</Typography>
										</a>
									</Stack>
								</Box>
							);
						}
						// don't return metamask if injected provider isn't metamask
						else if (wallet.name === 'Metamask' && !isMetamask) {
							return null;
						}
						// likewise for generic
						else if (wallet.name === 'Injected' && isMetamask) {
							return null;
						}
					}
				}

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
