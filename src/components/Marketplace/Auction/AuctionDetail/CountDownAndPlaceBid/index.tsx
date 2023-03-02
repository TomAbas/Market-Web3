/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Box,
	Checkbox,
	CircularProgress,
	Grid,
	Link,
	Stack,
	Step,
	StepContent,
	StepLabel,
	Stepper,
	Typography,
	useTheme,
} from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
// image
import {
	BottomLine,
	BoxContainCountDown,
	ErrorMessage,
	GridBoxBackGround,
	NoticeMessage,
} from './sytled';
import CountDown from 'customComponents/CountDown';
//styled
import Modal from 'customComponents/Modal';
import FieldInput from 'components/CustomField/FieldInput';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import ButtonWhite from 'customComponents/ButtonWhite/ButtonWhite';
import { useAppSelector } from 'redux/hooks';
import useAuctionModules from 'utils/auction';

import { selectUser } from 'redux/slices/userInfo';
import { orderSell } from 'models/transaction';
import { userInfo } from 'os';

export interface StepStatus {
	isChecking: boolean;
	isExecuting: boolean;
	isCompleted: boolean;
}

const initialStepStatus: StepStatus = {
	isChecking: false,
	isExecuting: false,
	isCompleted: false,
};

export interface IFormModalPlaceBid {
	amount: number;
}
interface Props {
	auctionDetail: orderSell;
	bidderInfo: any;
}

export default function CountDownAndPlaceBid({ auctionDetail, bidderInfo }: Props) {
	const [isCheckingBalance, setIsCheckingBalance] = useState<boolean>(false);
	const [modalOrderExpired, setModalOrderExpired] = useState<boolean>(false);
	const [modal, setModal] = useState(false);
	const [step1, setStep1] = useState<StepStatus>(initialStepStatus);
	const [step2, setStep2] = useState<StepStatus>(initialStepStatus);
	const [activeStep, setActiveStep] = useState<number>(0);
	const [disableButton, setDisableButton] = useState<boolean>(true);
	const [bidValue, setBidValue] = useState<number>();
	const [decimalTokenPayment, setDecimalTokenPayment] = useState<number>();
	const [disableInputBid, setDisableInputBid] = useState<boolean>(false);
	const [checked, setChecked] = useState<boolean>(true);
	const [disableButtonPlaceBid, setDisableButtonPlaceBid] = useState<boolean>(false);
	const [openStep, setOpenStep] = useState<boolean>(false);
	const [nativeToken, setNativeToken] = useState(false);
	const [didUserBid, setDidUserBid] = useState(false);
	//
	const userAddress = useAppSelector(selectUser);
	const [startValue, setStartValue] = useState<number>(0);
	const [nextLowestBid, setNextLowestBid] = useState(0);
	const {
		bidAuction,
		setPriceBid,
		increaseBid,
		cancelBid,
		withdrawCoinFromAuction,
		finalizeAuction,
	} = useAuctionModules(auctionDetail?.itemInfo, auctionDetail);
	// Waiting
	const [claimExecuting, setClaimExecuting] = useState<boolean>(false);
	function checkDidUserBid() {
		const { bids } = bidderInfo;
		const { data } = bids;

		let result = data.find((item: any) => {
			return item.value.bidder === userAddress?.userAddress;
		});
		if (result) {
			return true;
		} else {
			return false;
		}
	}

	async function checkCanClaim() {
		try {
			let listBid = await getEventsByCreationNumber(
				userAddress?.userAddress!,
				auctionDetail.coinType,
				'2'
			).then((res) => res.map((item: any) => item.data.bid_id.listing_id));
			console.log(listBid);
			let isBid = listBid.find((listid: any) => {
				return (
					listid.creation_num == auctionDetail.creationNumber &&
					listid.addr == auctionDetail.maker
				);
			});
			if (isBid) {
				setCheckIsClaim(true);
			}
		} catch (err) {
			setCheckIsClaim(false);
		}
	}

	useEffect(() => {
		if (bidderInfo && userAddress) {
			setDidUserBid(checkDidUserBid());
			checkCanClaim();
		}
	}, [bidderInfo, userAddress]);

	// REACT HOOK FORM
	const schema = yup
		.object({
			amount: yup
				.number()
				.integer()
				.min(1)
				.transform((cv, ov) => {
					// handle case not enter a number throw error: NaN cast from ""
					return ov === '' ? undefined : cv;
				}),
		})
		.required();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<IFormModalPlaceBid>({
		resolver: yupResolver(schema),
	});
	//

	const onSubmit = () => {
		setDisableInputBid(true);
		setOpenStep(true);
	};

	const renderCountdown = () => {
		if (auctionDetail) {
			return (
				<Typography variant="body1" sx={{ fontWeight: '600' }}>
					<CountDown
						timeEnd={Number(auctionDetail.expirationTime)}
						timeStart={Number(auctionDetail.startTime)}
						className="CountDownBar"
						executeZero={() => {
							setDisableButtonPlaceBid(true);
						}}
						executeOne={() => {
							setDisableButtonPlaceBid(false);
						}}
					/>
				</Typography>
			);
		} else {
			<Typography variant="body1" sx={{ fontWeight: '600' }}>
				0
			</Typography>;
		}
	};

	const renderBlockchain = () => {
		if (auctionDetail) {
			return <Typography>{'NETWORKINFO[auctionDetail.chainId].name'}</Typography>;
		} else {
			<Typography></Typography>;
		}
	};

	// Handle Step 1 approve token
	const handleStep1 = async (isCheck: boolean) => {
		if (!userAddress || !auctionDetail || !bidValue || !decimalTokenPayment) {
			setDisableInputBid(false);

			return;
		}

		// setLoading state
		setStep1({ ...step1, isExecuting: true });

		try {
			// setLoading state
			setStep1({ ...step1, isExecuting: false });

			// set completed state

			setStep1({ ...step1, isCompleted: true });
		} catch (error) {
			setStep1({ ...step1, isCompleted: false });
			console.log('error approve token', error);
		}
	};

	// Handle step 2
	const handleStep2 = async () => {
		if (!userAddress || !auctionDetail || !bidValue || !decimalTokenPayment) {
			return;
		}

		// setLoading state
		setStep2({ ...step2, isExecuting: true });

		let txhMakeBid;
		try {
			// setLoading state
			setStep2({ ...step2, isExecuting: false });
			// set completed state
			setStep2({ ...step2, isCompleted: true });
		} catch (error) {
			setStep2({ ...step2, isCompleted: false });
			console.log('error approve token', error);
		}
	};
	//
	const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};
	// Handle claim Bid
	const handleClaimBid = async () => {
		if (auctionDetail) {
			// const AuctionContract = getWeb3Contract(
			// 	NftAuction.abi,
			// 	auctionDetail.infoINO.addressINO
			// );
			setClaimExecuting(true);
			try {
				setClaimExecuting(false);
			} catch (error) {
				console.log('some error when claim reward', error);
				setClaimExecuting(false);
			}
		}
	};
	const handleTakeHighestBid = async () => {
		if (auctionDetail) {
			try {
			} catch (error) {
				console.log(error);
			}
		}
	};

	// Starting Auction

	const handleRenderButtonBid = () => {
		if (auctionDetail) {
			if (userAddress?.userAddress === auctionDetail.maker) {
				if (Number(auctionDetail.startTime) > new Date().getTime()) {
					return (
						<ButtonWhite
							sx={{
								fontWeight: '600',
								width: 'fit-content',
								mx: 'auto',
							}}
						>
							<Stack direction="row" alignItems="center">
								<Typography variant="body1" sx={{ fontWeight: '600' }}>
									Cancel
								</Typography>
							</Stack>
						</ButtonWhite>
					);
				} else if (Number(auctionDetail.expirationTime) < new Date().getTime()) {
					return (
						<ButtonWhite
							sx={{
								fontWeight: '600',
								width: 'fit-content',
								mx: 'auto',
							}}
							onClick={() => {
								finalizeAuction();
							}}
						>
							<Stack direction="row" alignItems="center">
								<Typography variant="body1" sx={{ fontWeight: '600' }}>
									Finalize
								</Typography>
							</Stack>
						</ButtonWhite>
					);
				}
			} else {
				if (
					Number(auctionDetail.startTime) < new Date().getTime() &&
					Number(auctionDetail.expirationTime) > new Date().getTime()
				) {
					if (didUserBid) {
						return (
							<Stack direction={'row'} gap="50">
								<ButtonWhite
									onClick={() => {
										setModal(true);
									}}
									sx={{
										fontWeight: '600',
										width: 'fit-content',
										mx: 'auto',
									}}
								>
									<Stack direction="row" alignItems="center">
										<Typography variant="body1" sx={{ fontWeight: '600' }}>
											Place Bid
										</Typography>
									</Stack>
								</ButtonWhite>
								<ButtonWhite
									onClick={() => {
										// setModal(true);
										cancelBid();
									}}
									sx={{
										fontWeight: '600',
										width: 'fit-content',
										mx: 'auto',
									}}
								>
									<Stack direction="row" alignItems="center">
										<Typography variant="body1" sx={{ fontWeight: '600' }}>
											Cancel bid
										</Typography>
									</Stack>
								</ButtonWhite>
							</Stack>
						);
					} else {
						return (
							<ButtonWhite
								onClick={() => {
									setModal(true);
								}}
								sx={{
									fontWeight: '600',
									width: 'fit-content',
									mx: 'auto',
								}}
							>
								<Stack direction="row" alignItems="center">
									<Typography variant="body1" sx={{ fontWeight: '600' }}>
										Place Bid
									</Typography>
								</Stack>
							</ButtonWhite>
						);
					}
				} else if (Number(auctionDetail.expirationTime) < new Date().getTime()) {
					return (
						<ButtonWhite
							disabled={true}
							onClick={() => {
								withdrawCoinFromAuction();
							}}
							sx={{
								fontWeight: '600',
								width: 'fit-content',
								mx: 'auto',
							}}
						>
							<Stack direction="row" alignItems="center">
								<Typography variant="body1" sx={{ fontWeight: '600' }}>
									Claim
								</Typography>
							</Stack>
						</ButtonWhite>
					);
				}
			}
		}
		if (auctionDetail) {
			if (
				Number(auctionDetail.startTime) < new Date().getTime() &&
				Number(auctionDetail.expirationTime) > new Date().getTime() &&
				userAddress?.userAddress !== auctionDetail.maker
			) {
				if (didUserBid) {
					return (
						<Stack direction={'row'} gap="50">
							<ButtonWhite
								disabled={
									userAddress?.userAddress === auctionDetail?.maker ||
									!userAddress?.userAddress ||
									disableButtonPlaceBid
								}
								onClick={() => {
									setModal(true);
								}}
								sx={{
									fontWeight: '600',
									width: 'fit-content',
									mx: 'auto',
								}}
							>
								<Stack direction="row" alignItems="center">
									<Typography variant="body1" sx={{ fontWeight: '600' }}>
										Place Bid
									</Typography>
								</Stack>
							</ButtonWhite>
							<ButtonWhite
								disabled={
									userAddress?.userAddress === auctionDetail?.maker ||
									!userAddress?.userAddress ||
									disableButtonPlaceBid
								}
								onClick={() => {
									// setModal(true);
									cancelBid();
								}}
								sx={{
									fontWeight: '600',
									width: 'fit-content',
									mx: 'auto',
								}}
							>
								<Stack direction="row" alignItems="center">
									<Typography variant="body1" sx={{ fontWeight: '600' }}>
										Cancel bid
									</Typography>
								</Stack>
							</ButtonWhite>
						</Stack>
					);
				} else {
					return (
						<ButtonWhite
							disabled={
								userAddress?.userAddress === auctionDetail?.maker ||
								!userAddress?.userAddress ||
								disableButtonPlaceBid
							}
							onClick={() => {
								setModal(true);
							}}
							sx={{
								fontWeight: '600',
								width: 'fit-content',
								mx: 'auto',
							}}
						>
							<Stack direction="row" alignItems="center">
								<Typography variant="body1" sx={{ fontWeight: '600' }}>
									Place Bid
								</Typography>
							</Stack>
						</ButtonWhite>
					);
				}
			}
			// if (
			// 	userAddress?.userAddress === auctionDetail.maker &&
			// 	new Date(auctionDetail.expirationTime).getTime() < new Date().getTime() &&
			// 	new Date(auctionDetail.startTime).getTime() > new Date().getTime() &&
			// ) {
			// 	return (
			// 		<ButtonWhite
			// 			disabled={
			// 				userAddress.userAddress !== auctionDetail.maker || !userAddress || claimExecuting
			// 			}
			// 			onClick={() => {
			// 				handleTakeHighestBid();
			// 			}}
			// 			sx={{
			// 				fontWeight: '600',
			// 				width: 'fit-content',
			// 				mx: 'auto',
			// 			}}
			// 		>
			// 			<Stack direction="row" alignItems="center">
			// 				{claimExecuting && (
			// 					<CircularProgress sx={{ color: 'white', mr: 1 }} size={16} />
			// 				)}
			// 				<Typography variant="body1" sx={{ fontWeight: '600' }}>
			// 					TAKE HIGHEST BID
			// 				</Typography>
			// 			</Stack>
			// 		</ButtonWhite>
			// 	);
			// }

			if (
				userAddress?.userAddress === auctionDetail.maker &&
				Number(auctionDetail.expirationTime) < new Date().getTime()
			) {
				return (
					<ButtonWhite
						disabled={!userAddress || claimExecuting}
						onClick={() => {
							finalizeAuction();
						}}
						sx={{
							fontWeight: '600',
							width: 'fit-content',
							mx: 'auto',
						}}
					>
						<Stack direction="row" alignItems="center">
							{claimExecuting && (
								<CircularProgress sx={{ color: 'white', mr: 1 }} size={16} />
							)}
							<Typography variant="body1" sx={{ fontWeight: '600' }}>
								Finalize
							</Typography>
						</Stack>
					</ButtonWhite>
				);
			} else {
				return (
					<ButtonWhite
						onClick={() => {
							withdrawCoinFromAuction();
							// handlePlacebid1();
						}}
						sx={{
							fontWeight: '600',
							width: 'fit-content',
							mx: 'auto',
						}}
					>
						<Stack direction="row" alignItems="center">
							<Typography variant="body1" sx={{ fontWeight: '600' }}>
								Claim
								{/* claim tien */}
							</Typography>
						</Stack>
					</ButtonWhite>
				);
			}
		}
	};

	return (
		<>
			<Fragment>
				<BoxContainCountDown>
					<Stack gap={1}>
						<Stack>
							<GridBoxBackGround>
								<Typography variant="body1">
									{bidderInfo?.offer_numbers.length === 0
										? 'Min Price'
										: 'Current Bid'}
									: &nbsp;
								</Typography>
								<Typography variant="body1" sx={{ fontWeight: '500' }}>
									{bidderInfo && (
										<>
											{Math.max(
												...bidderInfo?.offer_numbers,
												bidderInfo?.listing?.min_price
											)}
										</>
									)}
									{/* {''} {auctionDetail?.priceType.toUpperCase()} */}
								</Typography>
							</GridBoxBackGround>
						</Stack>
						<Stack>
							<GridBoxBackGround>
								<Typography variant="body1">
									{!disableButtonPlaceBid ? 'Count  Down' : 'Up Coming'}: &nbsp;
								</Typography>
								{renderCountdown()}
							</GridBoxBackGround>
						</Stack>
					</Stack>
					<Box marginTop={4}>{handleRenderButtonBid()}</Box>
				</BoxContainCountDown>
				{/* <Box marginTop={5}>
					<Box>
						<Stack direction="row" justifyContent="space-between">
							<Typography>Favortites:</Typography>
							<Typography>12</Typography>
						</Stack>
						<Stack direction="row" justifyContent="space-between">
							<Typography>Blockchain:</Typography>
							{renderBlockchain()}
						</Stack>
					</Box>
				</Box> */}
				<Modal
					onOpen={modal}
					onClose={() => {
						setModal(false);
					}}
					allowClose={
						!step1.isExecuting &&
						!step1.isChecking &&
						!step2.isExecuting &&
						!step2.isChecking
					}
					mainHeader={'Place Bid'}
					style={{ maxWidth: '450px', overflowY: 'auto' }}
				>
					<Stack direction="column" spacing={2}>
						<Stack direction="row" justifyContent="space-between">
							<Typography>
								{/* {auctionDetail?.highestBid === 0 ? 'Min Price' : 'Highest Bid'} */}
							</Typography>
							<Typography>
								{/* {auctionDetail?.highestBid === 0
									? auctionDetail?.minPrice
									: auctionDetail?.highestBid}{' '}
								{auctionDetail?.priceType.toUpperCase()} */}
							</Typography>
						</Stack>
						<Stack direction="row" justifyContent="space-between">
							<Typography>Bid Increase Percent</Typography>
							<Typography>
								{/* {auctionDetail ? auctionDetail.bidIncreasePercent : 0}% */}
							</Typography>
						</Stack>
						<form onSubmit={handleSubmit(onSubmit)}>
							<FieldInput
								readOnly={disableInputBid}
								id="amount"
								type="number"
								placeholder="Amount Token"
								onChange={(e: any) => {
									setPriceBid(e.target.value);
									// handleCheckBalance(e);
								}}
								// value={startValue}
								// registerHookForm={{ ...register('amount') }}
							/>
							<NoticeMessage>
								Bid price have to more than{' '}
								{/* {auctionDetail?.highestBid === 0
									? auctionDetail?.minPrice
									: nextLowestBid}
								{auctionDetail?.priceType.toUpperCase()} */}
							</NoticeMessage>
							{errors.amount?.message && (
								<ErrorMessage>{errors.amount?.message}</ErrorMessage>
							)}
							{step1.isExecuting || step1.isCompleted || openStep ? (
								<></>
							) : (
								<Stack
									direction="row"
									alignItems="center"
									sx={{ marginLeft: '-10px', mt: 2 }}
								>
									<Checkbox
										checked={checked}
										aria-checked="false"
										onChange={handleChangeCheckBox}
										required
									/>

									<Typography variant="body2" component="span">
										I agree to Metaspacecy
										<Link
											variant="body2"
											sx={{
												ml: 0.5,
												color: 'black',
												cursor: 'pointer',
												'&:hover': {
													textDecoration: 'underline !important',
												},
											}}
											href={'/'}
											target="_blank"
										>
											Terms of Service
										</Link>
									</Typography>
								</Stack>
							)}

							<Box sx={{ margin: '16px 0px !important' }}>
								{step1.isExecuting || step1.isCompleted || openStep ? (
									<BottomLine></BottomLine>
								) : (
									<ButtonWhite
										type="submit"
										// disabled={
										// 	disableButton ||
										// 	step1.isExecuting ||
										// 	step1.isCompleted ||
										// 	!checked ||
										// 	openStep
										// }
									>
										<Typography>Confirm</Typography>
									</ButtonWhite>
								)}
							</Box>
						</form>
					</Stack>
					{openStep && (
						<Stepper
							activeStep={activeStep}
							orientation="vertical"
							sx={{ mb: 2, transition: 'all 0.5s ease' }}
						>
							<Step>
								<StepLabel
									optional={
										<Typography variant="caption">Recurring fees.</Typography>
									}
								>
									Approve Token.
								</StepLabel>

								<StepContent>
									<ButtonWhite
										disabled={step1.isCompleted || step1.isExecuting}
										onClick={() => {
											if (didUserBid) {
												increaseBid();
											} else {
												bidAuction();
											}
											handleStep1(false);
										}}
										sx={{ width: '180px', height: '40px', mt: 1 }}
									>
										{(step1.isChecking || step1.isExecuting) && (
											<CircularProgress
												sx={{ color: 'white', mr: 1 }}
												size={16}
											/>
										)}
										<Typography variant="button">
											{step1.isChecking
												? 'Checking...'
												: step1.isExecuting
												? 'Executing...'
												: step1.isCompleted
												? 'Done'
												: 'Confirm'}
										</Typography>
									</ButtonWhite>
								</StepContent>
							</Step>
							<Step>
								<StepLabel
									optional={
										<Typography variant="caption">Recurring fees.</Typography>
									}
								>
									Completing Accept Bid.
								</StepLabel>
								<StepContent>
									<ButtonWhite
										disabled={!step1.isCompleted || step2.isExecuting}
										onClick={() => {
											handleStep2();
											bidAuction();
										}}
										sx={{ width: '180px', height: '40px', mt: 1 }}
									>
										{(step2.isChecking || step2.isExecuting) && (
											<CircularProgress
												sx={{ color: 'white', mr: 1 }}
												size={16}
											/>
										)}
										<Typography variant="button">
											{step2.isChecking
												? 'Checking...'
												: step2.isExecuting
												? 'Executing...'
												: 'Place Bid'}
										</Typography>
									</ButtonWhite>
								</StepContent>
							</Step>
							<Step>
								<StepLabel>Accept Bid Successfully</StepLabel>
								<StepContent>
									<ButtonWhite
										disabled={!step2.isCompleted}
										onClick={() => {
											window.location.reload();
										}}
										sx={{ width: '180px', height: '40px', mt: 1 }}
									>
										<Typography>View Item</Typography>
									</ButtonWhite>
								</StepContent>
							</Step>
						</Stepper>
					)}
				</Modal>
				{/* <Modal
					onOpen={true}
					onClose={() => {
						setModal(false);
					}}
					allowClose={
						!step1.isExecuting &&
						!step1.isChecking &&
						!step2.isExecuting &&
						!step2.isChecking
					}
					mainHeader={'Take Highest Bid'}
					style={{ maxWidth: '450px', overflowY: 'auto' }}
				>
					<ButtonWhite onClick={handleTakeHighestBid}>TAKE IT</ButtonWhite>
				</Modal> */}
			</Fragment>
		</>
	);
}
