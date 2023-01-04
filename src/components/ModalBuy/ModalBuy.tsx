import React from 'react';
//mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import { CircularProgress } from '@mui/material';
const steps = [
	{
		label: 'Confirm order',
		description: 'Please confirm your order',
	},
	{
		label: 'Done',
		description: `success`,
	},
];
interface Props {
	openState: boolean;
	closeModal: any;
	funcBuyNft: any;
	activeStep: number;
	statusBuyNft: { isLoading: boolean; isSuccess: boolean };
}
const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};
const ModalBuy: React.FC<Props> = ({
	openState,
	closeModal,
	funcBuyNft,
	activeStep,
	statusBuyNft,
}) => {
	return (
		<>
			{' '}
			<Modal
				open={openState}
				onClose={closeModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Stepper activeStep={activeStep} orientation="vertical">
						{steps.map((step, index) => (
							<Step key={step.label}>
								<StepLabel
									optional={
										index === 2 ? (
											<Typography variant="caption">Last step</Typography>
										) : null
									}
								>
									{step.label}
								</StepLabel>
								<StepContent>
									<Typography>{step.description}</Typography>
									<Box sx={{ mb: 2 }}>
										<div>
											<Button
												variant="contained"
												onClick={
													index === steps.length - 1
														? closeModal
														: funcBuyNft
												}
											>
												{statusBuyNft.isLoading ? (
													<>
														<CircularProgress
															sx={{ color: 'white', mr: 1 }}
															size={16}
														/>
													</>
												) : (
													<>
														{' '}
														{index === steps.length - 1
															? 'Finish'
															: 'Confirm'}
													</>
												)}
											</Button>
										</div>
									</Box>
								</StepContent>
							</Step>
						))}
					</Stepper>
				</Box>
			</Modal>
		</>
	);
};

export default ModalBuy;
