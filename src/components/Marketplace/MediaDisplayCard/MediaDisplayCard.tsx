/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import RefreshIcon from '@mui/icons-material/Refresh';
//compoents
import LazyImageCustom from '../../../customComponents/LazyImgCustom/LazyImgCustom';
import Audio from '../Audio/index';
//styled
import { MediaErrorContent, MediaWrapper } from './styled';
//utils
import { compressImage, getFileType } from 'utils/function';
import { IconButton, Typography } from '@mui/material';
import ErrorMediaRender from '../MediaDisplayCardError/MediaDisplayCardError';

export interface IMediaDisplayProps {
	media: any;
	preview: any;
	name: any;
	lazyType?: 'progress' | 'skeleton';
	className?: any;
}

const MediaDisplayCard = ({ media, preview, name, lazyType = 'progress' }: IMediaDisplayProps) => {
	const [type] = useState<string>(getFileType(media));
	const [rendered, setRendered] = useState<boolean>(true);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);

	return (
		<Fragment>
			{rendered ? (
				<>
					{type === 'mp3' && (
						<Fragment>
							<LazyImageCustom
								src={preview}
								alt="item"
								wrapperPosition="absolute"
								imgStyle={{ borderRadius: '10px' }}
								type={lazyType}
								errorComponent={<ErrorMediaRender setRendered={setRendered} />}
							/>
							<Audio url={media} name={name} />
						</Fragment>
					)}
					{type === 'mp4' && (
						<MediaWrapper
							onMouseOver={() => {
								setIsPlaying(true);
							}}
							onMouseOut={() => {
								setIsPlaying(false);
							}}
						>
							<ReactPlayer
								// url={compressImage(media, 480, 'best')}
								url={media}
								className="react-player"
								muted={true}
								autoPlay={true}
								playing={isPlaying}
								loop={true}
								controls={false}
								config={{ file: { attributes: { controlsList: 'nodownload' } } }}
							/>
						</MediaWrapper>
					)}
					{type !== 'mp3' && type !== 'mp4' && (
						<LazyImageCustom
							// src={compressImage(media, 480, 'best')}
							src={media}
							alt="item"
							wrapperPosition="absolute"
							imgStyle={{ borderRadius: '10px' }}
							type={lazyType}
							errorComponent={<ErrorMediaRender setRendered={setRendered} />}
						/>
					)}
				</>
			) : (
				<></>
			)}
		</Fragment>
	);
};

export default MediaDisplayCard;
