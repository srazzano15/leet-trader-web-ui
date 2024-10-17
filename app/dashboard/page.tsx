"use client";

import { useState, useEffect } from "react";
import LineChart from "../components/LineChart/LineChart";
import { ChartData } from "chart.js";
import Watchlist from "../ui/Watchlist";
import { PositionPanel } from "../ui/PositionPanel";
import { validateAccessToken, refreshAccessToken } from "../api/session";
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "",
        data: [100, 82, 16, 22, 65, 120, 200, 500, -25, -200, -98, -16],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true, // Fill the area under the line
        tension: 0, // Smooth the line curve
      },
    ],
  });

  const router = useRouter()

  useEffect(() => {
    refreshAccessToken();
    
    try {
        validateAccessToken()
    } catch (error) {
        router.replace('/login')
    }
  }, [router]);

  return (
    <div className="grid grid-cols-5 lg:gap-5 max-h-[90vh] overflow-y-auto">
      {/*-- Watchlist --*/}

      <Watchlist className="hidden lg:block" />

      <main className="col-span-5 lg:col-span-4 mx-5 lg:mx-0">
        {/*-- Main Body --*/}
        <PositionPanel
          isAccountPanel={true}
          props={{
            leftHeader: "Your Portfolio",
            rightHeader: 3356.28,
            subRight: 19.89,
            subLeft: "18 Jan 2024",
          }}
        >
          <LineChart chartData={chartData} />
        </PositionPanel>

        <PositionPanel
          props={{
            leftHeader: "Your Portfolio",
            rightHeader: 3356.28,
            subRight: 19.89,
            subLeft: "18 Jan 2024",
          }}
        >
          <LineChart chartData={chartData} />
        </PositionPanel>
        <PositionPanel
          props={{
            leftHeader: "Your Portfolio",
            rightHeader: 3356.28,
            subRight: 19.89,
            subLeft: "18 Jan 2024",
          }}
        >
          <LineChart chartData={chartData} />
        </PositionPanel>
        {/* END MAIN */}
      </main>
    </div>
  );
};
export default Home;