/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, SxProps, Theme, Typography } from '@mui/material';
import isString from 'lodash/isString';
import React, { Fragment, ReactNode, useEffect, useState } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { fData, getFileType } from '../../../utils/function';
import { DropzoneContainer, DropzoneStyle, ImageDefault } from './styled';
import ImageInputDefault from '../../../assets/icons/image-input-default.svg';
import { CustomFile } from '../../../models/common';

interface UploadMediaCustomProps extends DropzoneOptions {
	error?: boolean;
	file?: CustomFile | string | null;
	caption?: ReactNode;
	sx?: SxProps<Theme>;
	onChange: any;
}

export default function UploadMediaCustom({
	onChange,
	error,
	file,
	caption,
	sx,
	...other
}: UploadMediaCustomProps) {
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
	}, [file]);

	const ShowRejectionItems = () => (
		<Box>
			{fileRejections.map(({ file, errors }) => {
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
			})}
		</Box>
	);

	return (
		<DropzoneContainer sx={sx}>
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
					onChange={onChange}
				/>

				{file ? (
					<Fragment>
						<Box
							component="img"
							alt="avatar"
							src={isString(file) ? file : file.preview}
							sx={{ zIndex: 8, objectFit: 'cover' }}
						></Box>
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
							JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100
							MB
						</Box>
					</ImageDefault>
				)}
			</DropzoneStyle>

			{fileRejections.length > 0 && <ShowRejectionItems />}
		</DropzoneContainer>
	);
}
