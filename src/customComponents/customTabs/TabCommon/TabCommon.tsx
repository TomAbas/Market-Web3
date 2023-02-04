/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
// mui
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { Stack, Tab, Typography, useTheme } from '@mui/material';
// styled
import { TabListStyled, TabStyled } from './styled';
import { useLocation } from 'react-router-dom';
import { PATH_VIEWALL } from 'routes/path';

export interface TabCommonProps {
	tabItems: any;
	tabSections: any;
	tabAlignment?: 'left' | 'center' | 'space-between';
}

const TabCommon = ({ tabItems, tabSections, tabAlignment = 'center' }: TabCommonProps) => {
	const theme = useTheme();
	const { pathname } = useLocation();

	// useState
	const [value, setValue] = React.useState('0');

	// vars
	const tabBreakpoint = 700; // need this because on small screen, the scroll + .MuiTabs-flexContainer justifyContent: 'center' will error, we can not see full the text

	// functions
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};
	return (
		<>
			{value !== '' && (
				<TabContext value={value}>
					<TabListStyled
						className="father"
						variant="scrollable"
						allowScrollButtonsMobile
						onChange={handleChange}
						aria-label="lab API tabs"
						sx={{
							margin: '12px 0',
							mb: 6,
							// borderBottom: '1px solid grey',

							'& .MuiTabs-flexContainer': {
								...(tabAlignment === 'center'
									? {
											[theme.breakpoints.up(tabBreakpoint)]: {
												justifyContent: 'center',
											},
									  }
									: {}),
							},

							'& .MuiTabs-indicator': {
								background: '#007aff',
							},

							'& .MuiTabs-scroller button': {
								...(tabAlignment === 'center'
									? {
											[theme.breakpoints.down(tabBreakpoint)]: {
												flexGrow: 1,
											},
									  }
									: {}),

								...(tabAlignment === 'space-between' ? { flexGrow: 1 } : {}),
							},
						}}
					>
						{tabItems
							.filter((item: any) => item.isShow)
							.map((item: any, idx: number) => (
								<TabStyled
									className="son"
									key={idx}
									sx={{ maxWidth: 'none' }}
									label={
										<Stack direction="row" alignItems="center">
											<Box className="unselected">
												{item.icon ? item.icon : ''}
											</Box>
											<Box className="selected">
												{item.iconSelected ? item.iconSelected : ''}
											</Box>
											<Typography
												variant="body1"
												sx={{
													ml: 1,
													fontStyle: 'italic',
													fontWeight: 500,
													textTransform: 'capitalize',
												}}
												noWrap
											>
												{item.title}
											</Typography>
										</Stack>
									}
									value={idx.toString()}
								/>
							))}
					</TabListStyled>

					<Box mb={4}>
						{tabSections
							.filter((item: any) => item.isShow)
							.map((item: any, idx: number) => (
								<TabPanel key={idx} value={idx.toString()}>
									{item.Section}
								</TabPanel>
							))}
					</Box>
				</TabContext>
			)}
		</>
	);
};

export default TabCommon;
