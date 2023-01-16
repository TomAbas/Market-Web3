/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, Stack } from '@mui/material';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { listCategory } from 'constants/category.constant';
export default function FilterCollection() {
	let [searchParams, setSearchParams] = useSearchParams();
	const category = searchParams.get('category');
	console.log(category);
	const listFilter = [
		{
			id: null,
			name: 'All',
			link: '#/view-all/collections/',
		},
		{ id: '1', name: 'Art', link: '#/view-all/collections/?category=1' },
		{ id: '2', name: 'Music', link: '#/view-all/collections/?category=2' },
		{ id: '3', name: 'Photography', link: '#/view-all/collections/?category=3' },
		{ id: '4', name: 'Games', link: '#/view-all/collections/?category=4' },
		{ id: '5', name: 'Sport', link: '#/view-all/collections/?category=5' },
		{ id: '6', name: 'Metaverse', link: '#/view-all/collections/?category=6' },
		{ id: '7', name: 'Box', link: '#/view-all/collections/?category=7' },
		{ id: '8', name: 'Trading Card', link: '#/view-all/collections/?category=8' },
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
									background: category! === item.id ? '#007aff' : '#fff',
									color: category! === item.id ? '#fff' : 'black',
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
