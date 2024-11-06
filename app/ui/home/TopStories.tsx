"use client";
import ListItemContainer from "../../components/ListItem/ListItemContainer";
import { useEffect, useState } from "react";
import useLoadingState from "@/app/hooks/useLoading";
import LoadingAnimation from "@/app/components/LoadingAnimation";
import { getLatestNews } from "@/app/api/news";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/app/components/Modal/Modal";
import NewsListItem from "@/app/components/ListItem/NewsListItem";
import { getDomain } from "@/app/helpers/helpers";
import moment from "moment";

const TopStories: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const { isLoading, setLoading } = useLoadingState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedArticleIndex, setSelectedArticleIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getLatestNews();
        setResults(response.news);
      } catch (error) {
        throw new Error("Failed to collect news data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const currentItems = results.slice((currentPage - 1) * 12, currentPage * 12);

  const handleOpenArticle = (articleIndex: number) => {
    setSelectedArticleIndex(articleIndex);
    document.body.classList.add("overflow-y-hidden");
  };

  const handleCloseModal = () => {
    setSelectedArticleIndex(null);
    document.body.classList.remove("overflow-y-hidden");
  };
  //if (selectedArticleIndex !== null) {

  //}

  return (
    <section id="news" className="py-8 bg-gray-200">
      <div className="container mx-auto min-h-[525px]">
        {isLoading ? (
          <div className="mt-10">
            <LoadingAnimation />
          </div>
        ) : (
          <ListItemContainer cols={3} header="Top Stories">
            {currentItems.map((item: any, index: any) => {
              return (
                <NewsListItem
                  key={index}
                  props={item}
                  onClick={() => handleOpenArticle(index)}
                />
              );
            })}
          </ListItemContainer>
        )}
      </div>

      <div className="container mx-auto mt-2">
        <div className="flex justify-center gap-3">
          <button
            className={`transition w-8 h-8 bg-gray-400 rounded-lg ${
              currentPage === 1 ? "opacity-60" : "hover:bg-green-600"
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-white" />
          </button>

          <button
            className={`transition w-8 h-8 bg-gray-400 rounded-lg ${
              currentPage === 3 ? "opacity-60" : "hover:bg-green-600"
            }`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === 3}
          >
            <FontAwesomeIcon icon={faArrowRight} className="text-white" />
          </button>
        </div>
      </div>
      {selectedArticleIndex !== null && (
        <Modal>
          <div className="bg-white mt-8 mx-auto lg:w-1/2 rounded-lg shadow-md p-6 relative">

            <FontAwesomeIcon 
              icon={faXmark}
              onClick={handleCloseModal}
              size="lg"
              className="absolute cursor-pointer text-gray-800 right-5 top-4 w-5 rounded-md h-3 p-1 hover:bg-slate-300"
            />

            <div className="container overflow-hidden pb-3">
            
              {currentItems[selectedArticleIndex].images.length > 0 ? (
                <div className="flex h-auto justify-center gap-x-3">
                  <img
                    src={currentItems[selectedArticleIndex].images[1].url}
                    alt="News article image"
                    className="h-[15em]"
                  />

                  <div className="self-center">
                    <img
                      src={`https://cdn.brandfetch.io/${getDomain(
                        currentItems[selectedArticleIndex].url
                      )}/logo/fallback/lettermark`}
                      alt="News article image"
                      className=""
                    />
                  </div>
                </div>
              ) : (
                <img
                  src={`https://cdn.brandfetch.io/${getDomain(
                    currentItems[selectedArticleIndex].url
                  )}/logo/fallback/lettermark`}
                  alt="News article image"
                  className="h-[300px] mx-auto"
                />
              )}

              <div className="mt-4">
                <h5 className="font-bold text-2xl">
                  {currentItems[selectedArticleIndex].headline}
                </h5>
              </div>
              <div className="text-sm text-gray-600">
                {moment(
                  currentItems[selectedArticleIndex].created_at
                ).fromNow()}{" "}
                &sdot; {currentItems[selectedArticleIndex].author}
              </div>
            </div>

            <div className="container">
              <div
                className="h-96 overflow-auto"
                dangerouslySetInnerHTML={{
                  __html: currentItems[selectedArticleIndex].content,
                }}
              />
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default TopStories;
/**
 *   const aresults = [
    {
      author: "Benzinga Newsdesk",
      content: "",
      created_at: "2024-10-25T18:14:08Z",
      headline:
        'Tether CEO Paolo Ardoino Posts On X "As we told to WSJ there is no indication that Tether is under investigation. WSJ is regurgitating old noise. Full stop"',
      id: 41553564,
      images: [],
      source: "benzinga",
      summary: "",
      symbols: ["BTCUSD", "COIN", "ETHUSD", "MSTR", "SPY", "USDTUSD"],
      updated_at: "2024-10-25T18:14:08Z",
      url: "https://www.benzinga.com/news/24/10/41553564/tether-ceo-paolo-ardoino-posts-on-x-as-we-told-to-wsj-there-is-no-indication-that-tether-is-under-in",
    },
    {
      author: "Benzinga Newsdesk",
      content: "",
      created_at: "2024-10-25T17:57:48Z",
      headline:
        "'Federal Investigators Probe Cryptocurrency Firm Tether; Authorities Looking At Possible Violations Of Anti-Money-Laundering And Sanctions Rules; Tether May Face Penalties For Doing Business With Groups On U.S. Sanctions List; Tether Is The Most Heavily Traded Cryptocurrency' - WSJ",
      id: 41553094,
      images: [],
      source: "benzinga",
      summary: "",
      symbols: [
        "BITF",
        "BTCUSD",
        "CLSK",
        "COIN",
        "ETHUSD",
        "HUT",
        "MARA",
        "MSTR",
        "RIOT",
        "SPY",
        "USDTUSD",
      ],
      updated_at: "2024-10-25T18:09:47Z",
      url: "https://www.benzinga.com/news/24/10/41553094/federal-investigators-probe-cryptocurrency-firm-tether-authorities-looking-at-possible-violations-of",
    },
    {
      author: "Benzinga Newsdesk",
      content: "",
      created_at: "2024-10-25T18:08:21Z",
      headline:
        "'Chinese Hackers Are Said to Have Targeted Phones Used by Trump and Vance' - NYT",
      id: 41553468,
      images: [],
      source: "benzinga",
      summary: "",
      symbols: ["DJT", "FXI", "SPY"],
      updated_at: "2024-10-25T18:08:22Z",
      url: "https://www.benzinga.com/general/macro-notification/24/10/41553468/chinese-hackers-are-said-to-have-targeted-phones-used-by-trump-and-vance-nyt",
    },
    {
      author: "Khyathi Dalal",
      content: "",
      created_at: "2024-10-25T18:04:36Z",
      headline:
        "Michael Saylor's Proposal To Microsoft CEO Satya Nadella: 'If You Want To Make The Next Trillion Dollars For Shareholders, Call Me'",
      id: 41553322,
      images: [
        {
          size: "large",
          url: "https://cdn.benzinga.com/files/imagecache/2048x1536xUP/images/story/2024/10/25/Michael-Saylor-Once-Said-Bitcoins-Days-A.jpeg",
        },
        {
          size: "small",
          url: "https://cdn.benzinga.com/files/imagecache/1024x768xUP/images/story/2024/10/25/Michael-Saylor-Once-Said-Bitcoins-Days-A.jpeg",
        },
        {
          size: "thumb",
          url: "https://cdn.benzinga.com/files/imagecache/250x187xUP/images/story/2024/10/25/Michael-Saylor-Once-Said-Bitcoins-Days-A.jpeg",
        },
      ],
      source: "benzinga",
      summary:
        "MicroStrategy (NASDAQ:MSTR) executive chairman Michael Saylor humorously reached out to Microsoft (NASDAQ:",
      symbols: ["BLK", "BTCUSD", "MSFT", "MSTR"],
      updated_at: "2024-10-25T18:04:37Z",
      url: "https://www.benzinga.com/markets/cryptocurrency/24/10/41553322/michael-saylors-proposal-to-microsoft-ceo-satya-nadella-if-you-want-to-make-the-next-trill",
    },
    {
      author: "Benzinga Newsdesk",
      content: "",
      created_at: "2024-10-25T15:21:58Z",
      headline:
        "Major indexes are higher after a drop in Treasury yields and better-than-expected consumer sentiment data. Strength in chip stocks may also be lifting markets.",
      id: 41549102,
      images: [],
      source: "benzinga",
      summary: "",
      symbols: ["DIA", "IWM", "QQQ", "SPY"],
      updated_at: "2024-10-25T17:45:38Z",
      url: "https://www.benzinga.com/economics/macro-economic-events/24/10/41549102/major-indexes-are-higher-after-a-drop-in-treasury-yields-and-better-than-expected",
    },
    {
      author: "Piero Cingari",
      content: "",
      created_at: "2024-10-25T17:19:53Z",
      headline:
        "Tech Stocks Rally As Investors Await Magnificent 7 Earnings; Dollar Eyes Fourth Straight Positive Week: What's Driving Markets Friday?",
      id: 41552274,
      images: [
        {
          size: "large",
          url: "https://cdn.benzinga.com/files/imagecache/2048x1536xUP/images/story/2024/10/25/Stock-Market-Data---chart-illustration.jpeg",
        },
        {
          size: "small",
          url: "https://cdn.benzinga.com/files/imagecache/1024x768xUP/images/story/2024/10/25/Stock-Market-Data---chart-illustration.jpeg",
        },
        {
          size: "thumb",
          url: "https://cdn.benzinga.com/files/imagecache/250x187xUP/images/story/2024/10/25/Stock-Market-Data---chart-illustration.jpeg",
        },
      ],
      source: "benzinga",
      summary:
        "Stocks are ending the week on a high note, with tech leading the charge as investors position ahead of next week’s pivotal earnings releases from five of the “Magnificent Seven” stocks.",
      symbols: [
        "AAPL",
        "AMP",
        "AMZN",
        "AON",
        "BTCUSD",
        "CL",
        "CNC",
        "COF",
        "CVX",
        "DECK",
        "DIA",
        "DLR",
        "DXCM",
        "EW",
        "GOOG",
        "GOOGL",
        "HCA",
        "IWM",
        "LLY",
        "MA",
        "MCD",
        "META",
        "MSFT",
        "QQQ",
        "RIVN",
        "RMD",
        "SAIA",
        "SKX",
        "SMH",
        "SPY",
        "TSLA",
        "V",
        "WDC",
        "XLB",
        "XLK",
        "XLU",
        "XLY",
        "XOM",
      ],
      updated_at: "2024-10-25T17:19:54Z",
      url: "https://www.benzinga.com/news/earnings/24/10/41552274/tech-stocks-rally-as-investors-await-magnificent-7-earnings-dollar-eyes-fourth-straight-positive-we",
    },
    {
      author: "Benzinga Newsdesk",
      content: "",
      created_at: "2024-10-25T17:02:54Z",
      headline:
        "U.S. Baker Hughes Oil Rig Count -2 At 480; U.S. Baker Hughes NatGas Rig Count +2 At 101; U.S. Baker Hughes Total Rig Count 585 (Unchanged)",
      id: 41551847,
      images: [],
      source: "benzinga",
      summary: "",
      symbols: ["SPY", "UNG", "USO"],
      updated_at: "2024-10-25T17:02:55Z",
      url: "https://www.benzinga.com/economics/macro-economic-events/24/10/41551847/u-s-baker-hughes-oil-rig-count-2-at-480-u-s-baker-hughes-natgas-rig-count-2-at-10",
    },
    {
      author: "Benzinga Newsdesk",
      content: "",
      created_at: "2024-10-25T17:00:17Z",
      headline:
        "CNBC Halftime Report Final Trades: Tesla, Sweetgreen, AbbVie, Digital Realty Trust",
      id: 41551729,
      images: [],
      source: "benzinga",
      summary: "",
      symbols: ["ABBV", "DLR", "SG", "TSLA"],
      updated_at: "2024-10-25T17:00:18Z",
      url: "https://www.benzinga.com/news/24/10/41551729/cnbc-halftime-report-final-trades-tesla-sweetgreen-abbvie-digital-realty-trust",
    },
    {
      author: "Surbhi Jain",
      content: "",
      created_at: "2024-10-25T16:54:06Z",
      headline:
        "JETS ETF Takes Flight While Delta, Southwest Face Turbulence: What's Next For Airline Stocks?",
      id: 41551586,
      images: [
        {
          size: "large",
          url: "https://cdn.benzinga.com/files/imagecache/2048x1536xUP/images/story/2024/10/25/Airport-Operations-Suspended.jpeg",
        },
        {
          size: "small",
          url: "https://cdn.benzinga.com/files/imagecache/1024x768xUP/images/story/2024/10/25/Airport-Operations-Suspended.jpeg",
        },
        {
          size: "thumb",
          url: "https://cdn.benzinga.com/files/imagecache/250x187xUP/images/story/2024/10/25/Airport-Operations-Suspended.jpeg",
        },
      ],
      source: "benzinga",
      summary:
        "U.S. Global Jets ETF is up 51.65% fueled by top holdings Delta and Southwest. Golden Cross suggests more upside, but challenges loom.",
      symbols: ["BA", "CRWD", "DAL", "JETS", "LUV", "MSFT", "UAL"],
      updated_at: "2024-10-25T16:54:07Z",
      url: "https://www.benzinga.com/trading-ideas/technicals/24/10/41551586/jets-etf-takes-flight-while-delta-southwest-face-turbulence-whats-next-for-airline-stock",
    },
    {
      author: "Benzinga Newsdesk",
      content: "",
      created_at: "2024-10-25T15:37:15Z",
      headline: "Stifel Maintains Buy on Tesla, Raises Price Target to $287",
      id: 41549695,
      images: [],
      source: "benzinga",
      summary: "",
      symbols: ["TSLA"],
      updated_at: "2024-10-25T15:37:16Z",
      url: "https://www.benzinga.com/news/24/10/41549695/stifel-maintains-buy-on-tesla-raises-price-target-to-287",
    },
    {
      author: "Benzinga Newsdesk",
      content: "",
      created_at: "2024-10-25T14:35:10Z",
      headline:
        "Piper Sandler Maintains Overweight on Tesla, Raises Price Target to $315",
      id: 41547234,
      images: [],
      source: "benzinga",
      summary: "",
      symbols: ["TSLA"],
      updated_at: "2024-10-25T14:35:11Z",
      url: "https://www.benzinga.com/news/24/10/41547234/piper-sandler-maintains-overweight-on-tesla-raises-price-target-to-315",
    },
    {
      author: "Erica Kollmann",
      content: "",
      created_at: "2024-10-25T14:14:37Z",
      headline:
        "Friday's Top 5 Trending Stocks: What's The Scoop On Tesla, SoFi, Joby?",
      id: 41546663,
      images: [
        {
          size: "large",
          url: "https://cdn.benzinga.com/files/imagecache/2048x1536xUP/images/story/2024/10/25/earnings.jpeg",
        },
        {
          size: "small",
          url: "https://cdn.benzinga.com/files/imagecache/1024x768xUP/images/story/2024/10/25/earnings.jpeg",
        },
        {
          size: "thumb",
          url: "https://cdn.benzinga.com/files/imagecache/250x187xUP/images/story/2024/10/25/earnings.jpeg",
        },
      ],
      source: "benzinga",
      summary:
        "SoFi Technologies, Tesla, Capri Holdings, Joby Aviation and Deckers Outdoor are the top five trending tickers on Stocktwits Friday. Here&#39;s a look at what grabbed retail investors&#39; attention:",
      symbols: ["CPRI", "DECK", "JOBY", "SOFI", "TPR", "TSLA"],
      updated_at: "2024-10-25T14:14:38Z",
      url: "https://www.benzinga.com/news/24/10/41546663/fridays-top-5-trending-stocks-whats-the-scoop-on-tesla-sofi-joby",
    },
  ];
 */
