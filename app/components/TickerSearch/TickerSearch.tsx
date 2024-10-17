"use client";
import { useState } from "react";
import LoadingAnimation from "../LoadingAnimation";
import { addAssetsToWatchlist } from "@/app/api/watchlist";
import { refreshAccessToken } from "@/app/api/session";

interface TicketSearchProps {
  assetHandler: any;
}

const TickerSearch: React.FC<TicketSearchProps> = ({ assetHandler }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  let [assetItem, setAssetItem] = useState<
    [{ name: string; symbol: string; type: "stock" | "crypto" }]
  >([
    {
      name: "",
      symbol: "",
      type: "stock",
    },
  ]);

  // add debounce to search so we dont rate limit the Polygon API
  const [debounceTimeout, setDebounceTimeout] = useState<number | undefined>();

  const handleAddAsset = async (newName: string, newSymbol: string) => {
    assetHandler({
      name: newName,
      symbol: newSymbol,
      type: "stock",
    });
    setQuery('')
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);

    const value = e.target.value.toUpperCase();
    setQuery(value);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const newTimeout = window.setTimeout(() => {
      if (value.trim() !== "") {
        fetchSearchResults(value);
      } else {
        setIsLoading(false);
      }
    }, 2000);

    setDebounceTimeout(newTimeout);
  };

  const fetchSearchResults = async (searchQuery: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.polygon.io/v3/reference/tickers?ticker.gte=${searchQuery}&ticker.lt=${searchQuery}Z&type=CS&market=stocks&active=true&limit=5&apiKey=${process.env.POLYGON_API_KEY}`
      );
      const resData = await response.json();
      setSearchResults(resData.results);
    } catch (error) {
      setError("There was an error with your search");
    } finally {
      setIsLoading(false);
    }
  };

  const resultsList = searchResults.map((result, index) => (
    <li
      key={index}
      className="cursor-pointer p-3 border-t items-center flex hover:bg-gradient-to-r from-white to-emerald-300"
      onClick={() => handleAddAsset(result.name, result.ticker)}
    >
      <h6 className="mr-3 basis-12">{result.ticker}</h6>
      <span className="text-xs text-gray-400 flex-1">{result.name}</span>
    </li>
  ));

  return (
    <>
      <input
        type="text"
        placeholder="Search for ticker..."
        className="border mb-4 p-2 rounded-md"
        value={query}
        onChange={handleInputChange}
      />

      {isLoading && !error && (
        <div className="shadow-inner absolute mt-14 pt-24 lg:w-[31.5vw] bg-white min-h-44">
          <LoadingAnimation />
        </div>
      )}

      {!isLoading && !error && searchResults.length > 0 && query.length > 0 && (
        <ul className="shadow-inner absolute mt-14 lg:w-[31.5vw] bg-white">
          {resultsList}
        </ul>
      )}
    </>
  );
};

export default TickerSearch;
