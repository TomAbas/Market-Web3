/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';
// hooks
import { useAudio } from 'hooks/useAudio';
// styled
import { PlayBtn } from './styled';
// mui
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
// context
import { AudioContext } from 'contexts/AudioContext';

export interface IAudioProps {
	url: string;
	name: string;
}

export default function Audio({ url, name }: IAudioProps) {
	const { currentAudio } = useContext(AudioContext);
	const [playing, toggle] = useAudio(url);

	const handleToggle = (e: any) => {
		e.stopPropagation();

		toggle();
	};
	return (
		<PlayBtn onClick={handleToggle}>
			{currentAudio === url ? playing ? <PauseIcon /> : <PlayArrowIcon /> : <PlayArrowIcon />}
		</PlayBtn>
	);
}
