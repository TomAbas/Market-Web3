/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import CardNFTUser from 'components/Marketplace/CardNFTUser';
import React, { useState, useEffect } from 'react';
import { useTokens } from '../../hooks/useTokens';
import banner from '../../assets/banner.png';
import aptos from '../../assets/images/card/aptos.jpg';
import ClientAxios from 'customAxios/ClientAxios';
import { userInfo } from 'os';

const ProfileUser = () => {
	const [infoUser, setInfoUser] = useState<any>();
	const { account } = useWallet();
	// console.log(account);
	const { tokens, loading } = useTokens(account);
	const [items, setItems] = useState<any[]>([]);

	let myAddress = account?.address?.toString() || '';
	useEffect(() => {
		console.log('reset');
		setItems(tokens);
	}, [tokens]);
	const handleItems = (index: any) => {
		let newItems = items.filter((_item, i) => i !== index);
		setItems(newItems);
	};
	const getInfoUser = async () => {
		let { data } = (await ClientAxios.get(`/users/userAddress/${myAddress}`)).data;
		setInfoUser(data);
	};
	useEffect(() => {
		getInfoUser();
	}, [myAddress]);
	useEffect(() => {
		console.log(infoUser);
	}, [infoUser]);
	return (
		<>
			<Box pt={13}>
				<Box
					sx={{
						position: 'relative',
						img: {
							width: '100%',
							objectFit: 'cover',
							objectPosition: 'center',
							height: '300px',
						},
					}}
				>
					<img src={infoUser?.background} alt="banner" />
					<Box
						sx={{
							position: 'absolute',
							left: '50%',
							bottom: '-50px',
							transform: 'translateX(-50%)',
							border: '2px solid #fff',
							borderRadius: '10px',
							img: {
								width: '100px',
								height: '100px',
								objectFit: 'cover',
								objectPosition: 'center',
								borderRadius: '10px',
							},
						}}
					>
						<img src={infoUser?.avatar} alt="avatar" />
					</Box>
				</Box>
				<Box pt={8} sx={{ maxWidth: '1440px', mx: 'auto', textAlign: 'center' }}>
					<Box sx={{ width: '100%' }}>
						<Typography variant="h4" fontWeight="500">
							{infoUser?.username}
						</Typography>
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="center"
							gap={1}
							sx={{
								background: '#fff',
								padding: '8px 32px',
								width: 'fit-content',
								mx: 'auto',
								mt: 2,
								border: '1.5px solid #E7E8EC',
								borderRadius: '12px',
								img: {
									width: '24px',
								},
							}}
						>
							<img src={aptos} alt="aptos" />
							<Box>
								{myAddress.slice(0, 6) +
									'...' +
									myAddress.slice(myAddress.length - 4, myAddress.length)}
							</Box>
						</Stack>
					</Box>
					<Box py={4}>
						<Grid container maxWidth="1440px" mx="auto" spacing={1} px={2}>
							{items.map((item: any, index: any) => (
								<CardNFTUser
									item={item}
									handleItems={handleItems}
									index={index}
									key={index}
								/>
							))}
						</Grid>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default ProfileUser;
