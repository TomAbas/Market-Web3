import React, { useState } from 'react';

interface AudioProps {
	currentAudio: null | string;
	handleSetCurrentAudio: (url: string) => void;
}

export const AudioContext = React.createContext<AudioProps>({
	currentAudio: null,
	handleSetCurrentAudio: () => {},
});
type AudioProvider = {
	children: React.ReactNode; // 👈️ type children
};
const AudioProvider: React.FC<AudioProvider> = ({ children }: any) => {
	const [currentAudio, setCurrentAudio] = useState<string | null>(null);

	const handleSetCurrentAudio = (url: string) => {
		setCurrentAudio(url);
	};

	return (
		<AudioContext.Provider value={{ currentAudio, handleSetCurrentAudio }}>
			{children}
		</AudioContext.Provider>
	);
};

export default AudioProvider;
