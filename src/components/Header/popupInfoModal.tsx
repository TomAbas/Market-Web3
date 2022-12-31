import React, { useState } from 'react';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { getBalanceUser } from '../../utils/getUser';
import { Box, Stack, Typography } from '@mui/material';
// import userIcon from '../../assets/icons/icon-user-black.svg';

const ModalInfo: React.FC = () => {
	const [myBalance, setMyBalance] = useState(0);
	// useState
	const { account } = useWallet();
	let myAddress = account?.address?.toString();
	const fetchBalance = async () => {
		try {
			let balance: number = await getBalanceUser(account?.address);
			setMyBalance(balance);
		} catch (error) {
			// return 0;
		}
	};
	if (myAddress) {
		myAddress =
			myAddress.slice(0, 6) + '...' + myAddress.slice(myAddress.length - 4, myAddress.length);
		fetchBalance();
	} else {
		myAddress = '';
	}
	return (
		<PopupState variant="popover" popupId="demo-popup-menu">
			{(popupState) => (
				<React.Fragment>
					<Box
						{...bindTrigger(popupState)}
						sx={{
							boxShadow: '0',
							position: 'relative',
							img: {
								display: 'block',
							},
						}}
					>
						<Stack gap={1.5} {...bindMenu(popupState)}>
							<Stack
								onClick={popupState.close}
								direction="row"
								alignItems="center"
								gap={2}
								sx={{
									img: {
										borderRadius: '50%',
									},
								}}
							>
								<img
									src="https://i.pinimg.com/736x/25/47/c7/2547c7ecb55605fbb39e04157f157021.jpg"
									alt="Wallet"
									width={50}
									height={50}
								/>
								<Typography variant="body1">{myAddress}</Typography>
							</Stack>
							<Stack
								justifyContent="space-between"
								alignItems="center"
								direction="row"
								onClick={popupState.close}
							>
								<Box>APT</Box>{' '}
								<Box>{Math.floor(myBalance / 1000000) / 100} APT</Box>
							</Stack>
							<Stack gap={1.5} pl={2}>
								<Box onClick={popupState.close}>
									<a
										href="/#/profile"
										style={{
											color: 'black',
										}}
									>
										Profile
									</a>
								</Box>
								<Box onClick={popupState.close}>My Collections</Box>
								<Box onClick={popupState.close}>Settings</Box>
								<Box onClick={popupState.close}>Logout</Box>
							</Stack>
						</Stack>
					</Box>
				</React.Fragment>
			)}
		</PopupState>
	);
};

export default ModalInfo;
