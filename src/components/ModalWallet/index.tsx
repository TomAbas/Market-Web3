/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useWallet, Wallet } from '@manahippo/aptos-wallet-adapter';
import { DropDownContent, LinkWrapper } from './WalletModalStyles';
import fewcha from '../../assets/wallet/fewcha.jpeg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
	sellectStepsModalWallet,
	openFirstModal,
	openSecondModal,
	openThirdModal,
	closeModal,
	closeFirstModal,
} from '../../redux/slices/modalWallet';

// declare let window: any;
const ModalWallet: React.FC = () => {
	const DECIMAL = 100000000;
	const dispatch = useAppDispatch();
	const { wallets, connect } = useWallet();
	const { account } = useWallet();
	async function connectWallet(wallet: Wallet) {
		connect(wallet.adapter.name);
		dispatch(closeModal());
	}
	let myAddress = account?.address?.toString();

	const renderListWallet = () => {
		return wallets.map((wallet: any, index: any) => {
			return (
				<>
					<Box
						my={1}
						key={index}
						sx={{ cursor: 'pointer', userSelect: 'none' }}
						onClick={() => connectWallet(wallet)}
					>
						<Stack direction="row" justifyContent="space-between" alignItems="center">
							<Stack direction="row" gap={2} alignItems="center">
								{wallet.adapter.name === 'Fewcha' ? (
									<img width={48} height={48} src={fewcha} />
								) : (
									<img width={48} height={48} src={wallet.adapter.icon} />
								)}
								<Typography fontStyle="italic">{wallet.adapter.name}</Typography>
							</Stack>
						</Stack>
					</Box>
				</>
			);
		});
	};

	return (
		<>
			{!myAddress && (
				<DropDownContent>
					<Box>
						<Stack>{renderListWallet()}</Stack>
					</Box>
				</DropDownContent>
			)}
		</>
	);
};

export default ModalWallet;
