import { useRouter } from 'next/router';
import { useCandyMachine } from '../../queries';
import { FlexBox } from '../../components/styles';
import { Alert, Box, Container, Grid, Typography } from '@mui/material';
import LoadingSpin from '../../components/LoadingSpin';
import { shortenAccount, timestampToReadableDate } from '../../utils';
import { SubTitle } from '../../components/SubTitle';
import CandyMachineNftList from '../../components/CandyMachineNftList';

const CandyMachineAccount = () => {
  const { query } = useRouter();
  const account = query.account as string;

  const { data: cm, status } = useCandyMachine(account);

  if (!account) {
    return null;
  }

  if (status === 'loading') {
    return <LoadingSpin />;
  }

  if (!cm) {
    return (
      <FlexBox justifyContent="center">
        <Alert severity="error">
          {account} is not Candy Machine related public Key.
        </Alert>
      </FlexBox>
    );
  }

  const { itemsAvailable, itemsRedeemed, sellerFeeBasisPoints, creators } = cm;

  const itemsAvailableNum = itemsAvailable.toNumber();
  const itemsRedeemedNum = itemsRedeemed.toNumber();

  return (
    <div>
      <FlexBox alignItems="center" flexDirection="column">
        <Typography variant="h6">
          {cm.symbol}
        </Typography>
        <Typography>
          {account}
        </Typography>
      </FlexBox>

      <Container sx={{ mt: 3 }}>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6} lg={4}>
            <SubTitle>Mint Price</SubTitle>
            <Typography gutterBottom>{cm.price.toString()} SOL</Typography>

            <SubTitle>Live Date</SubTitle>
            <Typography>{timestampToReadableDate(cm.goLiveDate.toNumber())}</Typography>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <SubTitle>Mint Stats</SubTitle>
            <FlexBox justifyContent="space-between">
              <Typography>Items Available</Typography>
              <Typography>{itemsAvailableNum}</Typography>
            </FlexBox>
            <FlexBox justifyContent="space-between">
              <Typography>Items Redeemed</Typography>
              <Typography>{itemsRedeemedNum} / {itemsAvailableNum}</Typography>
            </FlexBox>
            <FlexBox justifyContent="space-between">
              <Typography>Items Remaining</Typography>
              <Typography>{itemsAvailableNum - itemsRedeemedNum} / {itemsAvailableNum}</Typography>
            </FlexBox>
            <FlexBox justifyContent="space-between">
              <Typography>Royalty</Typography>
              <Typography>{sellerFeeBasisPoints / 100} %</Typography>
            </FlexBox>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <SubTitle>Creators</SubTitle>
            {creators.map((creator) => (
              <FlexBox key={creator.address.toString()} justifyContent="space-between">
                <Typography>{shortenAccount(creator.address.toString())}</Typography>
                <Typography>{creator.share}%</Typography>
              </FlexBox>
            ))}
          </Grid>
        </Grid>

        <CandyMachineNftList configList={cm.assets} />
      </Container>
    </div>
  );
};

export default CandyMachineAccount;
