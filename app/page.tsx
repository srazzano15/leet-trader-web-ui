"use client";

import LogoSvg from "./assets/images/LogoSvg";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faBars,
  faUser,
  faChartLine,
  faChevronRight,
  faTableCells,
  faCalendarDays,
  faClockRotateLeft,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./components/Button";
import { MenuList } from "./components/DropDown/types";
import { toTitleCase } from "./helpers/helpers";
import Pill from "./components/Pill/Pill";
import Link from "next/link";
import Slider from "./components/Slider/Slider";
import useLoadingState from "./hooks/useLoading";
import LoadingAnimation from "./components/LoadingAnimation";
import SliderCard from "./components/Slider/SliderCard";
import moment from "moment";
import ListItemContainer from "./components/ListItem/ListItemContainer";
import TopStories from "./ui/home/TopStories";
import MegaCaps from "./ui/home/MegaCaps";
import CandlestickChart from "./components/CandlestickChart/CandlestickChart";

const HomePage: React.FC = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [activeNavItem, setActiveNavItem] = useState<string | null>("tools");
  const [currentMenuList, setCurrentMenuList] = useState<MenuList | {}>({});
  const [tickerData, setTickerData] = useState<any>(null);
  //const [socketData, setSocketData] = useState<any>({})
  const { isLoading, setLoading } = useLoadingState();

  const navItems: Record<string, MenuList> = {
    tools: {
      screener: {
        icon: faTableCells,
        subHeader: "Find your next winner with a simple scan",
        subList: ["stocks", "etfs", "bonds", "forex", "crypto"],
      },
      charts: {
        icon: faChartLine,
        subHeader: "Charts built for the professional and the aspiring alike",
        subList: [],
      },

      calendar: {
        icon: faCalendarDays,
        subHeader: "Stay up to date on everything happening in markets",
        subList: ["economic", "earnings", "dividends"],
      },
      backtester: {
        icon: faClockRotateLeft,
        subHeader: "Backtest your next winning strategy",
        subList: [],
      },
    },
    markets: {},
    news: {},
    resources: {},
  };
  const stonks = [
    {
      symbol: "TSLA",
      logo: "https://cdn.brandfetch.io/tesla.com/icon/fallback/lettermark/",
      price: 260.48,
      name: "Tesla, Inc.",
      percent_change: 21.92,
    },
    {
      symbol: "MSFT",
      logo: "https://cdn.brandfetch.io/microsoft.com/icon/fallback/lettermark/",
      price: 424.48,
      name: "Microsoft Corporation",
      percent_change: 0.03,
    },
    {
      symbol: "NVDA",
      logo: "https://cdn.brandfetch.io/nvidia.com/icon/fallback/lettermark/",
      price: 140.48,
      name: "Nvidia Corporation",
      percent_change: 0.61,
    },
    {
      symbol: "AMZN",
      logo: "https://cdn.brandfetch.io/amazon.com/icon/fallback/lettermark/",
      price: 186.38,
      name: "Amazon.com, Inc.",
      percent_change: 0.9,
    },
    {
      symbol: "AMD",
      logo: "https://cdn.brandfetch.io/amd.com/icon/fallback/lettermark/",
      price: 260.48,
      name: "Advanced Micro Devices",
      percent_change: -1.48,
    },
    {
      symbol: "AFRM",
      logo: "https://cdn.brandfetch.io/affirm.com/icon/fallback/lettermark/",
      price: 44.96,
      name: "Affirm, Inc.",
      percent_change: 1.21,
    },
  ];

  const handleSetActiveState = (item: keyof typeof navItems) => {
    setActiveNavItem(item);
    if (navItems[item]) {
      setCurrentMenuList(navItems[item]);
    } else {
      setCurrentMenuList({});
    }
  };

  const handleRemoveActiveState = () => {
    setActiveNavItem(null);
    setCurrentMenuList({});
  };


  const menuItems =
    currentMenuList !== null && Object.keys(currentMenuList).length > 0
      ? Object.keys(currentMenuList).map((key, index) => {
          const item = (currentMenuList as MenuList)[key]; // Explicitly cast `currentMenuList` to `MenuList`
          const props = {
            leftHeader: toTitleCase(key),
            subLeft: item.subHeader,
          };

          return (
            <div
              key={index}
              className="bg-slate-50 flex space-x-3 px-3 py-2 items-center min-w-64 hover:bg-green-100 "
            >
              {/* Assuming you want to render the item icon here */}
              {
                <FontAwesomeIcon
                  size="lg"
                  icon={item.icon}
                  className="text-gray-700"
                />
              }
              <Link href={`/${key}`}>
                <h4 className="text-gray-700 text-sm">
                  {props.leftHeader} <Pill text="Coming Soon" />
                </h4>
                <p className="text-gray-400 text-xs">{props.subLeft}</p>
              </Link>
            </div>
          );
        })
      : [];
  const getDefaultStockData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/stocks/movers/"
      );
      if (response.status == 200) {
        const data = response.data;
        setTickerData(data);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };


  useEffect(() => {
    /* if (moment().hour() > 15) return;
    const poll = setInterval(() => {
      getDefaultStockData();
    }, 5000);
    return () => clearInterval(poll); */
  }, []);

  useEffect(() => {
/*     (async () => {
      setLoading(true);
      await getDefaultStockData();
      setLoading(false);
    })(); */
  }, []);
  return (
    <div className="bg-gradient-to-b from-black to-gray-200">
      {/* Navbar */}
      <header className="bg-black py-2 px-10 w-screen shadow-md md:shadow-sm sticky z-10 top-0">
        <div className="grid grid-cols-5 justify-center">
          <a href="/" className="text-xl col-start-1">
            {/* <Image src={LogoSvg} width={0} height={50} alt="Leet Trader" style={{
              stroke: "white"
            }}/> */}
            <LogoSvg height={35} color="white" />
          </a>

          <nav className="col-span-3 col-start-2 flex justify-center">
            {Object.keys(navItems).map((item) => {
              return (
                <div
                  key={item}
                  className={`${
                    activeNavItem == item ? "bg-gray-800" : ""
                  } cursor-pointer text-white hover:bg-gray-800 py-2 px-5 mx-5 rounded-full`}
                  onMouseEnter={() =>
                    handleSetActiveState(item as keyof typeof navItems)
                  }
                  onMouseLeave={handleRemoveActiveState}
                >
                  {toTitleCase(item)}
                  <div
                    className={`${
                      activeNavItem == item ? "block" : "hidden"
                    } relative`}
                  >
                    <div
                      className={`dropdown-menu -left-5 top-2 rounded-lg min-w-32 grid grid-flow-row auto-rows-fr`}
                    >
                      {menuItems.length > 0 && menuItems}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="col-start-5 flex space-x-4 justify-center">
            <Button
              onClick={() => setNavOpen(!navOpen)}
              classes="text-white w-10 rounded-full hover:bg-gray-800 active:bg-gray-800"
            >
              <FontAwesomeIcon icon={faUser} size="lg" />
            </Button>

            <Button text="Get Started" variant="gradient" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={``}>
        <div className="container mx-auto text-center">
          <h2 className="text-6xl font-bold text-white pt-8 ">
            Welcome to Leet Trader
          </h2>
          <p className="mt-4 text-2xl text-white">
            Every tool a trader needs to be Leet.
          </p>
          <div className="py-8"></div>
        </div>
      </section>
      

       {/* Market View */}
       <section className="pt-8 bg-gray-200">
        <div className="container mx-auto">
          <CandlestickChart />
        </div>
      </section>


      {/* Top Stories Section */}
      <TopStories />

     
      


      <section className="py-10 bg-gray-200">
        <div className="container mx-auto">
          <div className="grid grid-flow-row auto-cols-auto grid-cols-2 gap-8 justify-even w-full">
          <MegaCaps />

            <ListItemContainer
              cols={2}
              subText="See the most volatile stonks of the day"
              header="Most Volatile"
              items={stonks}
            />
            <ListItemContainer
              cols={1}
              subText="See the most volatile stonks of the day"
              header="Gainers"
              items={tickerData?.tickers}
            />
            <ListItemContainer
              cols={1}
              subText="See the most volatile stonks of the day"
              header="Losers"
              items={tickerData?.tickers.filter(
                (ticker: any) => ticker.change < 0
              )}
            />
          </div>
        </div>
      </section>
      
      {/* Trending Assets Section */}
      <section id="trending" className="py-12 bg-gray-200 max-w-[100vw]">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Movers</h3>

          <Slider>
            {tickerData?.tickers.map((item: any, index: any) => {
              return <SliderCard key={index} props={item} />;
            })}
          </Slider>
        </div>
        {isLoading && <LoadingAnimation />}
      </section>

      {/* Footer */}
      
    </div>
  );
};

export default HomePage;
