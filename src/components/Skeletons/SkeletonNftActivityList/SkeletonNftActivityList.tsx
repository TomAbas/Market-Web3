import { Box, Skeleton, Stack } from '@mui/material';
const SkeletonNftActivityList = () => {
	return (
		<>
			{' '}
			{new Array(5).fill(null).map((item, idx) => {
				return (
					<Box
						key={idx}
						sx={{
							paddingTop: '10px',
							paddingBottom: '10px',
							minWidth: '600px',
						}}
					>
						<Stack direction="row" justifyContent="space-between" alignItems="center">
							<Stack direction="row" alignItems="center" sx={{ width: '100%' }}>
								<Skeleton
									variant="rectangular"
									width={40}
									height={40}
									sx={{ borderRadius: '12px' }}
								/>

								<Box sx={{ ml: 2, flexGrow: 1 }}>
									<Skeleton variant="text" sx={{ maxWidth: '320px' }} />
									<Skeleton variant="text" sx={{ maxWidth: '250px' }} />
								</Box>
							</Stack>

							<Skeleton variant="rectangular" sx={{ width: '22px' }} />
						</Stack>
					</Box>
				);
			})}
		</>
	);
};

export default SkeletonNftActivityList;
