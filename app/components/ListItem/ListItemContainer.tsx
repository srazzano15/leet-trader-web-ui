import Avatar from "../Avatar";
import StockListItem from "./StockListItem";
import NewsListItem from "./NewsListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
interface ListItemContainerProps {
  rows?: number;
  cols?: 1 | 2 | 3 | 4;
  children?: React.ReactNode;
  header: string;
  subText?: string;
  containerClasses?: string;
  items?: any;
  listType?: "stock" | "news" | "other";
}

const ListItemContainer: React.FC<ListItemContainerProps> = ({
  header,
  subText,
  cols = 1,
  containerClasses,
  items,
  listType = "stock",
  children,
}) => {
  const columnMap: { [key: number]: string } = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };
  return (
    <div className={`${containerClasses}`}>
      <div className="grid grid-flow-row auto-rows-max gap-y-2">
        <div className="header ">
          <a href="#" className="h-min hover:text-green-500">
            <span className="font-bold text-2xl w-max">{header}</span>
            <FontAwesomeIcon icon={faChevronRight} size="sm" className="ml-1" />
          </a>
        </div>

        {children ? (
          <div className="content">
            <div className={`grid ${columnMap[cols]} gap-3`}>{children}</div>
          </div>
        ) : (
          <div className="content">
            <div className={`grid ${columnMap[cols]} gap-3`}>
              {items?.map((item: any, index: any) => {
                if (listType === "stock" && index < 6) {
                  return <StockListItem key={item.symbol} props={item} />;
                  /* return (
                  <div
                    key={item.symbol}
                    className="container shadow-sm rounded-lg p-2 cursor-pointer bg-slate-50 hover:bg-slate-300"
                  >
                    <div className="grid gap-x-1 grid-flow-col grid-cols-[36px_1fr_min-content]">
                      <div className="avatar w-max row-span-2 self-center">
                        <Avatar source={item.logo} />
                      </div>

                      <div className="container row-span-1">{item.symbol}</div>
                      <div className="container row-span-1 text-sm text-gray-500 truncate">
                        {item.name}
                      </div>

                      <div className="group row-span-2">
                        <div className="text-right">
                          ${item.price?.toFixed(2)}
                        </div>
                        <div
                          className={`${
                            item.percent_change > 0
                              ? "text-green-500"
                              : "text-red-500"
                          } text-right`}
                        >
                          {item.percent_change?.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ); */
                } else if (listType === "news") {
                  return <NewsListItem key={index} props={item} />;
                }
              })}
            </div>
          </div>
        )}
        {subText && (
          <div className="sub-content">
            <a href="#" className="">
              <h6 className="text-green-500  w-fit  rounded-md">{subText}</h6>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListItemContainer;
