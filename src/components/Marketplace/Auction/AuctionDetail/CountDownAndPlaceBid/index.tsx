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
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import useAuctionModules from 'utils/auction';

import { selectUser } from 'redux/slices/userInfo';
import { orderSell } from 'models/transaction';
import { userInfo } from 'os';
import { getBidUser, getEventsByCreationNumber } from 'utils/auctionResources';
import { changePriceToToken } from 'utils/function';
import { tokenPaymentSymbol } from 'constants/sellItem';
import { handleTrigger, selectTrigger } from 'redux/slices/nftFilter';
import { formatTimeHistory } from '../../../../../utils/function';
import { dispatch } from 'redux/store';

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
	isFinalize: boolean;
}

export default function CountDownAndPlaceBid({ auctionDetail, bidderInfo, isFinalize }: Props) {
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
	const [checkIsClaim, setCheckIsClaim] = useState(false);
	const trigger = useAppSelector(selectTrigger);
	const dispath = useAppDispatch();
	const userAddress = useAppSelector(selectUser);
	const [startValue, setStartValue] = useState<number>(0);
	const [nextLowestBid, setNextLowestBid] = useState(0);
	const [yourBid, setYourBid] = useState(0);
	const [loading, setLoading] = useState(false);
	const {
		bidAuction,
		setPriceBid,
		increaseBid,
		cancelBid,
		withdrawCoinFromAuction,
		finalizeAuction,
		priceBid,
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
			).then((res) =>
				res.map((item: any) => {
					return item.data;
				})
			);

			let isBid = listBid.find((listid: any) => {
				return (
					listid.bid_id.listing_id.creation_num == auctionDetail.creationNumber &&
					listid.bid_id.listing_id.addr == auctionDetail.maker
				);
			});
			if (isBid) {
				setYourBid(Number(isBid.offer_price));
			}
		} catch (err) {
			setCheckIsClaim(false);
		}
	}
	async function checkIsClaimFc() {
		try {
			await getBidUser(
				userAddress?.userAddress!,
				auctionDetail.coinType,
				'2',
				auctionDetail.maker,
				auctionDetail.creationNumber
			).then((res) => {
				if (
					isFinalize ||
					Number(auctionDetail.expirationTime) + 7 * 24 * 60 * 60000 + 5 * 60000 <
						Date.now()
				) {
					setCheckIsClaim(true);
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		if (bidderInfo && userAddress) {
			setDidUserBid(checkDidUserBid());
			checkCanClaim();
		}
		if (userAddress) {
			checkCanClaim();
		}
	}, [bidderInfo, userAddress]);
	useEffect(() => {
		if (auctionDetail && userAddress) {
			checkIsClaimFc();
		}
	}, [auctionDetail, userAddress]);
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

	useEffect(() => {
		setModal(false);
		setLoading(false);
	}, [trigger]);

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
				} else if (
					Number(auctionDetail.expirationTime) < new Date().getTime() &&
					!isFinalize
				) {
					return (
						<ButtonWhite
							sx={{
								fontWeight: '600',
								width: 'fit-content',
								mx: 'auto',
							}}
							onClick={() => {
								finalizeAuction().then((res) => {
									dispatch(handleTrigger());
								});
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
				} else if (checkIsClaim) {
					return (
						<ButtonWhite
							onClick={() => {
								withdrawCoinFromAuction().then((res) => {
									setCheckIsClaim(false);
								});
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
											{changePriceToToken(
												Math.max(
													...bidderInfo?.offer_numbers,
													bidderInfo?.listing?.min_price
												),
												auctionDetail.coinType
											)}
										</>
									)}
									{''}{' '}
									{tokenPaymentSymbol[
										auctionDetail.coinType?.split('::').slice(-1)[0]
									].toUpperCase()}{' '}
								</Typography>
							</GridBoxBackGround>
						</Stack>
						<Stack>
							<GridBoxBackGround>
								<Typography variant="body1">
									{Number(auctionDetail.expirationTime) < new Date().getTime() ? (
										<>End at : &nbsp;</>
									) : (
										<>
											{' '}
											{!disableButtonPlaceBid ? 'Count  Down' : 'Up Coming'}:
											&nbsp;
										</>
									)}
								</Typography>
								{Number(auctionDetail.expirationTime) < new Date().getTime() ? (
									<>
										{formatTimeHistory(
											new Date(
												Number(auctionDetail.expirationTime)
											).toString()
										)}
									</>
								) : (
									<>{renderCountdown()}</>
								)}
								{/* // {renderCountdown()} */}
							</GridBoxBackGround>
						</Stack>
						<Stack>
							<GridBoxBackGround>
								<Typography variant="body1">Your Bid Price: &nbsp;</Typography>
								<Typography variant="body1" sx={{ fontWeight: '500' }}>
									{changePriceToToken(yourBid, auctionDetail.coinType)}{' '}
									{tokenPaymentSymbol[
										auctionDetail.coinType?.split('::').slice(-1)[0]
									].toUpperCase()}{' '}
								</Typography>
							</GridBoxBackGround>
						</Stack>
					</Stack>
					<Box marginTop={4}>{handleRenderButtonBid()}</Box>
				</BoxContainCountDown>

				<Modal
					onOpen={modal}
					onClose={() => {
						setLoading(false);
						setOpenStep(false);
						setModal(false);
						setPriceBid('');
						setDisableInputBid(false);
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
						<form onSubmit={handleSubmit(onSubmit)}>
							<FieldInput
								readOnly={disableInputBid}
								id="amount"
								type="number"
								placeholder="Amount Token"
								onChange={(e: any) => {
									setPriceBid(e.target.value);
								}}
							/>
							{priceBid && (
								<>
									{Number(priceBid) <
										changePriceToToken(
											Math.max(
												...bidderInfo?.offer_numbers,
												bidderInfo?.listing?.min_price
											),
											auctionDetail.coinType
										) && (
										<ErrorMessage>
											Bid price have to more than{' '}
											{bidderInfo && (
												<>
													{changePriceToToken(
														Math.max(
															...bidderInfo?.offer_numbers,
															bidderInfo?.listing?.min_price
														),
														auctionDetail.coinType
													)}
												</>
											)}{' '}
											{tokenPaymentSymbol[
												auctionDetail.coinType?.split('::').slice(-1)[0]
											].toUpperCase()}{' '}
										</ErrorMessage>
									)}
								</>
							)}

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
										disabled={
											(priceBid &&
												Number(priceBid) <
													changePriceToToken(
														Math.max(
															...bidderInfo?.offer_numbers,
															bidderInfo?.listing?.min_price
														),
														auctionDetail.coinType
													)) ||
											priceBid === ''
												? true
												: false
										}
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
									Completing Accept Bid.
								</StepLabel>

								<StepContent>
									<ButtonWhite
										onClick={() => {
											if (didUserBid) {
												increaseBid();
											} else {
												bidAuction();
											}
											setLoading(true);
											handleStep1(false);
										}}
										sx={{ width: '180px', height: '40px', mt: 1 }}
									>
										{loading ? (
											<CircularProgress
												sx={{ color: 'black', mr: 1 }}
												size={16}
											/>
										) : (
											<Typography variant="button">
												{step1.isChecking
													? 'Checking...'
													: step1.isExecuting
													? 'Executing...'
													: step1.isCompleted
													? 'Done'
													: 'Confirm'}
											</Typography>
										)}
									</ButtonWhite>
								</StepContent>
							</Step>
							{/* <Step>
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
							</Step> */}
						</Stepper>
					)}
				</Modal>
			</Fragment>
		</>
	);
}
