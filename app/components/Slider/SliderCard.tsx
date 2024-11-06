import Pill from "../Pill/Pill";
import Avatar from "../Avatar";
import DynamicPrice from "../DynamicPrice/DynamicPrice";
interface SliderCardProps {
  logo: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  percent_change: number;
}

type SliderCard = {
  props: SliderCardProps;

};

const SliderCard: React.FC<SliderCard> = ({ props }) => {
  return (
    <div
      className="transition cursor-pointer min-h-32 min-w-60 bg-white rounded-lg shadow p-3 hover:bg-gray-300"
      key={props.symbol}
    >
      <div className={`flex-none`}>
        <div className="grid grid-flow-col snap-center items-center gap-y-11">
          <div className="w-max col-start-1">
            <Avatar source={props.logo} />
          </div>

          <div className="col-start-2">
            <h6 className="text-sm">{props.symbol}</h6>
            <div className="text-xs text-gray-500 font-extralight truncate w-44">
              {props.name}
            </div>
          </div>

          <div className="col-start-1 text-sm">
            <DynamicPrice num={props.price} />
          </div>
          <div className="col-start-2 justify-self-end">
            {props.change > 0 ? (
              <Pill color="green" text={`+${props.percent_change}%`}></Pill>
            ) : (
              <Pill color="red" text={`${props.percent_change}%`}></Pill>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderCard;
