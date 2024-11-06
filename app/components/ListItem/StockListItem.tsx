import Avatar from "../Avatar";
import DynamicPrice from "../DynamicPrice/DynamicPrice";

interface StockListItemProps {
    symbol: string
    logo: string
    price: number
    name: string
    percent_change: number
}

type StockListItem = {
    props: StockListItemProps
}


const StockListItem: React.FC<StockListItem> = ({props}) => (
  <div
    key={props.symbol}
    className="container shadow-sm rounded-lg p-2 cursor-pointer bg-slate-50 hover:bg-slate-300"
  >
    <div className="grid gap-x-1 grid-flow-col grid-cols-[36px_1fr_min-content]">
      <div className="avatar w-max row-span-2 self-center">
        <Avatar source={props.logo} />
      </div>

      <div className="container row-span-1">{props.symbol}</div>
      <div className="container row-span-1 text-sm text-gray-500 truncate">
        {props.name}
      </div>

      <div className="group row-span-2">
        <div className="text-right"><DynamicPrice num={props.price} /></div>
        <div
          className={`${
            props.percent_change > 0 ? "text-green-500" : "text-red-500"
          } text-right`}
        >
          {props.percent_change?.toFixed(2)}%
        </div>
      </div>
    </div>
  </div>
);

export default StockListItem;
