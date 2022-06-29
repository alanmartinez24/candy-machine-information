import { FC } from 'react';
import { Typography } from '@mui/material';
import { FlexBox } from './styles';

interface NftAttributeProps {
  traitType: string;
  value: string;
}

const NftAttribute: FC<NftAttributeProps> = ({ traitType, value }) => {
  return (
    <FlexBox flexDirection="column" sx={{ border: 'solid 1px white', p: 1 }}>
      <Typography variant="body2">
        {traitType}
      </Typography>
      <Typography>
        {value}
      </Typography>
    </FlexBox>
  );
};

export default NftAttribute
