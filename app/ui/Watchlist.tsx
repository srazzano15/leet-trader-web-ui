"use client";
import { useState, useEffect, useCallback } from "react";
import ListItem from "../components/ListItem/ListItem";
import WatchListPicker from "../components/WatchListPicker/WatchListPicker";
import Modal from "../components/Modal/Modal";
import {
  createWatchlist,
  fetchWatchlists,
  addAssetsToWatchlist,
} from "../api/watchlist";
import { getTokens, refreshAccessToken } from "../api/session";
import { WatchlistProps, WatchlistAssetProps } from "../types/watchlist";
import LoadingAnimation from "../components/LoadingAnimation";
import TickerSearch from "../components/TickerSearch/TickerSearch";
import axios from "axios";

const Watchlist: React.FC<WatchlistProps> = () => {
  const [createListActive, setCreateListActive] = useState<boolean>(false);
  const [addItemActive, setAddItemActive] = useState<boolean>(false);
  const [newWatchlistName, setNewWatchlistName] = useState<string>("");
  const [watchlists, setWatchlists] = useState<WatchlistProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentList, setCurrentList] = useState<number>(0);
  const [newAssets, setNewAssets] = useState<any[]>([]);
  const [assetTickers, setAssetTickers] = useState<string[]>([]);
  const [prices, setPrices] = useState<any>({});

  const handlePickerStateChange = (value: number) => {
    setCurrentList(value);
  };

  const parseGainLoss = (currentPrice: number, prevClose: number) => {
    if (currentPrice > prevClose) {
      const gainAmount = (currentPrice - prevClose).toFixed(2)
      // Calculate the gain percentage, ensure precise rounding
      const gainPercentage = ((currentPrice / prevClose - 1) * 100).toFixed(2);
  
      // Calculate the gain and ensure 2 decimal places
      const output = `+${(currentPrice - prevClose).toFixed(2)} (+${gainPercentage}%)`;
      return output;
    } else {
      // Calculate the loss percentage, ensure precise rounding
      const lossPercentage = (100 * (currentPrice / prevClose) - 100).toFixed(2);
  
      // Calculate the loss and ensure 2 decimal places
      const output = `${(currentPrice - prevClose).toFixed(2)} (${lossPercentage}%)`;
      return output;
    }
  };

  // Polling function to get updated prices from Alpaca API
  const fetchPrices = async () => {
    const url = `https://data.alpaca.markets/v2/stocks/snapshots`; // Or your preferred Alpaca endpoint
    const headers = {
      "APCA-API-KEY-ID": process.env.ALPACA_API_KEY_ID,
      "APCA-API-SECRET-KEY": process.env.ALPACA_API_SECRET_KEY,
    };

    try {
      // Fetch prices for all tickers in the watchlist
      const response = await axios.get(url, {
        headers,
        params: {
          symbols: assetTickers.join(","),
          feed: "iex", // Query symbols in CSV format
        },
      });
      // Assuming response has the format { AMD: { latestQuote: {...} }, ... }
      setPrices(response.data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };
  const handleCreateWatchlist = async () => {
    const { accessToken } = await getTokens();
    try {
      const createdWatchlist = await createWatchlist(
        newWatchlistName,
        accessToken as string
      );
      setWatchlists([...watchlists, createdWatchlist]);
      setNewWatchlistName(""); // Clear input field after creation
      setCreateListActive(false);
    } catch (error) {
      console.error("Failed to create watchlist:", error);
    }
  };

  const handleStageNewAssets = async (asset: any) => {
    const stagedAssets = [...newAssets, asset];

    await refreshAccessToken();
    const { accessToken } = getTokens();
    try {
      await addAssetsToWatchlist(
        watchlists[currentList].id as number,
        stagedAssets,
        accessToken as string
      );

      // Clear the staged assets after successful addition
      setNewAssets([]);
    } catch (error) {
      console.error("Failed to add asset: ", error);
    }
  };

  useEffect(() => {
    if (assetTickers.length === 0) return
    fetchPrices();
    const intervalId = setInterval(() => {
      fetchPrices(); // Fetch prices every X milliseconds
    }, 5000); // Example: poll every 5 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [assetTickers]);

  // Load watchlists and tickers on component mount
  useEffect(() => {
    const loadWatchlists = async () => {
      try {
        const data = await fetchWatchlists();
        setWatchlists(data);
        const tickers = data[currentList]?.assets
          ?.map((stock) => stock.symbol)
          .filter((symbol): symbol is string => !!symbol);
        if (tickers) {
          setAssetTickers(tickers);
        }
      } catch (error) {
        console.error("Error loading watchlists:", error);
      }
    };
    const load = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    loadWatchlists();
    return () => clearTimeout(load);
  }, [currentList, newAssets]);

  const watchlistItems = watchlists[currentList]?.assets?.map(
    (stock, index) => (
      <ListItem
        key={index}
        className="p-1"
        props={{
          hasGained:
            stock.symbol &&
            prices[stock.symbol]?.latestTrade.p >
              prices[stock.symbol]?.prevDailyBar.c
              ? true
              : false,
          leftHeader: stock.symbol,
          subLeft: stock.name,
          rightHeader: stock.symbol
            ? prices[stock.symbol]?.latestTrade?.p.toFixed(2)
            : "---",
          subRight: stock.symbol
            ? parseGainLoss(
                prices[stock.symbol]?.latestTrade.p,
                prices[stock.symbol]?.prevDailyBar.c
              )
            : "---",
        }}
      />
    )
  );

  if (isLoading) {
    return (
      <div className="mt-16">
        <LoadingAnimation />
      </div>
    );
  }
  return (
    <aside className={`hidden lg:block max-h-96`}>
      <h4 className="text-center my-3 pb-2 font-semibold text-xl border-b-2 border-b-gray-400">
        Watchlists
      </h4>

      <WatchListPicker
        items={watchlists.map((list) => list.name) as string[]}
        onStateChange={handlePickerStateChange}
      />
      {watchlistItems === undefined ||
        (watchlistItems.length === 0 && (
          <div className="text-sm p-5 bg-white text-center">
            No tickers in your watchlist yet. <br /> <br />
            Add some now!
          </div>
        ))}
      {watchlistItems !== undefined && watchlistItems.length > 0 && (
        <ul className="bg-white">{watchlistItems}</ul>
      )}

      <div className="flex">
        <button
          onClick={() => setAddItemActive(true)}
          className="inline-block mt-2 mx-auto text-sm hover:text-emerald-600"
        >
          + Add Ticker
        </button>
        <button
          onClick={() => setCreateListActive(true)}
          className="inline-block mt-2 mx-auto text-sm hover:text-emerald-600"
        >
          + Add Watchlist
        </button>
      </div>
      {/* Create Watchlist Form */}
      {createListActive && (
        <Modal>
          <div
            className={`bg-white mt-44 mx-auto w-full lg:w-1/3 rounded shadow-md p-4`}
          >
            <h4 className="text-2xl mb-6">Create Watchlist</h4>
            <div className="grid grid-cols-2 gap-x-3">
              <label htmlFor="name" className="col-span-2">
                Name
              </label>
              <input
                type="text"
                value={newWatchlistName}
                onChange={(e) => setNewWatchlistName(e.target.value)}
                className="col-span-2 border mb-4 p-2 rounded-md"
              />

              <button
                onClick={() => setCreateListActive(false)}
                className="inline-block  py-2 rounded-md text-md hover:text-emerald-600 border"
              >
                Cancel
              </button>
              <button
                className="transition duration-150 ease-in-out bg-green-400  py-2 rounded-md hover:bg-emerald-300"
                onClick={handleCreateWatchlist}
              >
                Create
              </button>
            </div>
          </div>
        </Modal>
      )}
      {addItemActive && (
        <Modal>
          <div
            className={`bg-white mt-44 mx-auto w-full lg:w-1/3 rounded shadow-md p-4`}
          >
            <h4 className="text-2xl mb-6">
              {watchlists[currentList].name} - Add Ticker
            </h4>
            <span
              className="cursor-pointer absolute right-[34.5%] top-[21.8vh] text-3xl hover:text-emerald-500"
              onClick={() => setAddItemActive(false)}
            >
              &#10799;
            </span>
            <div className="grid">
              <TickerSearch assetHandler={handleStageNewAssets} />
            </div>
          </div>
        </Modal>
      )}
    </aside>
  );
};

export default Watchlist;
