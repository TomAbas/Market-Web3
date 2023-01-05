import React from 'react';
import { Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
interface Props {
	item: { id: number; name: string; link: string };
}
const NavBarMobile: React.FC<Props> = ({ item }) => {
	const navigate = useNavigate();
	return (
		<>
			{' '}
			<Box px={4} py={2}>
				<Link
					onClick={() => navigate(item.link)}
					href={item.link}
					sx={{
						textDecoration: 'none',
						color: '#131740',
						fontWeight: '500',
						transition: 'all 0.4s ',
						cursor: 'pointer',
						'&:hover': {
							color: '#007aff',
						},
					}}
				>
					{item.name}
				</Link>
			</Box>
		</>
	);
};

export default NavBarMobile;
