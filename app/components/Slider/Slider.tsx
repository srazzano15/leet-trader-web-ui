"use client";

import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

interface SliderProps {
  children: React.ReactNode;
}

const Slider: React.FC<SliderProps> = ({ children }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "prev" | "next") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 500; // Adjust the scroll distance as needed
      scrollContainerRef.current.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-nowrap items-center space-x-1 mb-1">
      <button
        onClick={() => scroll("prev")}
        className="h-10 w-10 text-sm bg-white rounded-full self-center border border-gray-300 shadow-sm"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div
        ref={scrollContainerRef}
        className="w-full snap-x overflow-x-scroll whitespace-nowrap scrollbar-hide"
      >
        <div className="flex space-x-4">{children}</div>
      </div>
      <button
        onClick={() => scroll("next")}
        className="h-10 w-10 text-sm bg-white rounded-full self-center border border-gray-300 shadow-sm"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};
export default Slider;
