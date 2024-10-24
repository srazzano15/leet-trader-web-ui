"use client";
import { useState } from "react";
import { MenuItem, MenuList } from "./types";
import { toTitleCase } from "@/app/helpers/helpers";

interface DropDownProps {
    menuList: MenuList
}

/* const DropDown: React.FC<DropDownProps> = ({}) => {

  const [activeNavItem, setActiveNavItem] = useState<string | null>("tools");
  const [currentMenuList, setCurrentMenuList] = useState<MenuList | {}>({});

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

              {item.icon}
              <div className="">
                <h4 className="text-gray-700 text-sm">{props.leftHeader}</h4>
                <p className="text-gray-400 text-xs">{props.subLeft}</p>
              </div>
              {item.subList.length > 0 && (
                <FontAwesomeIcon
                  size="sm"
                  icon={faChevronRight}
                  className="text-gray-700"
                />
              )}
            </div>
          );
        })
      : [];

  return (
    <>
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
            //onMouseLeave={handleRemoveActiveState}
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
      <div className={`${activeNavItem == item ? "block" : "hidden"} relative`}>
        <div
          className={`dropdown-menu -left-5 top-2 rounded-lg min-w-32 grid grid-flow-row auto-rows-fr`}
        >
          {menuItems.length > 0 && menuItems}
        </div>
      </div>
    </>
  );
}; */

//export default DropDown;
