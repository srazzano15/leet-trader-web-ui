export interface WatchlistProps {
    id: number;
    name: string;
    assets?: Array<{
      symbol?: string;
      name?: string  
    }>;  // Array of objects for assets
    created_at: string;
  }