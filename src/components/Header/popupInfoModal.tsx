import React, { useEffect, useState } from 'react';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { getBalanceUser } from '../../utils/getUser';
import { Box, Link, Stack, Typography } from '@mui/material';

// import userIcon from '../../assets/icons/icon-user-black.svg';
interface Props {
	userAddress: any;
}
const ModalInfo: React.FC<Props> = ({ userAddress }) => {
	const [myBalance, setMyBalance] = useState(0);
	const [sliceAdd, setSliceAdd] = useState('');
	// useState
	const { disconnect } = useWallet();
	const fetchBalance = async () => {
		if (userAddress) {
			let myAddress =
				userAddress.toString().slice(0, 6) +
				'...' +
				userAddress
					.toString()
					.slice(userAddress.toString().length - 4, userAddress.toString().length);
			setSliceAdd(myAddress);
			try {
				let balance: number = await getBalanceUser(userAddress);
				setMyBalance(balance);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const disConnect = () => {
		disconnect();
	};
	useEffect(() => {
		fetchBalance();
	}, []);
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
								<Typography variant="body1">{sliceAdd}</Typography>
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
									<Link
										href="/#/profile"
										sx={{
											color: 'black',
											textDecoration: 'none',
											'&:hover': {
												color: '#007aff',
											},
										}}
									>
										Profile
									</Link>
								</Box>
								<Box onClick={popupState.close}>
									<Link
										href="/#/myCollection"
										sx={{
											color: 'black',
											textDecoration: 'none',
											'&:hover': {
												color: '#007aff',
											},
										}}
									>
										My Collections
									</Link>
								</Box>
								<Box onClick={popupState.close}>Settings</Box>
								<Box
									onClick={disConnect}
									sx={{
										cursor: 'pointer',
										'&:hover': {
											color: '#007aff',
										},
									}}
								>
									Logout
								</Box>
							</Stack>
						</Stack>
					</Box>
				</React.Fragment>
			)}
		</PopupState>
	);
};

// export default ModalInfo;
export default React.memo(ModalInfo);
