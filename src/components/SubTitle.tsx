import { Typography, TypographyProps } from '@mui/material';
import { FC } from 'react';

export const SubTitle: FC<TypographyProps> = ({ children, ...props }) => (
  <Typography {...props} variant="h6">
    {children}
  </Typography>
);
