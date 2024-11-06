"use client";
import "./price.css";
import { useState, useEffect } from "react";

const DynamicPrice = ({ num }: { num: number }) => {
  const [value, setValue] = useState<number | null>(null);
  const [previousNumber, setPreviousNumber] = useState<number | null>(null);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    setPreviousNumber(value); // Sets the previous value
    if (parseFloat(num.toFixed(2)) !== value) {
      setValue(parseFloat(num.toFixed(2)));
    }
    if (previousNumber !== null && value !== null) {
      // only flash if the numbers change
      if (value > previousNumber) {
        setAnimationClass('gained')
      } else if (num < previousNumber) {
        setAnimationClass('lost')
      }
      
    }

    const color = setTimeout(() => setAnimationClass(""), 2000);

    return () => clearTimeout(color);
  }, [num]); // Update dependency array to [num]

  return <span className={animationClass}>${value?.toFixed(2) ?? ""}</span>;
};

export default DynamicPrice;