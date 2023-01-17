/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import { Box, styled, Typography } from '@mui/material';

import { TransactionPayload } from '@martiandao/aptos-web3-bip44.js/dist/generated';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useAppDispatch } from '../../../redux/hooks';
import { openFirstModal } from '../../../redux/slices/modalWallet';
import { getWhiteListDropResource, getTicketDropResource } from '../../../utils/dataResource';

const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
const MARKET_COINT_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: 'rgba(157, 195, 230, 0.3)',
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

export default function WhiteList() {
	const [whitelist, setWhitelist] = useState([]);
	const [totalTicket, setTotalTicket] = useState(0);
	const [loading, setLoading] = useState('Claim Tickets');
	const { account, signAndSubmitTransaction } = useWallet();

	useEffect(() => {
		const fetchWhitelist = async () => {
			const whiteList = await getWhiteListDropResource();
			setWhitelist(whiteList);
		};
		fetchWhitelist();
	}, []);
	useEffect(() => {
		const fetchTicket = async () => {
			let arrTicket = await getTicketDropResource();
			arrTicket = arrTicket.filter(
				(item: any) => item.owner.toString() == account?.address?.toString()
			);

			setTotalTicket(arrTicket.length);
		};
		fetchTicket();
	}, [account]);
	const dispatch = useAppDispatch();

	const handleClaim = async () => {
		try {
			if (!account) {
				dispatch(openFirstModal());
				return;
			}
			setLoading('Updating...');
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::MetaspacecyTicket::claim_token`,
				type_arguments: [MARKET_COINT_TYPE || '0x1::aptos_coin::AptosCoin'],
				arguments: [
					'ticket-' + new Date().getTime(),
					'',
					'https://cdn3.vectorstock.com/i/1000x1000/09/42/yellow-ticket-vector-590942.jpg',
					'1',
					account?.address?.toString(),
					'0',
					'0',
				],
			};

			await signAndSubmitTransaction(payload, { gas_unit_price: 100 });
			setTotalTicket(totalTicket + 1);
			setLoading('Claim Tickets');
		} catch {
			setLoading('Claim Tickets');
		}
	};
	return (
		<>
			<Box>
				<Typography variant="h6">Ticket: 0</Typography>
			</Box>
			<TableContainer
				component={Paper}
				sx={{ marginTop: '8px', border: '1.5px solid #00A3FF', borderRadius: '12px' }}
			>
				<Table aria-label="customized table" sx={{}}>
					<TableBody>
						{whitelist.map((address) => (
							<StyledTableRow key={address}>
								<StyledTableCell component="th" scope="row">
									{address}
								</StyledTableCell>
								<StyledTableCell component="th" scope="row">
									<Box
										sx={{
											button: {
												padding: '10px 30px',
												border: '1.5px solid #e7e8ec',
												transition: 'all 0.4s',
												borderRadius: '12px',
												fontWeight: 400,
												background: '#fff',
												fontSize: '16px',
												cursor: 'pointer',
												fontFamily: 'Montserrat, sans-serif !important',
												fontStyle: 'italic !important',
												width: '180px',
												'&:hover': {
													background: '#007aff',
													borderColor: 'transparent',
													color: '#fff',
												},
											},
										}}
									>
										<button>Claim</button>
									</Box>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
