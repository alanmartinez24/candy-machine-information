
export interface NftAttributeType {
  trait_type: string;
  value: string;
}

export interface NftCreator {
  address: string;
  share: number;
}

export interface NftMetadata {
  name: string;
  symbol: string;
  description: string;
  image: string;
  external_url: string;
  attributes: NftAttributeType[];
  properties: {
    creators: NftCreator[]
  }
}
