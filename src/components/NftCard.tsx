import { NftMetadata } from '../types';
import { FC } from 'react';
import IconAttributes from '@mui/icons-material/Workspaces';
import IconGroup from '@mui/icons-material/Group';
import { Button, Card, CardContent, CardMedia, Tooltip, Typography } from '@mui/material';
import { SubTitle } from './SubTitle';
import { FlexBox } from './styles';
import NftAttribute from './NftAttribute';
import { shortenAccount } from '../utils';

interface NftCardProps {
  metadata: NftMetadata;
}

const NftCard: FC<NftCardProps> = ({ metadata }) => {
  const { attributes, properties: { creators } } = metadata;

  return (
    <Card>
      <CardMedia
        component="img"
        height={400}
        image={metadata.image}
        alt={metadata.name}
      />
      <CardContent>
        <SubTitle>{metadata.name}</SubTitle>
        <Tooltip
          arrow
          title={
            <FlexBox flexWrap="wrap" gap={1} p={1}>
              {attributes.map((attribute) => (
                <NftAttribute
                  key={attribute.trait_type}
                  traitType={attribute.trait_type}
                  value={attribute.value}
                />
              ))}
            </FlexBox>
          }
        >
          <Button startIcon={<IconAttributes />}>
            {attributes.length} Attributes
          </Button>
        </Tooltip>
        <Tooltip
          arrow
          title={
            <FlexBox flexDirection="column" p={1}>
              {creators.map((creator) => (
                <FlexBox key={creator.address} justifyContent="space-between">
                  <Typography>{shortenAccount(creator.address)}</Typography>
                  <Typography>{creator.share} %</Typography>
                </FlexBox>
              ))}
            </FlexBox>
          }
        >
          <Button startIcon={<IconGroup />} sx={{ ml: 3 }}>
            {creators.length} Creators
          </Button>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default NftCard;
