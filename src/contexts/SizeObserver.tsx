import React, { useEffect, useCallback, useState, useContext } from 'react';

interface ResizeValue {
	innerWidth: number;
	innerHeight: number;
}
interface Props {
	children: any;
}
export const SizeContext = React.createContext<ResizeValue>({
	innerWidth: window.innerWidth,
	innerHeight: window.innerHeight,
});
export const useSizeObersver = () => {
	return useContext(SizeContext);
};

const SizeObserver: React.FC<Props> = ({ children }) => {
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const [innerHeight, setInnerHeight] = useState(window.innerHeight);

	const handleResize = useCallback(() => {
		setInnerWidth(window.innerWidth);
		setInnerHeight(window.innerHeight);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		window.addEventListener('resize', handleResize, { passive: true });

		return () => window.removeEventListener('resize', handleResize);
	}, [handleResize]);

	return (
		<SizeContext.Provider value={{ innerWidth, innerHeight }}>{children}</SizeContext.Provider>
	);
};

export default SizeObserver;
