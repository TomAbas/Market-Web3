import { Link, Stack } from '@mui/material';
import React from 'react';

export default function FilterCollection() {
	const listFilter = [
		{
			id: 1,
			name: 'All',
			link: '',
		},
		{
			id: 2,
			name: 'Art',
			link: '',
		},
		{
			id: 3,
			name: 'Collectible',
			link: '',
		},
		{
			id: 4,
			name: 'Music',
			link: '',
		},
		{
			id: 5,
			name: 'Sport',
			link: '',
		},
	];
	return (
		<>
			<Stack direction="row" mb={3} gap="10px">
				{listFilter.map((item) => {
					return (
						<Link
							key={item.id}
							href={item.link}
							sx={{
								button: {
									padding: '10px 30px',
									border: '1.5px solid #e7e8ec',
									transition: 'all 0.4s',
									borderRadius: '12px',
									fontWeight: 400,
									background: '#fff',
									fontSize: '16px',
									cursor: 'pointer',
									fontFamily: 'Montserrat, sans-serif !important',
									fontStyle: 'italic !important',
									width: 'fit-content',
									'&:hover': {
										background: '#007aff',
										borderColor: 'transparent',
										color: '#fff',
									},
									a: {
										textDecoration: 'none',
										'&:hover': {
											textDecoration: 'none',
											color: '#fff',
										},
									},
								},
							}}
						>
							<button>{item.name}</button>
						</Link>
					);
				})}
			</Stack>
		</>
	);
}
