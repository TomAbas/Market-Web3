/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { TransactionPayload } from '@martiandao/aptos-web3-bip44.js/dist/generated';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useAppDispatch } from '../../redux/hooks';
import { openFirstModal } from '../../redux/slices/modalWallet';
import { getWhiteListDropResource, getTicketDropResource } from '../../utils/dataResource';
import WhiteList from './WhiteList';

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
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
const MARKET_COINT_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE;

export default function Drop() {
	const [whitelist, setWhitelist] = useState([]);
	const [totalTicket, setTotalTicket] = useState(0);
	const [loading, setLoading] = useState('Claim Tickets');
	const { account, signAndSubmitTransaction } = useWallet();
	const [value, setValue] = React.useState('1');
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
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	return (
		// <div style={{ width: 800, marginTop: '150px', marginLeft: 'auto', marginRight: 'auto' }}>
		// 	<Button variant="contained" sx={{ marginTop: '20px' }} onClick={handleClaim}>
		// 		{loading}
		// 	</Button>
		// 	<p style={{ marginTop: '20px' }}>Ticket : {totalTicket}</p>
		// 	<TableContainer component={Paper} sx={{ marginTop: '20px' }}>
		// 		<Table aria-label="customized table">
		// 			<TableHead>
		// 				<TableRow>
		// 					<StyledTableCell>WHITELIST</StyledTableCell>
		// 				</TableRow>
		// 			</TableHead>
		// 			<TableBody>
		// 				{whitelist.map((address) => (
		// 					<StyledTableRow key={address}>
		// 						<StyledTableCell component="th" scope="row">
		// 							{address}
		// 						</StyledTableCell>
		// 					</StyledTableRow>
		// 				))}
		// 			</TableBody>
		// 		</Table>
		// 	</TableContainer>
		// </div>
		<Box sx={{ maxWidth: '940px', mx: 'auto', paddingTop: '150px' }}>
			<TabContext value={value}>
				<Box
					sx={{
						borderBottom: 1,
						borderColor: 'divider',
						button: {
							fontSize: '20px',
							textTransform: 'none',
							color: '#131740',
							fontFamily: 'Montserrat, sans-serif',
							fontWeight: '600',
							fontStyle: 'italic',
						},
					}}
				>
					<TabList centered onChange={handleChange} aria-label="lab API tabs example">
						<Tab label="Upcoming" value="1" />
						<Tab label="Active" value="2" />
						<Tab label="Whitelist" value="3" />
					</TabList>
				</Box>
				<TabPanel value="2">{/* <LayoutMintNFT /> */}</TabPanel>
				<TabPanel value="1">{/* <LayoutCreateCollection /> */}</TabPanel>
				<TabPanel value="3">
					<WhiteList />
				</TabPanel>
			</TabContext>
		</Box>
	);
}
