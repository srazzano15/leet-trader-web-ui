"use client";
import { useState, useEffect } from "react";
import { MenuList } from "../components/DropDown/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoSvg from "../assets/images/LogoSvg";
import { toTitleCase } from "../helpers/helpers";
import {
  faUser,
  faChartLine,
  faTableCells,
  faCalendarDays,
  faClockRotateLeft,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import Link from "next/link";
import Pill from "../components/Pill/Pill";

const Header = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [activeNavItem, setActiveNavItem] = useState<string | null>("tools");
  const [currentMenuList, setCurrentMenuList] = useState<MenuList | {}>({});
  /*     useEffect(() => {
        return validateRefreshToken() ? setIsAuthenticated(true) : setIsAuthenticated(false)
    }, []) */

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
      backtest: {
        icon: faClockRotateLeft,
        subHeader: "Backtest your next winning strategy",
        subList: [],
      },
    },
    markets: {},
    news: {},
    resources: {},
  };
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
  //if (!isAuthenticated) return null

  return (
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
  );
};

export default Header;
