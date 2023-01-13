import { Typography, IconButton } from '@mui/material';
import { MediaErrorContent } from './styled';
import RefreshIcon from '@mui/icons-material/Refresh';
interface Props {
	setRendered: any;
}
const ErrorMediaRender: React.FC<Props> = ({ setRendered }) => {
	return (
		<MediaErrorContent>
			<Typography variant="h6">Error</Typography>
			<Typography variant="body2">
				Something went wrong when load this media. Please refresh
			</Typography>
			<IconButton
				aria-label="refresh"
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					setRendered(false);
					setTimeout(() => {
						setRendered(true);
					}, 1);
				}}
			>
				<RefreshIcon />
			</IconButton>
		</MediaErrorContent>
	);
};
export default ErrorMediaRender;
