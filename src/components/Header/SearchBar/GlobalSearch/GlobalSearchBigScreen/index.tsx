/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
// mui
import { Box, ClickAwayListener, colors, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
// components
import FieldInput from 'components/CustomField/FieldInput';
// styled
import { CloseIconStyled, SearchIconStyled } from '../Common/styled';
import { DropDownContentBS, SearchGroup } from './styled';

export interface IGlobalSearchBigScreenProps {
	inputValue: string;
	setInputValue: Function;
	handleOnChangeInputValue: (event: any) => void;
	RenderSearchResults: Function;
}

export default function GlobalSearchBigScreen({
	inputValue,
	setInputValue,
	handleOnChangeInputValue,
	RenderSearchResults,
}: IGlobalSearchBigScreenProps) {
	const ref: any = useRef(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const theme = useTheme();
	// useState
	const [activeDropDown, setActiveDropDown] = useState<boolean>(false);
	const [prevInputValue, setPrevInputValue] = useState<string>('');

	// functions
	const showDropDown = () => {
		if (!activeDropDown) {
			setActiveDropDown(true);
			if (inputRef.current) inputRef.current.focus();
		}
	};

	const deactivateDropdown = () => {
		setActiveDropDown(false);
	};

	const responsiveTrueBoxWidthExpand = (): number => {
		const screenWidth = window.innerWidth;
		if (screenWidth < 1300) {
			return 0;
		}
		return 250;
	};

	return (
		<Box
			sx={{
				position: 'relative',
			}}
		>
			<ClickAwayListener onClickAway={deactivateDropdown}>
				<Box ref={ref} onClick={showDropDown} sx={{ maxWidth: '500px', margin: '0 auto' }}>
					<SearchGroup
						direction="row"
						alignItems="center"
						className={activeDropDown ? 'color' : ''}
					>
						<SearchIconStyled alignItems="center" justifyContent="center">
							<SearchIcon sx={{ cursor: 'pointer', flexShrink: 0 }} />
						</SearchIconStyled>

						<FieldInput
							otherProps={{ ref: inputRef }}
							type="text"
							value={inputValue}
							placeholder={'Search...'}
							onChange={handleOnChangeInputValue}
							sx={{
								flexGrow: 1,
								padding: '0px 10px 0px 0px',
								my: 1,
								height: '28px',
								maxWidth: '400px',
								// backgroundColor: 'hsla(0,0%,100%,.15)',
								backgroundColor: 'initial',
								borderRadius: 'unset',
								border: 0,
								margin: '2px 0',
								fontSize: '16px',
								boxShadow: 0,
								...(theme.palette.mode === 'light'
									? { color: 'black' }
									: { color: '#fff' }),
								'&::placeholder': {
									...(theme.palette.mode === 'light'
										? { color: 'black' }
										: { color: '#fff' }),
								},
							}}
						/>
					</SearchGroup>

					<DropDownContentBS className={activeDropDown ? 'active' : ''}>
						{RenderSearchResults(deactivateDropdown)}
					</DropDownContentBS>
				</Box>
			</ClickAwayListener>
		</Box>
	);
}
