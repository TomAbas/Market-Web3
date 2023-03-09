import { Box } from '@mui/material';
import { Grid, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { tokenPaymentSymbol } from 'constants/sellItem';
import { changePriceToToken, formatTimeHistory } from 'utils/function';
import ModalChart from '../chart';
// import LinearProgress from '@mui/material/LinearProgress';
interface Props {
	data: {
		_id: string;
		value: string;
		category: string;
		question: string;
		endTime: string;
		image: string;
		description: string;
		options: Array<any>;
		coinType: string;
	};
}
const Product = ({ data }: Props) => {
	const navigate = useNavigate();
	return (
		<Grid xs={12} lg={6} xl={4}>
			<Box
				sx={{
					background: ' #FFFFFF',
					m: 1,
					p: 2,
					border: '1.5px solid #e7e8ec',
					borderRadius: 2,
					'&:hover': {
						boxShadow: '0px 0px 10px gray',
					},
					cursor: 'pointer',
					marginTop: 5,
				}}
				onClick={() => {
					navigate(`/predict-detail/${data._id}`);
				}}
			>
				{' '}
				<Typography
					sx={{
						background:
							data.value === 'Crypto'
								? 'rgba(255, 201, 63, 0.3)'
								: data.value === 'Sport'
								? 'rgba(5, 255, 0, 0.3)'
								: data.value === 'Science & Technology'
								? 'rgba(129, 192, 255, 0.3)'
								: data.value === 'Politics'
								? 'rgba(74, 255, 201, 0.3)'
								: data.value === 'Esport'
								? 'rgba(230, 157, 157, 0.3)'
								: 'rgba(114, 195, 200, 0.3)',
						width: data.value === 'Science & Technology' ? '80%' : 110,
						textAlign: 'center',
						p: 1,
						color:
							data.value === 'Crypto'
								? '#FF9900'
								: data.value === 'Sport'
								? '#029900'
								: data.value === 'Science & Technology'
								? '#0085FF'
								: data.value === 'Politics'
								? '#006D4D'
								: data.value === 'Esport'
								? '#FF2C2C'
								: data.value === 'Science & Technology'
								? '#0085FF'
								: data.value === 'Esport'
								? '#FF2C2C'
								: '#00B4C0',
						borderRadius: 4.38,
					}}
				>
					{data.category}
				</Typography>
				<Typography variant="body1" sx={{ minHeight: 50 }} fontWeight={700}>
					{data.description}
				</Typography>
				<Stack direction={'row'}>
					<Box sx={{ width: '40%' }}>
						<img
							src={data.image}
							style={{
								height: 180,
								width: '100%',
								padding: '8px 0px',
								borderRadius: 18,
							}}
							alt={''}
						/>
						<Typography style={{ fontSize: 10 }}>
							{formatTimeHistory(new Date(Number(data.endTime)))}
						</Typography>
					</Box>
					<Box sx={{ width: '60%', position: 'relative' }}>
						<ModalChart options={data.options}></ModalChart>
						<Typography align={'right'} sx={{ marginLeft: '32px', fontWeight: 700 }}>
							Total Pool:{' '}
							{changePriceToToken(
								data.options.reduce((a, b) => Number(a) + Number(b.value), 0),
								data.coinType
							)}{' '}
							{tokenPaymentSymbol[data.coinType?.split('::').slice(-1)[0]]}{' '}
						</Typography>
						<Box
							sx={{
								position: 'absolute',
								width: '75%',
								border: '1px solid gainsboro',
								borderRadius: 2,
								textAlign: 'center',
								padding: 1,
								bottom: 0,
								marginLeft: '73px',
							}}
						>
							Predict
						</Box>
					</Box>
				</Stack>
				<Stack direction={'row'}></Stack>
			</Box>
		</Grid>
	);
};

export default Product;
