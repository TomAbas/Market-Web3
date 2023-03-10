import { Container, Box, Typography, Stack } from '@mui/material';
import ModalChart from '../chartCard';
import { useParams } from 'react-router-dom';
import { getEventById } from 'api/eventApi';
import { useEffect, useState } from 'react';

const Predict = () => {
	const { eventId } = useParams();
	const [event, setEvent] = useState<any>(null);
	useEffect(() => {
		if (eventId) {
			getEventById(eventId).then((data) => {
				setEvent(data);
				console.log(data);
			});
		}
	}, [eventId]);
	return (
		<Container
			sx={{
				background: 'linear-gradient(180deg, #E0F4FF 0%, #FFFFFF 100%)',
				minHeight: '100vh',
				paddingTop: 20,
			}}
		>
			<Box sx={{}}>
				<Stack direction={'column'}>
					<Stack direction={'row'} spacing={2}>
						<img src={event?.image} alt="" style={{ width: 100 }} />
						<Stack direction={'column'}>
							<Stack
								sx={{
									backgroundColor: 'rgba(255, 201, 63, 0.3)',
									height: '30px',
									width: 110,
									textAlign: 'center',
									p: '5px',
								}}
							>
								Politics
							</Stack>
						</Stack>
						<Stack direction={'row'}>
							<Stack
								sx={{
									width: 110,
									textAlign: 'center',
									p: 1,
								}}
							>
								$ 2 000.00 Vol
							</Stack>
							<Stack
								sx={{
									width: 110,
									textAlign: 'center',
									p: 1,
								}}
							>
								$ 52 000.00 Liq
							</Stack>
							<Stack
								sx={{
									width: 110,
									textAlign: 'center',
									p: 1,
								}}
							>
								Expires 20/02/2023
							</Stack>
						</Stack>
					</Stack>
					<Stack
						sx={{
							marginTop: '-25px',
							marginLeft: '115px',
							fontWeight: 700,
							fontSize: '26px',
						}}
					>
						Will Trump be president of USA at 30-03
					</Stack>
				</Stack>
			</Box>
			<hr />
			{/* <Typography>
				Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
				euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
				minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
				aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in
				vulputate velit esse molestie consequat, vel illum dolore eu feugiat{' '}
			</Typography> */}
			<Typography sx={{ fontWeight: 700 }}>Show More</Typography>

			{event && <ModalChart event={event} />}
		</Container>
	);
};
export default Predict;
