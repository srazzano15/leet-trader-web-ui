export interface WatchlistProps {
    id?: number;
    name?: string;
    assets?: Array<{
      symbol?: string;
      name?: string
      type?: 'stock' | 'crypto'
    }>;
    created_at?: string;
  }

  export interface WatchlistAssetProps {
    symbol: string;
    name: string
    type: 'stock' | 'crypto'
  }