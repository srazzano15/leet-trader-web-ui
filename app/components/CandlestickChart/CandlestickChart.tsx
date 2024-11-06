"use client";
import Chart from "react-google-charts";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import moment from "moment";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

interface StockData {
  c: number; // close
  h: number; // high
  l: number; // low
  o: number; // open
  t: string; // time
  v: number; // volume
  vw: number; // vwap
}

const CandlestickChart: React.FC = () => {
  const [data, setData] = useState<StockData[]>([]);
  const chartRef = useRef<HTMLDivElement | null>(null);
  
  /**
     * 
     * {
  "bars": {
    "AAPL": [
      {
        "c": 228.835,
        "h": 229.39,
        "l": 228.205,
        "n": 483,
        "o": 229.24,
        "t": "2024-10-31T13:30:00Z",
        "v": 56305,
        "vw": 228.633289
      }
        ...
     */

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://data.alpaca.markets/v2/stocks/AAPL/bars?timeframe=5Min&start=2024-10-15&limit=1000&adjustment=raw&feed=iex&sort=asc",
          {
            headers: {
              accept: "application/json",
              "APCA-API-KEY-ID": "PKXVKQTFW701A3PJAPBQ",
              "APCA-API-SECRET-KEY": "LfaD2SZnbjrZMhuGNrnMHU8zWFJGNBO2LuwghaEE",
            },
          }
        );

        /* const transformed = response.data.bars.map((bar: any) => {
          const transformedBar = [
            new Date(bar.t),
            //bar.t,
            bar.l,
            bar.o,
            bar.c,
            bar.h,
          ];
          return transformedBar;
        });
        
        setData(
          [
            ...data,
            ...transformed
          ]
          
        ); */
        const transformed = response.data.bars.map((bar: any) => {
          bar.t = new Date(bar.t)
          return bar
        })
        setData(response.data.bars)
        //setData(transformed);
      } catch (error) {
        console.error("error: ", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      // Clear any previous charts
      chartRef.current.innerHTML = ""


   
      // Create the Observable Plot chart
      const chart = Plot.plot({
        style: {
          width: "100%",
          height: '400px'
        },
        inset: 6,
        x: {
          
        },
        marks: [
          Plot.ruleX(data, {
            x: "t",
            y1: "l",
            y2: "h",
            stroke: (d) => (d.o > d.c ? "#a52714" : "#0f9d58"), // Red for down, green for up
            strokeWidth: 1,
          }),
          Plot.ruleX(data, {
            x: "t",
            y: "o",
            y2: "c",
            stroke: (d) => (d.o > d.c ? "#a52714" : "#0f9d58"),
            strokeWidth: 3,
          }),
        ],
      });

      // Append the chart to the container
      chartRef.current.appendChild(chart);

      // Apply zoom behavior with d3-zoom
      const svg = d3.select(chart).select<SVGSVGElement>("svg"); // Explicitly select the SVG element

      svg.call(
        d3
          .zoom<SVGSVGElement, unknown>() // Specify the type of the zoom behavior
          .scaleExtent([1, 10]) // Restrict zoom range
          .translateExtent([
            [0, 0],
            [chart.clientWidth, chart.clientHeight],
          ])
          .on("zoom", (event) => {
            svg.attr("transform", event.transform);
          })
      );
    }
  }, [data]);
  return (
    
      <div ref={chartRef}></div>

  );
};

export default CandlestickChart;
