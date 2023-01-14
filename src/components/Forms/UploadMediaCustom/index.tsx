/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Stack, SxProps, Theme, Typography } from '@mui/material';
import isString from 'lodash/isString';
import React, { Fragment, ReactNode, useEffect, useState } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { fData, getFileType } from '../../../utils/function';
import { DropzoneContainer, DropzoneStyle, ImageDefault } from './styled';
import ImageInputDefault from '../../../assets/icons/image-input-default.svg';
import { CustomFile } from '../../../models/common';
import ReactPlayer from 'react-player/lazy';
interface UploadMediaCustomProps extends DropzoneOptions {
	error?: boolean;
	file?: CustomFile | string | null;
	caption?: ReactNode;
	sx?: SxProps<Theme>;
}

export default function UploadMediaCustom({
	error,
	file,
	caption,
	sx,
	...other
}: UploadMediaCustomProps) {
	const [reject, setReject] = useState<any>();
	const [type, setType] = useState<string>('');
	const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone(
		{
			multiple: false,
			...other,
		}
	);
	useEffect(() => {
		if (!file) return;
		const fileType = getFileType(file);
		setType(fileType);
		setReject('');
	}, [file]);
	useEffect(() => {
		if (fileRejections.length > 0) {
			setReject(fileRejections);
		}
	}, [fileRejections]);
	const ShowRejectionItems = () =>
		reject.map(({ file, errors }: any) => {
			const { path, size }: CustomFile = file;
			return (
				<Box key={path} sx={{ my: 1 }}>
					<Typography variant="body1" noWrap>
						{path} - {fData(size)}
					</Typography>

					<Typography variant="body1" noWrap sx={{ color: 'red' }}>
						File is larger than 10MB
					</Typography>
				</Box>
			);
		});

	return (
		<DropzoneContainer sx={reject ? { width: '100%', height: '100%' } : sx}>
			<DropzoneStyle
				{...getRootProps()}
				sx={{
					...(isDragActive && { opacity: 0.72 }),
					...((isDragReject || error) && { color: 'red' }),
				}}
			>
				<input
					{...getInputProps()}
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						opacity: 0,
						cursor: 'pointer',
					}}
				/>

				{file ? (
					<Fragment>
						{type === 'mp4' || type === 'mp3' ? (
							<Stack sx={{ width: '100%' }}>
								{type === 'mp3' && <button>Change</button>}
								<ReactPlayer
									url={isString(file) ? file : file.preview}
									className="Player"
									muted={true}
									playing={true}
									loop={true}
									controls
									width="100%"
									height={type === 'mp3' ? 50 : '100%'}
								/>
							</Stack>
						) : reject ? (
							<ShowRejectionItems />
						) : (
							<Box
								component="img"
								alt="avatar"
								src={isString(file) ? file : file.preview}
								sx={{
									zIndex: 8,
									objectFit: 'cover',
								}}
							></Box>
						)}
					</Fragment>
				) : (
					<ImageDefault>
						<img
							src={ImageInputDefault}
							className="placeholder-img"
							alt="default"
							width={80}
							height={80}
						/>

						<Box
							sx={{
								textAlign: 'center',
								fontSize: '10px',
								color: '#000',
								opacity: '0.5',
								fontWeight: 500,
							}}
						>
							JPG, PNG, GIF, SVG, WEBM, WAV, OGG, GLB, GLTF.
						</Box>

						<Box
							sx={{
								textAlign: 'center',
								fontSize: '10px',
								color: '#000',
								opacity: '0.5',
								fontWeight: 500,
							}}
						>
							Max size: 10 MB
						</Box>
					</ImageDefault>
				)}
			</DropzoneStyle>

			{/* {reject?.length > 0 && <ShowRejectionItems />} */}
		</DropzoneContainer>
	);
}
