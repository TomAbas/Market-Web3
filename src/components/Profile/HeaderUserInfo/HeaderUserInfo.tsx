import { User } from 'models/user';
import React, { useState, useRef } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import aptos from '../../assets/images/card/aptos.jpg';
interface Props {
	infoUser: User;
}
const HeaderUserInfo: React.FC<Props> = ({ infoUser }) => {
	const bioRef: any = useRef();
	const [show, setShow] = useState(false);
	return (
		<Box sx={{ width: '100%', textAlign: 'center' }}>
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
					{infoUser?.userAddress.slice(0, 6) +
						'...' +
						infoUser?.userAddress.slice(
							infoUser.userAddress.length - 4,
							infoUser.userAddress.length
						)}
				</Box>
			</Stack>
			<Typography
				variant="body1"
				mt={2}
				ref={bioRef}
				sx={{
					transition: 'max-height 0.5s ease-in-out ',
					margin: '16px auto',
					padding: '0px 24px',
					width: '100%',
					whiteSpace: `${show ? 'unset' : 'nowrap'}`,
					textAlign: ` ${show ? 'center' : 'center'}`,
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					maxHeight: `${show ? '500px' : '49px'}`,
					height: `${show ? 'auto' : '49px'}`,
				}}
				onClick={() => {
					if (bioRef.current?.offsetHeight < 48) {
						return;
					}
					setShow(!show);
				}}
			>
				{infoUser?.bio}
			</Typography>
		</Box>
	);
};

export default HeaderUserInfo;
