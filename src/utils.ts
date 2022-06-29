
export const timestampToReadableDate = (timestamp: number) => new Date(timestamp * 1000).toString();

export const shortenAccount = (account: string) => `${account.slice(0, 10)}..${account.slice(-4, account.length)}`;
