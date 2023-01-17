/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
	FilterContent,
	LinkWrapper,
	HeaderSection,
	MainHeader,
	SubTitle,
	DropdownWrapper,
	ListOption,
	OptionItem,
	OptionItemText,
	CheckIconWrapper,
} from './styled';
import CheckIcon from '@mui/icons-material/Check';
import { Button, Box, Grid } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DropDown from 'components/CustomUI/DropDown';
//coponents
import TopCollections from './TopCollections';

interface Props {
	selectedFilter: string;
}
interface Props0 {
	selectedFilter: any;
	handleClickOption: any;
}
const ButtonContent: React.FC<Props> = ({ selectedFilter }) => {
	return (
		<SubTitle
			variant="h2"
			sx={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginLeft: '8px',
			}}
		>
			{selectedFilter} <KeyboardArrowDownIcon sx={{ width: 40, height: 40 }} />
		</SubTitle>
	);
};

const DropdownContent: React.FC<Props0> = ({ selectedFilter, handleClickOption }) => {
	const listFilter: any = [
		{ name: '1 day', value: 'volume24Hours' },
		{ name: '7 days', value: 'volume7Days' },
		{ name: '30 days', value: 'volume30Days' },
	];
	return (
		<DropdownWrapper sx={{ width: '180px' }}>
			<ListOption>
				{listFilter.map((filter: any, index: number) => {
					const isItemSelected = selectedFilter === filter.name;
					return (
						<OptionItem key={index} onClick={() => handleClickOption(filter)}>
							<OptionItemText>{filter.name}</OptionItemText>

							{isItemSelected && (
								<CheckIconWrapper>
									<CheckIcon sx={{ width: '100%', height: '100%' }} />
								</CheckIconWrapper>
							)}
						</OptionItem>
					);
				})}
			</ListOption>
		</DropdownWrapper>
	);
};

const Index = () => {
	const [activeDropDown, setActiveDropDown] = useState<boolean>(false);
	const [selectedFilter, setSelectedFilter] = useState<string>('7 days');

	const handleClickOption = (filterDay: any) => {
		setSelectedFilter(filterDay.name);
		// setSortBy(filter.value);

		setActiveDropDown(false);
	};
	return (
		<>
			<HeaderSection>
				<FilterContent>
					<MainHeader variant="h2" fontWeight="600" fontStyle="italic">
						Top collections
					</MainHeader>
					<DropDown
						activeDropDown={activeDropDown}
						setActiveDropDown={setActiveDropDown}
						buttonContent={<ButtonContent selectedFilter={selectedFilter} />}
						dropdownContent={
							<DropdownContent
								selectedFilter={selectedFilter}
								handleClickOption={handleClickOption}
							/>
						}
					/>
				</FilterContent>
				{/* <SubHeader variant="h5" sx={{ display: 'inline' }}>
            Top collection volume trade
            <LinkWrapper href={`#${PATH_COLLECTION.trending}`}>
                <ButtonViewAll sx={{ display: 'inline' }}>Ranking</ButtonViewAll>
            </LinkWrapper>
        </SubHeader> */}
			</HeaderSection>
			<Box sx={{ magrin: '2rem auto' }} fontWeight="600" fontStyle="italic">
				<Grid
					container
					spacing={4}
					columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
					sx={{ mt: 2, maxWidth: '1440px', margin: '0 auto' }}
				>
					<TopCollections filter={selectedFilter} />
				</Grid>
			</Box>

			{/* <Box sx={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
				<LinkWrapper>
					<Button
						sx={{
							textTransform: 'capitalize',
							padding: '10px 30px',
							border: '1.5px solid #e7e8ec',
							transition: 'all 0.4s',
							borderRadius: '12px',
							fontWeight: 500,
							background: '#fff',
							fontSize: '20px',
							cursor: 'pointer',
							fontFamily: 'Montserrat, sans-serif !important',
							fontStyle: 'italic !important',
							width: '250px',
							'&:hover': {
								background: '#007aff',
								borderColor: 'transparent',
								color: '#fff',
							},
							a: {
								textDecoration: 'none',
								'&:hover': {
									textDecoration: 'none',
									color: '#fff',
								},
							},
						}}
					>
						Go to Rankings
					</Button>
				</LinkWrapper>
			</Box> */}
		</>
	);
};

export default Index;
