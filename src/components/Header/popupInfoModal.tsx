/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { getBalanceUser } from '../../utils/getUser';
import { Box, Link, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectUser, toggleSettingModalA } from 'redux/slices/userInfo';
// import userIcon from '../../assets/icons/icon-user-black.svg';
//img
//Img update
import IconUserWhite from 'assets/icons/NavBar/icon-user-white.svg';
import IconUserBlack from 'assets/icons/NavBar/icon-user-black.svg';
import IconHeartWhite from 'assets/icons/NavBar/icon-heart-white.svg';
import IconHeartBlack from 'assets/icons/NavBar/icon-heart-black.svg';
import IconEyeWhite from 'assets/icons/NavBar/icon-eye-white.svg';
import IconEyeBlack from 'assets/icons/NavBar/icon-eye-black.svg';
import IconCollectionWhite from 'assets/icons/NavBar/icon-collection-white.svg';
import IconCollectionBlack from 'assets/icons/NavBar/icon-collection-black.svg';
import IconSettingWhite from 'assets/icons/NavBar/icon-setting-white.svg';
import IconSettingBlack from 'assets/icons/NavBar/icon-setting-black.svg';
import IconLogoutWhite from 'assets/icons/NavBar/icon-logout-white.svg';
import IconLogoutBlack from 'assets/icons/NavBar/icon-logout-black.svg';
import { toast } from 'react-toastify';
interface Props {
	userAddress: any;
}
const ModalInfo: React.FC<Props> = ({ userAddress }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [myBalance, setMyBalance] = useState(0);
	const [sliceAdd, setSliceAdd] = useState('');
	const userInfo = useAppSelector(selectUser);
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
		try {
			disconnect();
			toast.success('Logout Success');
			navigate('/');
		} catch (error: any) {
			toast.error(error.message);
		}
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
									cursor: 'pointer',
									img: {
										borderRadius: '50%',
									},
								}}
							>
								<img src={userInfo?.avatar} alt="Wallet" width={50} height={50} />
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
							<Stack gap={2} pl={2}>
								<Stack
									direction="row"
									gap="10px"
									alignItems="center"
									onClick={() => {
										navigate('/profile');
										popupState.close();
									}}
									sx={{
										cursor: 'pointer',
										img: {
											width: '20px',
										},
									}}
								>
									<img src={IconUserBlack} alt="profile" />
									<Link
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
								</Stack>
								<Stack
									direction="row"
									gap="10px"
									alignItems="center"
									sx={{
										cursor: 'pointer',
										img: {
											width: '20px',
										},
									}}
									onClick={() => {
										navigate('/myCollection');
										popupState.close();
									}}
								>
									<img src={IconCollectionBlack} alt="collection" />
									<Link
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
								</Stack>
								<Stack
									direction="row"
									gap="10px"
									alignItems="center"
									sx={{
										cursor: 'pointer',
										img: {
											width: '20px',
										},
									}}
									onClick={() => {
										navigate('/profile');
										dispatch(toggleSettingModalA());
									}}
								>
									<img src={IconSettingBlack} alt="setting" />
									<Link
										sx={{
											color: 'black',
											textDecoration: 'none',
											'&:hover': {
												color: '#007aff',
											},
										}}
									>
										Settings
									</Link>
								</Stack>
								<Stack
									direction="row"
									gap="10px"
									alignItems="center"
									sx={{
										img: {
											width: '20px',
										},
										cursor: 'pointer',
									}}
									onClick={disConnect}
								>
									<img src={IconLogoutBlack} alt="logout" />
									<Box
										sx={{
											'&:hover': {
												color: '#007aff',
											},
										}}
									>
										Logout
									</Box>
								</Stack>
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
