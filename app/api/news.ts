import axios from "axios";
/**
 * API Methods for fetching news
 */

interface NewDataResponse {
  author: string;
  content: string;
  created_at: string;
  headline: string;
  id: number;
  images: Array<{}>;
  source: string;
  summary: string;
  symbols: Array<string>;
  updated_at: string;
  url: string;
}

type NewsData = {
  news: Array<NewDataResponse>;
  next_page_token: string;
  error?: any;
};

// get latest news without specifying specific ticker
// adding functionality to support pagination
export const getLatestNews = async (): Promise<NewsData> => {

  const url =
    `https://data.alpaca.markets/v1beta1/news?sort=desc&limit=36&include_content=true&exclude_contentless=true`;
  try {
    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        "APCA-API-KEY-ID": process.env.ALPACA_API_KEY_ID,
        "APCA-API-SECRET-KEY": process.env.ALPACA_API_SECRET_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
