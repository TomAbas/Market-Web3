import { Box } from '@mui/material';
import { CardContent, CardImage, CardText, NoItemCard, NoItemWrapper, Point } from './styled';
import NoData from 'assets/icons/Nodata.svg';

export interface NoItemProps {
	title: string;
	image?: string;
}
function NoItem({ title, image = NoData }: NoItemProps) {
	return (
		<NoItemWrapper className="b">
			<NoItemCard>
				<Box
					sx={{
						position: 'absolute',
						height: 170,
						width: 170,
						borderRadius: '50%',
						animation: 'spin 10s linear infinite',
					}}
				>
					<Point
						sx={{
							left: '50%',
							top: '-9px',
							transform: 'translateX(-50%)',
							backgroundColor: '#007aff',
							width: '12px',
							height: '12px',
							margin: '3px',
						}}
					/>
					<Point
						sx={{
							left: '5%',
							bottom: '20%',
							backgroundColor: '#007aff',
							width: '12px',
							height: '12px',
						}}
					/>
					<Point
						sx={{
							right: '5%',
							bottom: '20%',
							backgroundColor: '#007aff',
							width: '12px',
							height: '12px',
						}}
					/>
				</Box>

				<CardContent className="a">
					<CardImage>
						<img src={image} alt="no item" />
					</CardImage>
					<CardText variant="body2">{title}</CardText>
				</CardContent>
			</NoItemCard>
		</NoItemWrapper>
	);
}

export default NoItem;
