import { Box, Typography, Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
interface Props {
	open: boolean;
	handleClose: any;
	handleListItem: any;
	setPrice: React.Dispatch<React.SetStateAction<string>>;
	price: string;
	supply: string;
	handleValidateAmount: any;
	statusList: string;
	userAmountOfItem: string;
}
const ModelSell: React.FC<Props> = ({
	open,
	handleClose,
	handleListItem,
	setPrice,
	price,
	supply,
	handleValidateAmount,
	statusList,
	userAmountOfItem,
}) => {
	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				sx={{
					'.MuiDialog-container': {
						width: '440px',
						mx: 'auto',
						'.MuiDialog-paper': {
							width: '100%',
							borderRadius: '10px',
						},
					},
				}}
			>
				<DialogTitle sx={{ textAlign: 'center' }}>Sell Item</DialogTitle>
				<Box px={3} py={2}>
					<Typography variant="body1" fontWeight={500} mb={1}>
						Supply
					</Typography>
					<Box
						sx={{
							border: '1.5px solid #e7e8ec',
							borderRadius: '10px',
							input: {
								borderRadius: '10px',
								border: '0px solid white',
								padding: '10px 24px',
								outline: 'none',
								fontSize: '18px',
								fontStyle: 'italic',
								width: '100%',
							},
						}}
					>
						<input
							min={0}
							type="number"
							value={supply}
							onChange={(e) => {
								handleValidateAmount(e, userAmountOfItem);
							}}
							id="name"
							placeholder="0"
						/>
					</Box>
				</Box>
				<Box px={3} py={2}>
					<Typography variant="body1" fontWeight={500} mb={1}>
						Price
					</Typography>
					<Box
						sx={{
							border: '1.5px solid #e7e8ec',
							borderRadius: '10px',
							display: 'flex',
							alignItems: 'center',
							input: {
								border: '0px solid white',
								padding: '10px 24px',
								outline: 'none',
								borderRadius: '10px',
								fontSize: '18px',
								fontStyle: 'italic',
								width: '100%',
								borderRight: '1.5px solid #e7e8ec',
								borderBottomRightRadius: '0px 0px',
								borderTopRightRadius: '0px 0px',
							},
						}}
					>
						<input
							type="number"
							min={0}
							onChange={(e) => {
								if (Number(e.target.value) < 0) {
									let a = -Number(e.target.value);
									setPrice(a.toString());
								} else {
									setPrice(e.target.value);
								}
							}}
							value={price}
							id="price"
							placeholder="0"
						/>
						<Box mx={2}>APT</Box>
					</Box>
				</Box>

				<Stack direction="row" pt={3} pb={4} justifyContent="center" gap="10px">
					<Box
						onClick={handleClose}
						sx={{
							button: {
								padding: '8px 30px',
								border: '1.5px solid #e7e8ec',
								transition: 'all 0.4s',
								borderRadius: '12px',
								fontWeight: 500,
								background: '#fff',
								fontSize: '16px',
								cursor: 'pointer',
								fontFamily: 'Montserrat, sans-serif !important',
								fontStyle: 'italic !important',
								'&:hover': {
									background: '#007aff',
									borderColor: 'transparent',
									color: '#fff',
								},
							},
						}}
					>
						<button>Cancel</button>
					</Box>
					<Box
						onClick={handleListItem}
						sx={{
							button: {
								padding: '8px 30px',
								border: '1.5px solid #e7e8ec',
								transition: 'all 0.4s',
								borderRadius: '12px',
								fontWeight: 500,
								background: '#fff',
								fontSize: '16px',
								cursor: 'pointer',
								fontFamily: 'Montserrat, sans-serif !important',
								fontStyle: 'italic !important',
								'&:hover': {
									background: '#007aff',
									borderColor: 'transparent',
									color: '#fff',
								},
							},
						}}
					>
						<button>{statusList}</button>
					</Box>
				</Stack>
			</Dialog>
		</>
	);
};

export default ModelSell;
