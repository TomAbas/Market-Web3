/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Box, Link, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DropdownMenuLink } from 'components/Header/styled';
import { DropdownMenu } from './styled';
interface Props {
	item: { id: number; name: string; link: string };
	listCategoryMarketplace: Object[];
	listRanking: Object[];
}

const NavBarMobile: React.FC<Props> = ({ item, listCategoryMarketplace, listRanking }) => {
	const [active, setActive] = useState(false);
	const navigate = useNavigate();
	function handleOpen() {
		setActive(!active);
	}
	if (item.name === 'Explore') {
		return (
			<>
				<Box px={2} py={1}>
					<Box
						sx={{ display: 'flex', justifyContent: 'space-between', height: '19.5px' }}
					>
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
						<Box
							onClick={handleOpen}
							sx={{ cursor: 'pointer', transition: 'all 0.4s' }}
						>
							<KeyboardArrowDownIcon data-idx="1" sx={{ height: '19.5px' }} />
						</Box>
					</Box>
					<DropdownMenu
						className="dropdownMenu"
						sx={{
							...(active && {
								opacity: 1,
								display: 'block',
								visibility: 'visible',
							}),
						}}
					>
						<Stack>
							{listCategoryMarketplace.map((category: any, index: number) => (
								<DropdownMenuLink
									href={
										category.isFilter
											? category.link + '?category=' + category.id
											: category.link
									}
									key={index}
								>
									<Stack direction="row" alignItems="center">
										<Box width="30px">
											<img
												style={{
													width: '100%',
													height: '100%',
													boxShadow: '2px 2px 2px 0 rgba(0,0,0,0.2)',
													borderRadius: '50%',
												}}
												src={category.icon}
												alt={category.title}
											/>
										</Box>
										<Typography
											variant="body2"
											sx={{ padding: '0 0 0 8px' }}
											textAlign="center"
											noWrap
											fontStyle="italic"
										>
											{category.title}
										</Typography>
									</Stack>
								</DropdownMenuLink>
							))}
						</Stack>
					</DropdownMenu>
				</Box>
			</>
		);
	} else if (item.name === 'Stats') {
		return (
			<>
				<Box px={2} py={1}>
					<Box
						sx={{ display: 'flex', justifyContent: 'space-between', height: '19.5px' }}
					>
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
						<Box
							onClick={handleOpen}
							sx={{ cursor: 'pointer', transition: 'all 0.4s' }}
						>
							<KeyboardArrowDownIcon data-idx="1" sx={{ height: '19.5px' }} />
						</Box>
					</Box>
					<DropdownMenu
						className="dropdownMenu"
						sx={{
							...(active && {
								opacity: 1,
								display: 'block',
								visibility: 'visible',
							}),
						}}
					>
						<Stack>
							{listRanking.map((category: any, index: number) => (
								<DropdownMenuLink
									href={
										category.isFilter
											? category.link + '?category=' + category.id
											: category.link
									}
									key={index}
								>
									<Stack direction="row" alignItems="center">
										<Box width="30px">
											<img
												style={{
													width: '100%',
													height: '100%',
													boxShadow: '2px 2px 2px 0 rgba(0,0,0,0.2)',
													borderRadius: '50%',
												}}
												src={category.icon}
												alt={category.title}
											/>
										</Box>
										<Typography
											variant="body2"
											sx={{ padding: '0 0 0 8px' }}
											textAlign="center"
											noWrap
											fontStyle="italic"
										>
											{category.title}
										</Typography>
									</Stack>
								</DropdownMenuLink>
							))}
						</Stack>
					</DropdownMenu>
				</Box>
			</>
		);
	} else {
		return (
			<>
				{' '}
				<Box px={2} py={1}>
					<Box>
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
				</Box>
			</>
		);
	}
};

export default NavBarMobile;
