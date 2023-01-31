import React, { useState } from 'react';

const useControlModal = () => {
	const [openModalBuy, setOpenModalBuy] = useState(false);
	const [activeStep, setActiveStep] = React.useState(0);
	const [statusBuyNft, setStatusBuyNft] = useState({
		isLoading: false,
		isSuccess: false,
		isError: false,
	});
	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
	const handleOpenModalBuy = () => {
		setOpenModalBuy(true);
	};
	const handleCloseModalBuy = (func?: any) => {
		resetState();
		setOpenModalBuy(false);
		func();
	};
	const startLoading = () => {
		console.log('chayt');
		setStatusBuyNft({ ...statusBuyNft, isLoading: true });
	};
	const completeTaskSuccess = () => {
		setStatusBuyNft({ ...statusBuyNft, isLoading: false, isSuccess: true });
	};
	const failToComplete = () => {
		setStatusBuyNft({ ...statusBuyNft, isLoading: false, isError: true });
	};
	const resetState = () => {
		setActiveStep(0);
		setStatusBuyNft({
			isLoading: false,
			isSuccess: false,
			isError: false,
		});
	};
	return {
		handleNext,
		handleOpenModalBuy,
		handleCloseModalBuy,
		startLoading,
		completeTaskSuccess,
		failToComplete,
		openModalBuy,
		activeStep,
		statusBuyNft,
	};
};

export default useControlModal;
