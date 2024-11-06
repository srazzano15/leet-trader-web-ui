import ListItemContainer from "@/app/components/ListItem/ListItemContainer";
import StockListItem from "@/app/components/ListItem/StockListItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { calculatePercentChange } from "@/app/helpers/helpers";

const nameMap: { [key: string]: {
    name: string
    logo: string
} } = {
    AAPL: { name: "Apple, Inc.", logo: "https://cdn.brandfetch.io/apple.com/icon" },
    TSLA: { name: "Tesla, Inc.", logo: "https://cdn.brandfetch.io/tesla.com/icon" },
    AMZN: {
      name: "Amazon.com, Inc.",
      logo: "https://cdn.brandfetch.io/amazon.com/icon",
    },
    MSFT: {
      name: "Microsoft Corporation",
      logo: "https://cdn.brandfetch.io/microsoft.com/icon",
    },
    GOOG: {
      name: "Alphabet, Inc.",
      logo: "https://cdn.brandfetch.io/google.com/icon",
    },
    META: { name: "Meta, Inc.", logo: "https://cdn.brandfetch.io/meta.com/icon" },
  };

const MegaCaps: React.FC = () => {
  const [socketData, setSocketData] = useState<any>({});
  const [snapshots, setSnapshots] = useState<any>({});

  useEffect(() => {

    const getSnapshots = async () => {
        try {
            const response = await axios.get(
              "https://data.alpaca.markets/v2/stocks/snapshots?symbols=AAPL%2CGOOG%2CTSLA%2CMSFT%2CAMZN%2CMETA&feed=iex",
              {
                method: "GET",
                headers: {
                  accept: "application/json",
                  "APCA-API-KEY-ID": "PKXVKQTFW701A3PJAPBQ",
                  "APCA-API-SECRET-KEY": "LfaD2SZnbjrZMhuGNrnMHU8zWFJGNBO2LuwghaEE",
                },
              }
            );
            setSnapshots(response.data);
          } catch (error) {
            console.error("Error: ", error);
          }
    }

    const poll = setInterval(getSnapshots, 2000)
    return () => clearInterval(poll)
    /* (async () => {
      try {
        const response = await axios.get(
          "https://data.alpaca.markets/v2/stocks/snapshots?symbols=AAPL%2CGOOG%2CTSLA%2CMSFT%2CAMZN%2CMETA&feed=iex",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              "APCA-API-KEY-ID": "PKXVKQTFW701A3PJAPBQ",
              "APCA-API-SECRET-KEY": "LfaD2SZnbjrZMhuGNrnMHU8zWFJGNBO2LuwghaEE",
            },
          }
        );
        setSnapshots(response.data);
      } catch (error) {
        console.error("Error: ", error);
      }
    })(); */
  }, []);

  /**
 * 
 * interface StockListItemProps {
    symbol: string
    logo: string
    price: number
    name: string
    percent_change: number
}
 */
  useEffect(() => {
    /* const ws = new WebSocket("ws://127.0.0.1:8000/ws/market_data/");

    ws.onopen = () => console.log("Connected to WebSocket server");
    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = () => console.log("Disconnected from WebSocket server");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data); // Assuming incoming data is JSON formatted

      // Update state with the most recent data for each symbol
      setSocketData((prevData: any) => ({
        ...prevData,
        [data.symbol]: data, // Update the specific symbol's data
      }));
    };

    return () => ws.close(); */
  }, []);
  return (
    <ListItemContainer 
        cols={2}
        header="Highest Volume Stocks">
      { Object.keys(snapshots).sort().map(stock => {
                return (
                    <StockListItem
                        key={stock}
                        props={{
                            symbol: stock,
                            name: nameMap[stock].name,
                            logo: nameMap[stock].logo,
                            price: snapshots[stock]?.latestTrade.p,
                            percent_change: calculatePercentChange(snapshots[stock]?.latestTrade.p, snapshots[stock]?.prevDailyBar.c)
                        }}
                    />
                )
            }) ?? null
}
    </ListItemContainer>
  );
};

export default MegaCaps;
