import { WatchlistProps } from '../types/watchlist';
import { refreshAccessToken } from './session';
  // Change to your backend URL



export const fetchWatchlists = async (token: string): Promise<WatchlistProps[]> => {
  await refreshAccessToken()
  const res = await fetch(`${process.env.API_URL}/watchlists/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch watchlists');
  }

  return res.json();
};

export const createWatchlist = async (name: string, token: string): Promise<WatchlistProps> => {
    const res = await fetch(`${process.env.API_URL}/watchlists/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, assets: [] }),  // Send only the name for creation
    });
  
    if (!res.ok) {
      throw new Error('Failed to create watchlist');
    }
  
    return res.json();
  };

  export const addAssetsToWatchlist = async (
    watchlistId: number,
    assets: Array<{ type: 'stock' | 'crypto'; symbol: string; name: string }>,
    token: string
  ): Promise<WatchlistProps> => {
    
    const res = await fetch(`${process.env.API_URL}/watchlists/${watchlistId}/add-assets/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ assets }),  // Send new assets to add
    });
  
    if (!res.ok) {
      throw new Error('Failed to add assets to watchlist');
    }
  
    return res.json();
  };