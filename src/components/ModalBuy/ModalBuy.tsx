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

interface Props {
	title: string;
	steps: { label: string; description: string }[];
	openState: boolean;
	closeModal: any;
	funcBuyNft: any;
	activeStep: number;
	statusBuyNft: { isLoading: boolean; isSuccess: boolean; isError: boolean };
}
const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	// border: '2px solid #000',
	borderRadius: '12px',
	boxShadow: 24,
	p: 4,
};
const ModalBuy: React.FC<Props> = ({
	title,
	openState,
	closeModal,
	funcBuyNft,
	activeStep,
	statusBuyNft,
	steps,
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
					<Box sx={{ textAlign: 'center', marginBottom: '15px' }}>
						<Typography variant="h5" sx={{ fontWeight: '500' }}>
							{title}
						</Typography>
					</Box>
					<Stepper activeStep={activeStep} orientation="vertical">
						{steps.map(
							(step: { label: string; description: string }, index: number) => (
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
												{statusBuyNft.isLoading ? (
													<Button disabled={true} variant="contained">
														<>
															<CircularProgress
																sx={{ color: 'white', mr: 1 }}
																size={16}
															/>
														</>
													</Button>
												) : statusBuyNft.isSuccess ? (
													<Button
														variant="contained"
														onClick={closeModal}
														sx={{ textTransform: 'capitalize' }}
													>
														Finish
													</Button>
												) : statusBuyNft.isError ? (
													<Button
														variant="contained"
														onClick={closeModal}
														sx={{ textTransform: 'capitalize' }}
													>
														Close
													</Button>
												) : (
													<Button
														variant="contained"
														onClick={funcBuyNft}
														sx={{ textTransform: 'capitalize' }}
													>
														<>
															{index === steps.length - 1
																? 'Finish'
																: 'Confirm'}
														</>
													</Button>
												)}
											</div>
										</Box>
									</StepContent>
								</Step>
							)
						)}
					</Stepper>
				</Box>
			</Modal>
		</>
	);
};

export default ModalBuy;
