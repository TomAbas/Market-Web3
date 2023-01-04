import React from 'react';
import { Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
interface Props {
	item: { id: number; name: string; link: string };
}
const NavBar: React.FC<Props> = ({ item }) => {
	const navigate = useNavigate();
	return (
		<Box>
			<Link
				onClick={() => navigate(item.link)}
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
	);
};

export default NavBar;
