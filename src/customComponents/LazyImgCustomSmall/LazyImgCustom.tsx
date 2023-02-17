/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomCircularProgress from 'customComponents/CustomCircularProgress/CustomCircularProgress';

export interface ILazyImageCustomProps {
	src: string;
	alt: string;
	wrapperPosition: 'absolute' | 'relative'; // In case that 'parent height' is depend on padding (ex: paddingTop: 100%;), we should use 'absolute' (parent also must have property 'position'). Else we use 'relative'.
	imgStyle?: object;
	type: 'skeleton' | 'progress';
	errorComponent?: React.ReactElement;
	refresh?: boolean;
	innerRef?: any;
	onClick?: any;
}

export default function LazyImageCustom({
	src,
	alt,
	wrapperPosition,
	imgStyle,
	type,
	errorComponent,
	refresh = false,
	innerRef,
	onClick,
}: ILazyImageCustomProps) {
	// useState
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	// const [imgSrc, setImgSrc] = useState<string>(src);
	const [refreshImg, setRefreshImg] = useState<boolean>(false);
	const handleOnLoad = () => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 500);
	};

	const handleOnError = () => {
		setIsError(true);
		// setImgSrc(placeHolder);
	};

	useEffect(() => {
		setRefreshImg(!refreshImg);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refresh]);
	//type === 'skeleton'
	return (
		<Box
			ref={innerRef}
			sx={{ position: wrapperPosition, top: 0, left: 0, width: '100%', height: '100%' }}
			onClick={onClick}
		>
			<img
				loading="lazy"
				style={{ ...imgStyle, opacity: isLoaded ? 1 : 0 }}
				src={src}
				alt={alt}
				onLoad={handleOnLoad}
				onError={handleOnError}
			/>

			{!isLoaded && !isError && (
				<>
					{type === 'skeleton' ? (
						<Skeleton
							variant="rectangular"
							sx={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
							}}
						/>
					) : (
						<Box
							sx={{
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
							}}
						>
							<CustomCircularProgress />
						</Box>
					)}
				</>
			)}

			{/* Error Component */}
			{isError && errorComponent}
		</Box>
	);
}
