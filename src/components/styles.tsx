import { Box, styled } from '@mui/system';

export const PageLayout = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  minHeight: '100vh'
}));

export const FlexBox = styled(Box)(() => ({
  display: 'flex'
}));
