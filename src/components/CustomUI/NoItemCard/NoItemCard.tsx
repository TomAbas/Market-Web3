// styled
import { CardContent, CardImage, CardText, NoItemCard, NoItemWrapper } from './styled';

export interface NoItemProps {
	title: string;
	image: string;
}

function NoItem({ title, image }: NoItemProps) {
	return (
		<NoItemWrapper className="b">
			<NoItemCard>
				{/* <Box
					sx={{
						position: 'absolute',
						height: 170,
						width: 170,
						borderRadius: '50%',
					}}
					animate={{ rotate: 360 }}
					transition={spinTransition}
				>
					<Point
						sx={{
							left: '50%',
							top: '-9px',
							transform: 'translateX(-50%)',
							backgroundColor: theme.palette.primary.light,
							width: '12px',
							height: '12px',
							margin: '3px',
						}}
					/>
					<Point
						sx={{
							left: '5%',
							bottom: '20%',
							backgroundColor: theme.palette.primary.light,
							width: '12px',
							height: '12px',
						}}
					/>
					<Point
						sx={{
							right: '5%',
							bottom: '20%',
							backgroundColor: theme.palette.primary.light,
							width: '12px',
							height: '12px',
						}}
					/>
				</Box> */}

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
