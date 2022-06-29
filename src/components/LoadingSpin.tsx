import { FlexBox } from './styles';
import { CircularProgress } from '@mui/material';

const LoadingSpin = () => (
  <FlexBox justifyContent="center">
    <CircularProgress size={30} />
  </FlexBox>
);

export default LoadingSpin;
