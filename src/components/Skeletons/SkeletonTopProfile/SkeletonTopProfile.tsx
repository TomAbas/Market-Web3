import { Skeleton, Box } from '@mui/material';
const SkeletonTopProfile = () => {
	return (
		<>
			<Box
				sx={{
					position: 'relative',
					img: {
						width: '100%',
						objectFit: 'cover',
						objectPosition: 'center',
						height: '300px',
					},
				}}
			>
				{' '}
				<Skeleton width="100%">
					<Box sx={{ height: '400px' }}>
						<img src="" alt="banner" />
					</Box>
				</Skeleton>
				<Box
					sx={{
						position: 'absolute',
						left: '50%',
						bottom: '0px',
						transform: 'translateX(-50%)',
						border: '2px solid #fff',
						borderRadius: '10px',
						img: {
							width: '100px',
							height: '100px',
							objectFit: 'cover',
							objectPosition: 'center',
							borderRadius: '10px',
						},
					}}
				>
					<Skeleton width="100%">
						<Box sx={{ width: '100px', height: '100px' }}>
							<img src="" alt="avatar" />
						</Box>
					</Skeleton>
				</Box>
			</Box>
		</>
	);
};

export default SkeletonTopProfile;
