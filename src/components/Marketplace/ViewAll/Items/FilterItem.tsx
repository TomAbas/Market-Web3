import FilterPrice from 'components/Marketplace/FilterItem/FilterPrice/';
import FilterStatus from 'components/Marketplace/FilterItem/FilterStatus/FilterStatus';
import FilterCollection from 'components/Marketplace/FilterItem/FilterCollection/FilterCollection';
import { FilterWrapper } from './styled';
const FilterItem = () => {
	return (
		<>
			<FilterWrapper>
				<FilterPrice />
				<FilterStatus />
				<FilterCollection />
			</FilterWrapper>
		</>
	);
};

export default FilterItem;
