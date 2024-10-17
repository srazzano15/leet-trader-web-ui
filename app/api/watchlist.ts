import { WatchlistProps } from '../types/watchlist';
import { makeAuthenticatedRequest } from './session';

export const fetchWatchlists = async (): Promise<WatchlistProps[]> => {
  /* const res = await fetch(`${process.env.API_URL}/watchlists/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch watchlists');
  }

  return res.json(); */
  return makeAuthenticatedRequest('/watchlists/', {method: 'GET'})
};

export const createWatchlist = async (name: string, token: string): Promise<WatchlistProps> => {
    const res = await fetch(`${process.env.API_URL}/watchlists/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }), 
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