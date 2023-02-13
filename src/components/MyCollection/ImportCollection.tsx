/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	CircularProgress,
	Modal,
	Typography,
	Stepper,
	Step,
	StepLabel,
	StepContent,
} from '@mui/material';
import { getCollectionData } from 'service/aptos.service';
import { useAppSelector } from 'redux/hooks';
import { selectUser } from 'redux/slices/userInfo';
import { createCollection } from 'api/collections/collectionApi';
import { selectTrigger } from 'redux/slices/nftFilter';

interface Props {
	open: boolean;
	onClose: () => void;
	setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}
const ImportCollection: React.FC<Props> = ({ open, onClose, setTrigger }) => {
	const userInfo = useAppSelector(selectUser);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	const [buttonText, setButtonText] = useState('Check' as string);
	const [collectionName, setCollectionName] = useState('');
	const [collectionData, setCollectionData] = useState<any>(null);
	const steps = [
		{
			label: 'Check Collection Name',
			description: 'Import your collection',
		},
		{
			label: 'Import Collection',
			description: 'Importing your collection',
		},
		{
			label: 'Done',
			description: 'Your collection has been imported',
		},
	];
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

	const handleImport = async () => {
		try {
			if (activeStep === 0) {
				setLoading(true);
				if (collectionName === '') {
					setError('Collection name is required');
					setLoading(false);
					return;
				}
				getCollectionData(userInfo?.userAddress!, collectionName)
					.then((res) => {
						console.log(res);
						setCollectionData({
							userAddress: userInfo?.userAddress!,
							chainId: '2',
							collectionName: res.name,
							description: res.description,
							logo: res.uri,
						});
						setLoading(false);
						setActiveStep(1);
						setButtonText('Import');
					})
					.catch((err) => {
						setLoading(false);
						if (err.status === 404) {
							setError('Cannot find collection');
						} else {
							setError('Something went wrong');
						}
						return;
					});
				setError(null);
			} else if (activeStep === 1) {
				setLoading(true);
				createCollection(collectionData).then((res) => {
					setLoading(false);
					setActiveStep(2);
					setButtonText('Done');
					setTrigger((prev) => !prev);
				});
			} else {
				setLoading(false);
				setActiveStep(0);
				setButtonText('Check');
				setCollectionName('');
				setCollectionData(null);
				onClose();
			}
		} catch (err: any) {
			setError(err);
		}
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Box sx={{ textAlign: 'center', marginBottom: '15px' }}>
					<Typography variant="h5" sx={{ fontWeight: '500' }}>
						Import Collection
					</Typography>
				</Box>
				<Stepper activeStep={activeStep} orientation="vertical">
					{steps.map((step: { label: string; description: string }, index: number) => (
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
								{/* "Input collection name" */}
								{index === 0 && (
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
											type="text"
											value={collectionName}
											onChange={(e) => {
												setCollectionName(e.target.value);
											}}
											placeholder="Collection Name"
										/>
									</Box>
								)}

								<Box sx={{ my: 2 }}>
									{error && (
										<Typography variant="caption" color="error">
											{error}
										</Typography>
									)}
									<div>
										{loading ? (
											<CircularProgress />
										) : (
											<Button variant="contained" onClick={handleImport}>
												{buttonText}
											</Button>
										)}
									</div>
								</Box>
							</StepContent>
						</Step>
					))}
				</Stepper>
			</Box>
		</Modal>
	);
};

export default ImportCollection;