import { useQuery } from 'react-query';
import { CandyMachine, Metaplex } from '@metaplex-foundation/js';
import { Connection, PublicKey } from '@solana/web3.js';
import { solanaEndpoint } from './config';

const connection = new Connection(solanaEndpoint);
const mx = Metaplex.make(connection);

export const useCandyMachine = (account: string) => {
  return useQuery(['CandyMachine', account], async () =>
    mx.candyMachines().findByAddress(new PublicKey(account))
  );
};
