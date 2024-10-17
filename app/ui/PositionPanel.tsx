import ListItem from "../components/ListItem/ListItem";
import LineChart from "../components/LineChart/LineChart";
import { ReactNode } from "react";
import { ListItemProps } from "../components/ListItem/types";
import moment from "moment";

type PositionPanelProps = {
  children?: ReactNode;
  isAccountPanel?: boolean;
  props: {
    leftHeader: string;
    rightHeader?: number | string;
    subRight?: number | string;
    subLeft?: number | string;
  }
};

export const PositionPanel: React.FC<PositionPanelProps> = ({
  children,
  isAccountPanel = false,
  props
}) => {
  const buttonClasses =
    "mr-3 py-1 border-b-2 border-transparent hover:border-emerald-600 cursor-pointer";

  
  const marketStatus = (): string => {
    const easternTime = moment().utcOffset(-4)
    if ([6, 7].includes(easternTime.isoWeekday())) {
      return 'Closed'
    } else if (easternTime.isBefore(moment('09:30:00'))) {
      return 'Pre-Market'
    } else if (easternTime.isAfter(moment('16:00:00'))) {
      return 'Post-Market'
    } else {
      return 'Open'
    }
  }



  return (
    <div className=" col-span-5 grid grid-rows-6 grid-cols-7 grid-flow-col-dense pt-3 pr-2">
      {/*-- ListItem --*/}
      <ListItem
        className="bg-white col-span-7 lg:col-span-5 row-span-1 shadow-md p-2 max-h-16"
        headerClass="font-semibold text-lg"
        props={props}
      />
      {/*-- LineChart --*/}
      <div className="bg-white border-b-2 border-transparent border-y-gray-200 row-span-3 lg:row-span-4 col-span-7 lg:col-span-5 shadow-md">
        {/* <LineChart chartData={chartData} /> */}
        {children}
      </div>
      {/*-- Button/Filter Row --*/}
      <div className=" text-sm max-h-12 grid col-span-7 lg:col-span-5 grid-cols-4 bg-white shadow-md px-2">
        <div className="self-center col-span-2">
          <span className={buttonClasses}>1D</span>
          <span className={buttonClasses}>1W</span>
          <span className={buttonClasses}>1M</span>
          <span className={buttonClasses}>1Y</span>
          <span className={buttonClasses}>MAX</span>
        </div>

        <div className="col-span-2 justify-self-end self-center ">
          <button className="text-white py-2 px-7 mx-1 rounded-md bg-emerald-500">
            Buy
          </button>
          <button className="text-white py-2 px-7 mx-1 rounded-md bg-emerald-500">
            Sell
          </button>
        </div>
      </div>

      {/*-- Right Panel --*/}
      {isAccountPanel && (
        <div className="hidden col-span-2 row-span-5 lg:grid grid-cols-2 mx-5 gap-y-2 content-center ">
          <h4 className="text-xl font-semibold col-span-2 border-b-2 border-b-gray-400 self-end">
            Today
          </h4>

          <div className="col-span-1">
            <div className="text-sm text-gray-400">Buying Power</div>
            <div className="font-semibold">$221.34</div>
          </div>

          <div className="col-span-1">
            <div className="text-sm text-gray-400">Market Status</div>
            <div className="font-semibold">{marketStatus()}</div>
          </div>

          <h4 className="text-xl font-semibold col-span-2 border-b-2 border-b-gray-400 self-end mt-4">
            Notifications
          </h4>

          <ListItem
            className="col-span-2 "
            props={{
              leftHeader: "AMD is down 2.71% to $156.91",
              subLeft: "Today 9:42am",
            }}
          >
            <a href="/" className="text-green-500">{`>`}</a>
          </ListItem>
          <ListItem
            className="col-span-2"
            props={{
              leftHeader: "NVDA is up 3.01% today to $209.23",
              subLeft: "Today 12:22pm",
            }}
          >
            <a href="/" className="text-green-500">{`>`}</a>
          </ListItem>
        </div>
      )}
      {!isAccountPanel && (
        <div className="hidden col-span-2 row-span-6 lg:grid grid-cols-2 mx-5 gap-y-1 content-center">
          <h4 className="text-xl font-semibold col-span-2 border-b-2 border-b-gray-400 self-end">
            Your Position
          </h4>

          <div className="col-span-1">
            <div className="text-sm text-gray-400">Shares</div>
            <div className="font-semibold">100</div>
          </div>

          <div className="col-span-1">
            <div className="text-sm text-gray-400">Equity Value</div>
            <div className="font-semibold">$1034.24</div>
          </div>

          <div className="col-span-1">
            <div className="text-sm text-gray-400">Average Cost</div>
            <div className="font-semibold">$65.32</div>
          </div>

          <div className="col-span-1">
            <div className="text-sm text-gray-400">Portfolio Diversity</div>
            <div className="font-semibold">25.4%</div>
          </div>

          <div className="col-span-1">
            <div className="text-sm text-gray-400">Today's Return</div>
            <div className="text-green-500">{`$11.75 (+1.15%)`}</div>
          </div>

          <div className="col-span-1">
            <div className="text-sm text-gray-400">Total Return</div>
            <div className="text-green-500">{`$350.75 (+58.80%)`}</div>
          </div>

          <h4 className="text-xl font-semibold col-span-2 border-b-2 border-b-gray-400 self-end mt-2">
            News
          </h4>

          <ListItem
            className="col-span-2 pb-2"
            props={{
              leftHeader: "AMD is down 2.71% to $156.91",
              subLeft: "Today 9:42am",
            }}
          >
            <a href="/" className="text-green-500">{`>`}</a>
          </ListItem>
          <ListItem
            className="col-span-2 pb-2"
            props={{
              leftHeader: "NVDA is up 3.01% today to $209.23",
              subLeft: "Today 12:22pm",
            }}
          >
            <a href="/" className="text-green-500">{`>`}</a>
          </ListItem>
        </div>
      )}
    </div>
  );
};
