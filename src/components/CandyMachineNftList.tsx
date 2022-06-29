import { Alert, Grid } from '@mui/material';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { ConfigLine } from '@metaplex-foundation/mpl-candy-machine';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingSpin from './LoadingSpin';
import { FlexBox } from './styles';
import { NftMetadata } from '../types';
import NftCard from './NftCard';

interface NftListProps {
  configList: ConfigLine[]
}

const LOAD_COUNT_UNIT = 6;

const fetchMetadata = async (url: string): Promise<NftMetadata> => {
  const rsp = await fetch(url);
  return await rsp.json();
};

const CandyMachineNftList: FC<NftListProps> = ({ configList }) => {
  const [nftList, setNftList] = useState<NftMetadata[]>([]);
  const initialLoaded = useRef(false);

  const fetchMore = useCallback(async () => {
    const countToLoad = Math.min(configList.length - nftList.length, LOAD_COUNT_UNIT);
    const idsToLoad = Array.from(Array(countToLoad).keys()).map((item) => item + nftList.length);
    const results = await Promise.all(idsToLoad.map((id) => fetchMetadata(configList[id].uri)));

    setNftList((oldData) => [...oldData, ...results]);
  }, [nftList, configList]);

  useEffect(() => {
    if (initialLoaded.current) return ;

    fetchMore();
    initialLoaded.current = true;
  }, [fetchMore]);

  return (
    <InfiniteScroll
      next={fetchMore}
      hasMore={nftList.length < configList.length}
      loader={<LoadingSpin />}
      dataLength={nftList.length}
      endMessage={(
        <FlexBox justifyContent="center">
          <Alert severity="info">
            End of NFTs
          </Alert>
        </FlexBox>
      )}
      style={{ overflow: 'hidden', minHeight: '100vh' }}
    >
      {nftList.length > 0 && (
        <Grid container spacing={3}>
          {nftList.map((nftItem) => (
            <Grid item xs={12} md={6} lg={4} key={nftItem.name}>
              <NftCard metadata={nftItem} />
            </Grid>
          ))}
        </Grid>
      )}
    </InfiniteScroll>
  )
};

export default CandyMachineNftList;
