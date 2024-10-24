import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// Define the type for individual menu items
export interface MenuItem {
    icon: IconDefinition;
    subHeader: string;
    subList: string[];
  }
  
// Define the type for `currentMenuList`, which is an object where the key is a string and value is a `MenuItem`
export type MenuList = {
    [key: string]: MenuItem;
};