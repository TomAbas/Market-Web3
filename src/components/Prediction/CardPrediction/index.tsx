import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import CardPredict from '../Card';
import { Typography, Stack, Container, Grid } from '@mui/material';
import { getAllEvent } from 'api/eventApi';
import { useAppSelector } from 'redux/hooks';
import { selectUser } from 'redux/slices/userInfo';
const Index = () => {
	const navigate = useNavigate();
	const REACT_APP_APTOS_ADMIN = process.env.REACT_APP_APTOS_NODE_URL;
	const [listEvent, setListEvent] = useState([]);
	const [dislayEvent, setDisplayEvent] = useState<any>([]);
	const userInfo = useAppSelector(selectUser);
	function filterEventByCategory(category: string) {
		if (category === 'All') {
			setDisplayEvent(listEvent);
		} else {
			const filterEvent = listEvent.filter((item: any) => {
				return item.category === category;
			});
			setDisplayEvent(filterEvent);
		}
	}
	useEffect(() => {
		getAllEvent().then((data) => {
			setListEvent(data);
			setDisplayEvent([...data]);
		});
	}, []);
	const listCategory = [
		{
			name: 'All',
			value: 0,
		},
		{
			name: 'Crypto',
			value: 1,
		},
		{
			name: 'Sports',
			value: 2,
		},
		{
			name: 'Economics',
			value: 3,
		},
		{
			name: 'Esport',
			value: 4,
		},
		{
			name: 'Polictics',
			value: 5,
		},
	];
	return (
		<Container
			maxWidth={'xl'}
			sx={{
				background: 'linear-gradient(180deg, #E0F4FF 0%, #FFFFFF 100%)',
				minHeight: '100vh',
				paddingTop: 20,
			}}
		>
			<Typography align="center" sx={{ color: '#131740', fontSize: '5rem' }}>
				Prediction
			</Typography>
			<Stack direction="row" justifyContent="space-between">
				<Stack
					direction="row"
					justifyContent="left"
					spacing={'50px'}
					sx={{ mx: 'auto', marginLeft: 1 }}
				>
					{listCategory.map((item, index) => {
						return (
							<Stack
								direction={'row'}
								sx={{
									width: 'fit content',
									background: '#FFFFFF',
									textAlign: 'center',
									border: '1.5px solid #e7e8ec',
									padding: '10px 30px',
									borderRadius: 3,
									cursor: 'pointer',
									'&:hover': {
										color: '#FFFFFF',
										background: '#1976d2',
									},
								}}
								onClick={() => {
									filterEventByCategory(item.name);
								}}
								key={index}
							>
								{item.name}
							</Stack>
						);
					})}
				</Stack>
				{userInfo?.userAddress === REACT_APP_APTOS_ADMIN && (
					<Stack
						gap={'8px'}
						direction={'row'}
						alignItems={'center'}
						sx={{
							width: 'fit content',
							background: '#FFFFFF',
							textAlign: 'center',
							border: '1.5px solid #e7e8ec',
							padding: '10px 30px',
							borderRadius: 3,
							cursor: 'pointer',
							'&:hover': {
								color: '#FFFFFF',
								background: '#1976d2',
							},
							marginRight: 1,
						}}
						onClick={() => {
							navigate('/createPrediction');
						}}
					>
						Create
						<AddIcon></AddIcon>
					</Stack>
				)}
			</Stack>
			<hr style={{ width: '98.5%', border: '1.5px solid #e7e8ec' }} />
			<Grid container>
				{dislayEvent.map((item: any, index: number) => {
					return <CardPredict data={item} key={index} />;
				})}
			</Grid>
		</Container>
	);
};
export default Index;
