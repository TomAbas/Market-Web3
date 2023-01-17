// import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
// styled
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ButtonContent, DropDownContent, DropDownWrapper, DropDownOverlay } from './styled';
// components
// import FadeInWhenVisible from 'components/Animation/FadeInWhenVisible';

export interface IDropDownProps {
	activeDropDown: boolean;
	setActiveDropDown: Function;
	buttonContent: React.ReactNode;
	dropdownContent: React.ReactNode;
	className?: string;
	sx?: any;
}

export default function DropDown({
	activeDropDown,
	setActiveDropDown,
	buttonContent,
	dropdownContent,
	className,
	sx,
}: IDropDownProps) {
	const ref: any = useRef(null);

	useEffect(() => {
		const onBodyClick = (event: any) => {
			event.stopPropagation();

			if (ref.current && !ref.current.contains(event.target)) {
				setActiveDropDown(false);
			}
		};
		// Bind the event listener if dropdown is active
		if (activeDropDown) document.body.addEventListener('click', onBodyClick, { passive: true });

		return () => {
			// Unbind the event listener on clean up
			document.body.removeEventListener('click', onBodyClick);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeDropDown]);

	const showOptionBox = (e: any) => {
		e.preventDefault();
		if (!activeDropDown) setActiveDropDown(true);
	};

	return (
		<DropDownWrapper className={className} onClick={(e: any) => showOptionBox(e)}>
			<ButtonContent>{buttonContent}</ButtonContent>
			{/* {activeDropDown && ( */}
			{/* <FadeInWhenVisible> */}

			<DropDownOverlay className={activeDropDown ? 'active' : ''} />

			<DropDownContent sx={sx} ref={ref} className={activeDropDown ? 'active' : ''}>
				{dropdownContent}
			</DropDownContent>
			{/* </FadeInWhenVisible> */}
			{/* )} */}
		</DropDownWrapper>
	);
}
