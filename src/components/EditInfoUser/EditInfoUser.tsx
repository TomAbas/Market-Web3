/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, CircularProgress, Modal, Stack, Typography } from '@mui/material';
import UploadMediaCustom from 'components/Forms/UploadMediaCustom';
import ButtonWhite from 'customCompoents/ButtonWhite/ButtonWhite';
import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
	ErrorMessage,
	Input,
	InputGroup,
	Label,
	TopPart,
	Textarea,
	TopModal,
	TopTitleModal,
} from './styled';
// yup
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//model
import { Response } from '../../models/common';
import { User } from 'models/user';
//api
import { uploadUserMedia } from 'api/uploadAPI';
//redux
import { updateUser } from 'api/userApi/userApi';
import { selectUser, updateInfoUserA } from '../../redux/slices/userInfo';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { toast } from 'react-toastify';
export interface IFormEditProfileInputs {
	avatar: any;
	background: any;
	bio: string;
	email: string;
	username: string;
	social: string;
}
interface Props {
	infoUser: User;
	openEdit: boolean;
	openEditModal: () => void;
}
const EditInfoUser: React.FC<Props> = ({ infoUser, openEdit, openEditModal }) => {
	const dispatch = useAppDispatch();

	// useState
	const [avatar, setAvatar] = useState<any>(null);
	const [background, setBackground] = useState<any>(null);
	const [isLoading, setIsLoading] = useState<any>(false);

	//hook form
	const schema = yup
		.object({
			avatar: yup
				.mixed()
				.required()
				.test('require a file', 'avatar is required!', (value: any) => {
					return Boolean(value.length !== 0);
				}),
			background: yup.mixed(),
			bio: yup.string(),
			email: yup.string(),
			username: yup.string().required(),
			social: yup.string(),
		})
		.required();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<IFormEditProfileInputs>({
		resolver: yupResolver(schema),
	});
	const onSubmit = async (data: IFormEditProfileInputs) => {
		if (!infoUser) return;
		const avatar: any = data.avatar;
		const background: any = data.background;
		let avatarURL: string = '';
		let backgroundURL: string = '';

		try {
			if (typeof avatar === 'string') {
				// if this is string, it's because it is already an image url
				avatarURL = avatar;
			} else {
				const avatarForm = new FormData();
				avatarForm.append('file', avatar.raw);
				const res: Response<any> = await uploadUserMedia(avatarForm, infoUser.userAddress);
				avatarURL = res.data.data.result;
				console.log('res', res);
			}

			if (typeof background === 'string') {
				// if this is string, it's because it is already an image url
				backgroundURL = background;
			} else {
				const backgroundForm = new FormData();
				backgroundForm.append('file', background.raw);
				const res: Response<any> = await uploadUserMedia(
					backgroundForm,
					infoUser.userAddress
				);
				backgroundURL = res.data.data.result;
			}

			// const executeAfterUpdateUser = (globalStateNewest: RootState) => {
			// 	const { user } = globalStateNewest;

			// 	if (user.isSuccess) {
			// 		toast.success('Update profile success!');
			// 		setIsOpenModalEditProfile(false);
			// 	} else {
			// 		toast.error(user.errorMessage);
			// 	}
			// };

			const newData: User = {
				...data,
				avatar: avatarURL,
				background: backgroundURL,
				userAddress: infoUser.userAddress,
			};
			console.log(newData);
			dispatch(updateInfoUserA(newData));
			updateUser(newData);
			openEditModal();
			toast.success('Successfull Update Info !');
		} catch (error: any) {
			console.log(error);
			// toast.error(error.message);
		}
	};
	//end hook form
	//function drop images

	const handleDropAvatar = useCallback(
		(acceptedFiles: any) => {
			const file = acceptedFiles[0];
			if (file) {
				setValue('avatar', {
					...file,
					preview: URL.createObjectURL(file),
					raw: file,
				});

				setAvatar({ ...file, preview: URL.createObjectURL(file) });
			}
		},
		[setValue]
	);

	const handleDropBackground = useCallback(
		(acceptedFiles: any) => {
			const file = acceptedFiles[0];
			if (file) {
				setValue('background', {
					...file,
					preview: URL.createObjectURL(file),
					raw: file,
				});

				setBackground({ ...file, preview: URL.createObjectURL(file) });
			}
		},
		[setValue]
	);
	//end drop images
	useEffect(() => {
		if (infoUser) {
			setValue(`username`, infoUser.username);
			setValue(`bio`, infoUser.bio);
			setValue(`email`, infoUser.email);
			setValue(`social`, infoUser.social);
			setValue(`avatar`, infoUser.avatar);
			setValue(`background`, infoUser.background);
			setAvatar(infoUser.avatar);
			setBackground(infoUser.background);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [infoUser]);
	return (
		<>
			<Modal
				open={openEdit}
				onClose={openEditModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<>
					<Box
						sx={{
							maxWidth: '500px',
							minWidth: '300px',
							pb: 2,
							overflowY: 'auto',
							display: 'flex',
							margin: ' 0 auto',
							height: '100vh',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<form
							action=""
							onSubmit={handleSubmit(onSubmit)}
							style={{
								backgroundColor: '#fff',
								padding: '20px 20px',
								width: '100%',
								borderRadius: '15px',
							}}
						>
							<TopModal direction="row" gap="10px" alignItems="center">
								<TopTitleModal style={{ fontWeight: 500 }}>
									Edit Profile
								</TopTitleModal>
							</TopModal>
							<Box sx={{ padding: '20px' }}>
								<TopPart>
									<Stack direction="column" alignItems="center">
										<InputGroup sx={{ margin: 0 }}>
											<UploadMediaCustom
												accept={{
													'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
												}}
												file={avatar}
												maxSize={10485760}
												onDrop={handleDropAvatar}
												error={Boolean(errors.avatar)}
												sx={{
													width: 120,
													height: 120,
													margin: 'auto',
													borderRadius: '50%',
													border: '1px dashed #E7E8EC',
													overflow: 'hidden',
													'.placeholder-img': {
														borderRadius: '50%',
														width: 50,
														height: 50,
													},
												}}
											/>

											{/* {errors.avatar?.message && (
										<ErrorMessage>{errors.avatar?.message}</ErrorMessage>
									)} */}
										</InputGroup>
									</Stack>
								</TopPart>

								<InputGroup>
									<Label>Banner</Label>

									<UploadMediaCustom
										file={background}
										accept={{
											'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
										}}
										maxSize={10485760}
										onDrop={handleDropBackground}
										error={Boolean(errors.background)}
										sx={{
											width: '100%',
											height: 180,
											margin: 'auto',
											borderRadius: '5px',
											border: '1px dashed #E7E8EC',
											overflow: 'hidden',
										}}
									/>

									{/* {errors.background?.message && (
								<ErrorMessage>{errors.background?.message}</ErrorMessage>
							)} */}
								</InputGroup>
								<InputGroup>
									<Label htmlFor="user-bio">Bio</Label>

									<Textarea
										{...register('bio')}
										placeholder="Please write something about yourself"
									/>

									{errors.bio?.message && (
										<ErrorMessage>{errors.bio?.message}</ErrorMessage>
									)}
								</InputGroup>
								<Stack alignItems="center" sx={{ marginTop: '20px' }}>
									<ButtonWhite
										sx={{ paddingLeft: '30px', paddingRight: '30px' }}
										type="submit"
										disabled={isSubmitting || isLoading}
									>
										<Stack direction="row" alignItems="center">
											{(isSubmitting || isLoading) && (
												<CircularProgress
													sx={{ color: 'white', mr: 1 }}
													size={25}
												/>
											)}
											<Typography variant="button">Submit</Typography>
										</Stack>
									</ButtonWhite>
								</Stack>
							</Box>
						</form>
					</Box>
				</>
			</Modal>
		</>
	);
};

export default EditInfoUser;
