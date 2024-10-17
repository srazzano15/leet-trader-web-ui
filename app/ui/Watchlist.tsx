"use client";
import { useState, useEffect } from "react";
import ListItem from "../components/ListItem/ListItem";
import WatchListPicker from "../components/WatchListPicker/WatchListPicker";
import Modal from "../components/Modal/Modal";
import Card from "../components/Card";
import { createWatchlist, fetchWatchlists, addAssetsToWatchlist } from "../api/watchlist";
import { getTokens, refreshAccessToken } from "../api/session";
import { WatchlistProps } from "../types/watchlist";
import LoadingAnimation from "../components/LoadingAnimation";
import TickerSearch from "../components/TickerSearch/TickerSearch";



const Watchlist: React.FC<WatchlistProps> = ( className ) => {
  const [createListActive, setCreateListActive] = useState<boolean>(false);
  const [addItemActive, setAddItemActive] = useState<boolean>(false);
  const [newWatchlistName, setNewWatchlistName] = useState<string>('');
  const [watchlists, setWatchlists] = useState<WatchlistProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentList, setCurrentList] = useState<number>(0)


  const [watchList, setWatchList] = useState([
    {
      leftHeader: "AMZN",
      rightHeader: 809.16,
      subRight: 19.89,
      subLeft: 10,
    },
    {
      leftHeader: "MSFT",
      rightHeader: 809.16,
      subRight: 19.89,
    },
    {
      leftHeader: "TSLA",
      rightHeader: 809.16,
      subRight: 19.89,
    },
    {
      leftHeader: "AAPL",
      rightHeader: 809.16,
      subRight: 19.89,
    },
  ]);

  const handlePickerStateChange = (value: number) => {
    setCurrentList(value)
    console.log(watchlists[currentList].id)
  }

  const handleCreateWatchlist = async () => {
    const {accessToken} = await getTokens()
    try {
      const createdWatchlist = await createWatchlist(newWatchlistName, accessToken as string );
      setWatchlists([...watchlists, createdWatchlist]);
      setNewWatchlistName('');  // Clear the input field after creation
      setCreateListActive(false)
    } catch (error) {
      console.error('Failed to create watchlist:', error);
    }
  };
  /* 
  const handleAddAsset = async => {
    
  } */

  useEffect(() => {
  (async () => {
      const newToken = await refreshAccessToken() 
      const { accessToken } = getTokens()
      try {
        const data = await fetchWatchlists(accessToken as string);

        setWatchlists(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false)
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-16">
        <LoadingAnimation />
      </div>
    )
  }
  return (
    <aside className={`${className} max-h-96`}>
      
      <h4 className="text-center my-3 pb-2 font-semibold text-xl border-b-2 border-b-gray-400">
        Watchlists
      </h4>

      <WatchListPicker items={watchlists.map(list => list.name)} onStateChange={handlePickerStateChange}/>
      <ul className="bg-white">
        {watchList.map((stock, index) => (
          <ListItem key={index} className="p-1" props={{ ...stock }} />
        ))}
      </ul>
      <div className="flex">
        <button 
          onClick={() => setAddItemActive(true)}
        className="inline-block mt-2 mx-auto text-sm hover:text-emerald-600">
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
            <h4 className="text-2xl mb-6">{watchlists[currentList].name} - Add Ticker</h4>
            <span 
              className="cursor-pointer absolute right-[34.5%] top-[21.8vh] text-3xl hover:text-emerald-500"
              onClick={() => setAddItemActive(false)}
            >&#10799;</span>
            <div className="grid">
              <TickerSearch listId={watchlists[currentList].id as number}/>
            </div>
          </div>
        </Modal>
      )}
    </aside>
  );
};

export default Watchlist;
