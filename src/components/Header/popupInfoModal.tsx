import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { getBalanceUser } from '../../utils/getUser';

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
					<Button
						variant="contained"
						{...bindTrigger(popupState)}
						sx={{
							boxShadow: '0',
							':hover': {
								backgroundColor: 'white',
							},
							backgroundColor: 'white',
						}}
					>
						<img
							src="../../assets/navbar/icon-user-black_3.svg"
							alt="Wallet"
							width={20}
							height={20}
						/>
					</Button>
					<Menu {...bindMenu(popupState)}>
						<MenuItem onClick={popupState.close}>
							<img
								src="https://i.pinimg.com/736x/25/47/c7/2547c7ecb55605fbb39e04157f157021.jpg"
								alt="Wallet"
								width={50}
								height={50}
							/>
							&emsp; {myAddress}
						</MenuItem>
						<MenuItem onClick={popupState.close}>
							APT &emsp;&emsp; {myBalance / 100000000} APT
						</MenuItem>
						<MenuItem onClick={popupState.close}>
							<a
								href="/profile"
								style={{
									color: 'black',
								}}
							>
								Profile
							</a>
						</MenuItem>
						<MenuItem onClick={popupState.close}>My Collections</MenuItem>
						<MenuItem onClick={popupState.close}>Settings</MenuItem>
						<MenuItem onClick={popupState.close}>Logout</MenuItem>
					</Menu>
				</React.Fragment>
			)}
		</PopupState>
	);
};

export default ModalInfo;
