import React from 'react';
import { Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
interface Props {
	item: { id: number; name: string; link: string };
}
const NavBar: React.FC<Props> = ({ item }) => {
	const navigate = useNavigate();
	return (
		<>
			{item.name === 'Drops' ? (
				<Tooltip title="coming soon">
					<Box>
						<Link
							sx={{
								textDecoration: 'none',
								color: '#131740',
								fontWeight: '500',
								transition: 'all 0.4s ',
								cursor: 'pointer',
							}}
						>
							{item.name}
						</Link>
					</Box>
				</Tooltip>
			) : (
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
			)}
		</>
	);
};

export default NavBar;
