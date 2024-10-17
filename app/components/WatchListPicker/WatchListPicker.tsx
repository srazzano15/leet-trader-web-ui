"use client";

import { useRef, useState } from "react";

interface WatchListPickerProps {
 /*  id: number;
  name: string;
  assets?: Array<{
    symbol?: string;
    name?: string  
  }>;  // Array of objects for assets
  created_at: string; */
  items: string[]
  onStateChange: any
}

const WatchListPicker: React.FC<WatchListPickerProps> = ({ items, onStateChange }) => {
    const [isActive, setIsActive] = useState<number | null>(0)
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "prev" | "next") => {
      if (scrollContainerRef.current) {
        const scrollAmount = 100; // Adjust the scroll distance as needed
        scrollContainerRef.current.scrollBy({
          left: direction === "next" ? scrollAmount : -scrollAmount,
          behavior: "smooth",
        });
      }
    };


   /*  const filterLabels: (items: any[]) => {
      // array of objects
      return items.map((item.name, index)  => item.name)
    } */
    const handleItemClick = (index: number) => {
        setIsActive(index)
        onStateChange(index)
    }

  return (
    
    <div className="flex items-center space-x-2 mb-1">
    <button
      onClick={() => scroll("prev")}
      className="px-2 py-1 text-sm bg-gray-200 rounded"
    >
     <i className="arrow left"></i>
    </button>
    <div
      ref={scrollContainerRef}
      className="w-full overflow-x-scroll whitespace-nowrap scrollbar-hide"
    >
      <div className="flex space-x-2">
        {items.map((item, index) => (
          <div
            key={index}
            className={`cursor-pointer flex-none min-w-14 w-auto p-1 text-center ${isActive === index ? 'bg-slate-300' : 'bg-transparent'}  rounded text-xs hover:bg-slate-300`}
            onClick={() => handleItemClick(index)}
          >
            {item}
          </div>
          
        ))}
      </div>
    </div>
    <button
      onClick={() => scroll("next")}
      className="px-2 py-1 text-sm bg-gray-200 rounded self-end"
    >
      <i className="arrow right"></i>
    </button>
  </div>
  );
};

export default WatchListPicker;
